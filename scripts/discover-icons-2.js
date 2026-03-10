
async function discoverIcons() {
    const candidates = [
        "yqiuqyue", "lupuorrc", "tltigvoy", "vduvxerq", "vpkjkvon", "hdbmzzra", "cwnfbcjq"
    ];
    let results = "Candidate LordIcon Check 2:\n";
    for (const id of candidates) {
        try {
            const res = await fetch(`https://cdn.lordicon.com/${id}.json`);
            if (res.ok) results += `✅ VALID: ${id}\n`;
            else results += `❌ 404: ${id}\n`;
        } catch (e) { }
    }
    const fs = require('fs');
    fs.appendFileSync('scripts/icon-discovery.txt', "\n" + results);
}
discoverIcons();
