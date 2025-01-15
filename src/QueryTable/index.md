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

### QueryTableProps

| 参数          | 说明                               | 类型                                                                                                                          | 默认值                |
| ------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| formProps     | Form 组件的属性(参考`FormProps`)   | `Omit<FormProps, 'onFinish'>`                                                                                                 | -                     |
| searchColumns | 查询表单的列配置(参考`FormColumn`) | `FormColumn[]`                                                                                                                | `[]`                  |
| refreshDeps   | 刷新依赖数组[可选]                 | `React.DependencyList`                                                                                                        | `[]`                  |
| data          | 静态数据[可选]                     | `any[]`                                                                                                                       | `[]`                  |
| remoteRequest | 远程请求方法[可选]                 | `(params: any) => Promise<{ data: any[]; total: number }>`                                                                    | -                     |
| firstRequest  | 初次渲染是否自动查询[可选]         | `boolean`                                                                                                                     | `true`                |
| autoRefresh   | 是否自动刷新[可选]                 | `boolean`                                                                                                                     | `false`               |
| defaultBtn    | 默认展示提交和重置按钮[可选]       | `('submit' \| 'reset')[]`                                                                                                     | `['submit', 'reset']` |
| optionButtons | 操作按钮配置[可选]                 | `{ text: string; type?: 'primary' \| 'link' \| 'text' \| 'default' \| 'dashed'; onClick?: () => void; [key: string]: any }[]` | -                     |

### OptionButton

| 参数    | 说明     | 类型                                                     | 默认值 |
| ------- | -------- | -------------------------------------------------------- | ------ |
| text    | 按钮文本 | `string`                                                 | -      |
| type    | 按钮类型 | `'primary' \| 'link' \| 'text' \| 'default' \| 'dashed'` | -      |
| onClick | 点击回调 | `() => void`                                             | -      |
