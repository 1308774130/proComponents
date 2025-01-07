# Select

基于 Antd Select 的二次封装，为需要下拉框增加“全选”功能场景提供支持。

## demo 🌰

<code src="./demo/index.tsx"></code>

## API

### Select Props

| 参数           | 说明                                                                           | 类型                            | 默认值              |
| -------------- | ------------------------------------------------------------------------------ | ------------------------------- | ------------------- |
| options        | 选项数据                                                                       | `Array<{ [key: string]: any }>` | `[]`                |
| labelKey       | 选项标签的键名                                                                 | `string`                        | `'label'`           |
| valueKey       | 选项值的键名                                                                   | `string`                        | `'value'`           |
| allValue       | 全选功能的值，设为 true 时开启全选功能，默认使用 `selectAll`，也可传入自定义值 | `boolean \| string \| number`   | `false`             |
| allText        | 全选选项的显示文本                                                             | `string`                        | `'全选'`            |
| defaultOpenAll | 是否默认全选                                                                   | `boolean`                       | `false`             |
| style          | 自定义样式                                                                     | `CSSProperties`                 | `{ width: '100%' }` |
| onChange       | 选中值变化时的回调                                                             | `(value: any) => void`          | -                   |

### 全选功能说明

1. 全选功能开启条件：

   - `allValue` 设置为 `true` 或具体的值

2. 全选值的确定：

   - 当 `allValue` 为 `true` 时，使用 `'selectAll'` 作为全选值
   - 当 `allValue` 为具体的字符串或数字时，使用该值作为全选值

3. 全选交互逻辑：
   - 选中全选选项时，view 仅显示全选，但 `onChange` 返回所有选项的值
   - 选中其他选项时，自动取消全选状态
