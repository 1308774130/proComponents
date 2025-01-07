const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

function generateExports() {
  const folders = fs.readdirSync(srcDir).filter((file) => {
    return fs.statSync(path.join(srcDir, file)).isDirectory();
  });

  let indexContent = '';
  let interfaceContent = '';

  folders.forEach((folder) => {
    indexContent += `export { default as ${folder} } from './${folder}';\n`;
    interfaceContent += `export * from './${folder}/interface';\n`;
  });

  fs.writeFileSync(path.join(srcDir, 'index.tsx'), indexContent);
  fs.writeFileSync(path.join(srcDir, 'interface.ts'), interfaceContent);
}

generateExports();
