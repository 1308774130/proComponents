# Descriptions

继承自 Ant Design 的 Descriptions 组件，支持通过 `data` 属性自动配置描述项。

## 基础用法 🌰

<code src="./demo/index.tsx"></code>

## API

### Descriptions Props

| 参数              | 说明             | 类型                  | 默认值 |
| ----------------- | ---------------- | --------------------- | ------ |
| data              | 描述项数据       | `Record<string, any>` | -      |
| columns           | 描述项配置       | `ColumnProps[]`       | `[]`   |
| defaultEmptyValue | 默认空值显示内容 | `React.ReactNode`     | `'-'`  |

### ColumnProps

| 参数  | 说明                           | 类型     | 默认值 |
| ----- | ------------------------------ | -------- | ------ |
| field | 数据字段                       | `string` | -      |
| label | 描述项标签                     | `string` | -      |
| 其他  | 继承自 `DescriptionsItemProps` | -        |
