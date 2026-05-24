const fs = require('fs');
const path = require('path');

const dir = 'd:\\project\\Tugas magang day 10 _feture education\\EcoTrack-v1\\components\\pages\\articles';

try {
  fs.mkdirSync(dir, { recursive: true });
  console.log('✓ Directory created successfully at:');
  console.log(dir);
} catch (err) {
  console.error('✗ Error creating directory:', err.message);
  process.exit(1);
}
