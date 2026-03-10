import fs from 'fs';
import path from 'path';

async function testApis() {
    let log = "================ API VERIFICATION ================\n";

    try {
        // Load .env.local
        const envPath = path.resolve('.env.local');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim();
                env[key] = value;
            }
        });

        // 1. Unsplash
        log += "[1] UNSPLASH API\n";
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=technology&orientation=landscape`, {
                headers: { Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}` }
            });
            const data = await response.json();
            if (data.urls) log += "   ✅ SUCCESS: " + data.urls.regular + "\n";
            else log += "   ❌ FAILED: " + JSON.stringify(data).substring(0, 200) + "\n";
        } catch (e) { log += "   ❌ ERROR: " + e.message + "\n"; }

        // 2. Pexels
        log += "\n[2] PEXELS API\n";
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=abstract&per_page=1`, {
                headers: { Authorization: env.PEXELS_API_KEY }
            });
            const data = await response.json();
            if (data.photos && data.photos.length > 0) log += "   ✅ SUCCESS: " + data.photos[0].src.large2x + "\n";
            else log += "   ❌ FAILED: " + JSON.stringify(data).substring(0, 200) + "\n";
        } catch (e) { log += "   ❌ ERROR: " + e.message + "\n"; }

        // 3. LordIcon
        log += "\n[3] LORDICON CDN\n";
        const lordIcons = ["msoeawqm", "fpipqvgu", "rvivpajl", "xzksbhzh"];
        for (const id of lordIcons) {
            try {
                const url = `https://cdn.lordicon.com/${id}.json`;
                const res = await fetch(url);
                if (res.ok) log += `   ✅ OK: ${id}\n`;
                else log += `   ❌ FAILED: ${id} (${res.status})\n`;
            } catch (e) { log += `   ❌ ERROR: ${id} - ${e.message}\n`; }
        }
    } catch (e) {
        log += "CRITICAL ERROR: " + e.message + "\n";
    }

    log += "==================================================\n";
    fs.writeFileSync('scripts/verify-log.txt', log);
    console.log("Results written to scripts/verify-log.txt");
}

testApis();
