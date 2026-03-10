This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Performance Notes

- The hero 3D is now loaded progressively (idle/interaction first) and can fallback to a static visual on low-power devices.
- Continuous animations pause when the tab is hidden.
- Below-the-fold sections use `content-visibility` to reduce initial rendering cost.

### Performance Budget Targets

- Initial JS (home route): <= 220KB gzip
- Main-thread blocking (initial load): <= 200ms on desktop
- LCP: <= 2.5s on Fast 4G
- INP: <= 200ms on real devices

### Web Vitals Debug

To log web-vitals in the browser console, run:

```js
localStorage.setItem("qodec:debug:web-vitals", "1")
```

Reload the page and inspect the console logs.

### Playwright Performance Benchmark

With the app running, execute:

```bash
npm run perf:playwright
```

Strict mode (fails on budget miss):

```bash
npm run perf:playwright:strict
```

Custom URL/output examples:

```bash
node scripts/perf-playwright.mjs --url=http://localhost:4000 --output=reports/perf-local.json
```
