import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const argUrl = process.argv.find((arg) => arg.startsWith("--url="))?.slice("--url=".length);
const argOutput = process.argv.find((arg) => arg.startsWith("--output="))?.slice("--output=".length);

const TARGET_URL = argUrl ?? process.env.PERF_URL ?? "http://localhost:3000";
const OUTPUT_FILE = argOutput ?? process.env.PERF_OUTPUT ?? "reports/perf-playwright.json";
const STRICT_MODE = process.env.PERF_STRICT === "1" || process.argv.includes("--strict");

const profiles = [
  {
    id: "desktop",
    label: "Desktop",
    contextOptions: {
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      hasTouch: false,
      isMobile: false,
    },
    cpuRate: 1,
    network: {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
      connectionType: "none",
    },
  },
  {
    id: "mobile",
    label: "Mobile (Fast 4G + CPU 4x)",
    contextOptions: {
      ...devices["iPhone 13"],
      viewport: { width: 390, height: 844 },
    },
    cpuRate: 4,
    network: {
      offline: false,
      latency: 150,
      downloadThroughput: 204_800,
      uploadThroughput: 93_750,
      connectionType: "cellular4g",
    },
  },
];

const budgets = {
  desktop: {
    lcpMs: 2500,
    cls: 0.1,
    loadMs: 3000,
  },
  mobile: {
    lcpMs: 2500,
    cls: 0.1,
    loadMs: 5000,
  },
};

async function waitForUrl(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status >= 200 && res.status < 500) {
        return;
      }
    } catch {
      // ignore and retry
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
  }
  throw new Error(`URL ${url} did not respond in time.`);
}

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: "chrome", headless: true });
  } catch {
    return chromium.launch({ headless: true });
  }
}

function evaluateAgainstBudget(profileId, metrics) {
  const rule = budgets[profileId];
  if (!rule) return { pass: true, checks: [] };

  const checks = [
    { id: "lcp", pass: metrics.lcpMs <= rule.lcpMs, actual: metrics.lcpMs, budget: rule.lcpMs },
    { id: "cls", pass: metrics.cls <= rule.cls, actual: metrics.cls, budget: rule.cls },
    { id: "load", pass: metrics.loadMs <= rule.loadMs, actual: metrics.loadMs, budget: rule.loadMs },
  ];

  return { pass: checks.every((check) => check.pass), checks };
}

async function collectProfile(browser, profile, targetUrl) {
  const context = await browser.newContext(profile.contextOptions);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);

  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", profile.network);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile.cpuRate });

  const stampedUrl = `${targetUrl}${targetUrl.includes("?") ? "&" : "?"}perf=${profile.id}-${Date.now()}`;
  await page.goto(stampedUrl, { waitUntil: "load", timeout: 60_000 });

  const metrics = await page.evaluate(async () => {
    const perf = performance;
    const perfWithMemory = perf;

    const memoryStart = perfWithMemory.memory
      ? {
          usedMB: perfWithMemory.memory.usedJSHeapSize / 1048576,
          totalMB: perfWithMemory.memory.totalJSHeapSize / 1048576,
          limitMB: perfWithMemory.memory.jsHeapSizeLimit / 1048576,
        }
      : null;

    let cls = 0;
    let lcpMs = 0;
    let longTasks = 0;

    let clsObserver = null;
    let lcpObserver = null;
    let longTaskObserver = null;

    try {
      clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // unsupported
    }

    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) lcpMs = last.startTime;
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // unsupported
    }

    try {
      longTaskObserver = new PerformanceObserver((list) => {
        longTasks += list.getEntries().length;
      });
      longTaskObserver.observe({ type: "longtask", buffered: true });
    } catch {
      // unsupported
    }

    const fpsAvg4s = await new Promise((resolve) => {
      const start = performance.now();
      let frames = 0;

      const tick = () => {
        frames += 1;
        const elapsed = performance.now() - start;
        if (elapsed >= 4000) {
          resolve((frames * 1000) / elapsed);
          return;
        }
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });

    clsObserver?.disconnect();
    lcpObserver?.disconnect();
    longTaskObserver?.disconnect();

    const memoryEnd = perfWithMemory.memory
      ? {
          usedMB: perfWithMemory.memory.usedJSHeapSize / 1048576,
          totalMB: perfWithMemory.memory.totalJSHeapSize / 1048576,
          limitMB: perfWithMemory.memory.jsHeapSizeLimit / 1048576,
        }
      : null;

    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const paints = performance.getEntriesByType("paint");
    const fcp = paints.find((entry) => entry.name === "first-contentful-paint");

    const topResources = resources
      .map((entry) => ({
        name: entry.name,
        transferKB: (entry.transferSize || 0) / 1024,
        durationMs: entry.duration,
      }))
      .sort((a, b) => b.transferKB - a.transferKB)
      .slice(0, 5)
      .map((entry) => ({
        name: entry.name,
        transferKB: Number(entry.transferKB.toFixed(1)),
        durationMs: Number(entry.durationMs.toFixed(1)),
      }));

    const transferKB = resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0) / 1024;

    return {
      domNodes: document.getElementsByTagName("*").length,
      fpsAvg4s: Number(fpsAvg4s.toFixed(1)),
      cls: Number(cls.toFixed(4)),
      lcpMs: Number(lcpMs.toFixed(0)),
      fcpMs: Number((fcp?.startTime || 0).toFixed(0)),
      longTasks,
      ttfbMs: navigation ? Number(navigation.responseStart.toFixed(0)) : null,
      domContentLoadedMs: navigation
        ? Number((navigation.domContentLoadedEventEnd - navigation.startTime).toFixed(0))
        : null,
      loadMs: navigation ? Number((navigation.loadEventEnd - navigation.startTime).toFixed(0)) : null,
      resourcesCount: resources.length,
      transferKB: Number(transferKB.toFixed(1)),
      topResources,
      memoryStartMB: memoryStart
        ? {
            used: Number(memoryStart.usedMB.toFixed(1)),
            total: Number(memoryStart.totalMB.toFixed(1)),
            limit: Number(memoryStart.limitMB.toFixed(0)),
          }
        : null,
      memoryEndMB: memoryEnd
        ? {
            used: Number(memoryEnd.usedMB.toFixed(1)),
            total: Number(memoryEnd.totalMB.toFixed(1)),
            limit: Number(memoryEnd.limitMB.toFixed(0)),
          }
        : null,
    };
  });

  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
    connectionType: "none",
  });
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: false });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });

  await context.close();

  const evaluation = evaluateAgainstBudget(profile.id, metrics);
  return {
    profile: profile.id,
    label: profile.label,
    metrics,
    budget: evaluation,
  };
}

function printSummary(results) {
  for (const result of results) {
    const { metrics } = result;
    const passText = result.budget.pass ? "PASS" : "FAIL";
    console.log(`\n[${result.profile}] ${result.label} -> ${passText}`);
    console.log(
      `LCP ${metrics.lcpMs}ms | CLS ${metrics.cls} | FCP ${metrics.fcpMs}ms | ` +
        `Load ${metrics.loadMs}ms | FPS ${metrics.fpsAvg4s} | Heap ${metrics.memoryEndMB?.used ?? "n/a"}MB`
    );

    if (!result.budget.pass) {
      for (const check of result.budget.checks.filter((item) => !item.pass)) {
        console.log(`  - Budget miss: ${check.id} actual=${check.actual} budget=${check.budget}`);
      }
    }
  }
}

async function run() {
  console.log(`Running Playwright perf benchmark for ${TARGET_URL}`);
  await waitForUrl(TARGET_URL);

  const browser = await launchBrowser();

  try {
    const results = [];
    for (const profile of profiles) {
      results.push(await collectProfile(browser, profile, TARGET_URL));
    }

    printSummary(results);

    const output = {
      generatedAt: new Date().toISOString(),
      targetUrl: TARGET_URL,
      strictMode: STRICT_MODE,
      budgets,
      results,
    };

    const outputPath = path.resolve(OUTPUT_FILE);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, JSON.stringify(output, null, 2), "utf8");
    console.log(`\nReport saved to ${outputPath}`);

    const allPass = results.every((result) => result.budget.pass);
    if (!allPass && STRICT_MODE) {
      console.error("Performance budgets failed in strict mode.");
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
