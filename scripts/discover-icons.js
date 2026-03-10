
async function discoverIcons() {
    const candidates = [
        "lsizubcp", "vduvxerq", "vixtbymv", "unukghxb", "kdduutpw",
        "noqxabsk", "qhgwaovp", "wjyqkrow", "hursqyps", "ignuuojs"
    ];
    let results = "Candidate LordIcon Check:\n";
    for (const id of candidates) {
        try {
            const res = await fetch(`https://cdn.lordicon.com/${id}.json`);
            if (res.ok) results += `✅ VALID: ${id}\n`;
            else results += `❌ 404: ${id}\n`;
        } catch (e) { }
    }
    const fs = require('fs');
    fs.writeFileSync('scripts/icon-discovery.txt', results);
}
discoverIcons();
