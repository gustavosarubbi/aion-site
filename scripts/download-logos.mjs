#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logos = [
  { name: 'stripe', slug: 'stripe', color: '635BFF' },
  { name: 'n8n', slug: 'n8n', color: 'EA4B71' },
  { name: 'whatsapp', slug: 'whatsapp', color: '25D366' },
  { name: 'openai', slug: 'openai', color: 'ffffff' },
  { name: 'aws', slug: 'amazonaws', color: 'FF9900' },
  { name: 'meta', slug: 'meta', color: '0468FF' },
];

const outputDir = path.join(__dirname, '..', 'public', 'integrations');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🚀 Downloading integration logos from Simple Icons CDN...\n');

async function downloadLogo(logo) {
  const url = `https://cdn.simpleicons.org/${logo.slug}/${logo.color}`;
  const outputPath = path.join(outputDir, `${logo.name}.svg`);
  
  try {
    console.log(`⬇️  Downloading ${logo.name}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const svgContent = await response.text();
    
    // Validate SVG
    if (!svgContent.includes('<svg') || svgContent.length < 50) {
      throw new Error('Invalid SVG content');
    }
    
    fs.writeFileSync(outputPath, svgContent);
    console.log(`✅ ${logo.name}: Saved successfully (${svgContent.length} bytes)`);
    return { success: true, name: logo.name };
  } catch (error) {
    console.error(`❌ ${logo.name}: Failed - ${error.message}`);
    return { success: false, name: logo.name, error: error.message };
  }
}

async function main() {
  const results = await Promise.all(logos.map(downloadLogo));
  
  console.log('\n📊 Download Summary:');
  console.log('==================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${logos.length}`);
  console.log(`❌ Failed: ${failed.length}/${logos.length}`);
  
  if (failed.length > 0) {
    console.log('\nFailed downloads:');
    failed.forEach(f => console.log(`  - ${f.name}: ${f.error}`));
  }
  
  console.log('\n✨ Done!');
}

main().catch(console.error);
