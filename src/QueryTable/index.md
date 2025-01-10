# QueryTable

基于 Form 和 Table 的组合查询表格组件。

## 远程加载数据 🌰

<code src="./demo/table1.tsx"></code>

## 静态数据 🌰

<code src="./demo/table2.tsx"></code>

## 表格外部依赖刷新 🌰

###### 表格内部自动依赖表单，表单更新会触发表格刷新，可以通过 `refreshDeps` 配置外部依赖

<code src="./demo/table3.tsx"></code>

## API

### QueryTable Props

| 参数          | 说明             | 类型                                                                      | 默认值 |
| ------------- | ---------------- | ------------------------------------------------------------------------- | ------ |
| formProps     | Form 组件的属性  | `Omit<FormProps, 'onFinish'>`                                             | -      |
| formColumns   | 查询表单的列配置 | `FormColumn[]`                                                            | `[]`   |
| optionButtons | 操作按钮配置     | `OptionButton[]`                                                          | `[]`   |
| tableProps    | Table 组件的属性 | `Omit<TableProps, 'dataSource'>`                                          | -      |
| request       | 数据请求方法     | `(params: any) => Promise<{ data: any[]; total: number }>`                | -      |
| defaultParams | 默认查询参数     | `Record<string, any>`                                                     | `{}`   |
| customRender  | 自定义渲染内容   | `{ formSlot?: ReactNode; buttonSlot?: ReactNode; tableSlot?: ReactNode }` | -      |

### OptionButton

| 参数    | 说明     | 类型                                                     | 默认值 |
| ------- | -------- | -------------------------------------------------------- | ------ |
| text    | 按钮文本 | `string`                                                 | -      |
| type    | 按钮类型 | `'primary' \| 'link' \| 'text' \| 'default' \| 'dashed'` | -      |
| onClick | 点击回调 | `() => void`                                             | -      |
