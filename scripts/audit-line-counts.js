const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
      results = results.concat(walk(filePath));
    } else if (file.match(/\.(js|css|html|md|json)$/)) {
      results.push(filePath);
    }
  });
  return results;
}

const allFiles = walk(path.join(__dirname, '..'));
let over = 0;

allFiles.forEach(f => {
  const lines = fs.readFileSync(f, 'utf8').split('\n').length;
  if (lines > 100) {
    console.error(`❌ Over 100 lines (${lines}): ${path.relative(path.join(__dirname, '..'), f)}`);
    over++;
  }
});

if (over === 0) {
  console.log(`✅ 100% PASS: All ${allFiles.length} files in Learn NL Studio are within 100 lines! 🎉`);
} else {
  process.exit(1);
}
