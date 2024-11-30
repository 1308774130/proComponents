const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');

// 获取所有组件目录
const components = fs
  .readdirSync(componentsDir)
  .filter(file => fs.statSync(path.join(componentsDir, file)).isDirectory());

// 生成组件导出
const componentExports = components
  .map(component => `export { default as ${component} } from './${component}';
export type { ${component}Props } from './${component}/interface';`)
  .join('\n\n');

// 生成 demo 导出
const demoExports = components
  .filter(component => fs.existsSync(path.join(componentsDir, component, 'demo.tsx')))
  .map(component => `export { default as ${component}Demo } from './${component}/demo';`)
  .join('\n');

// 写入 index.ts
fs.writeFileSync(
  path.join(componentsDir, 'index.ts'),
  componentExports + '\n\n' + 'export * from \'./demo\';\n'
);

// 写入 demo.ts
fs.writeFileSync(
  path.join(componentsDir, 'demo.ts'),
  demoExports + '\n'
); 