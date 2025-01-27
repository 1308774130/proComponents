# Table

基于 Antd Table 的二次封装，为需要远程加载数据场景提供支持。

## 远程记载数据 🌰

<code src="./demo/index.tsx"></code>

## JSX 格式 🌰

<code src="./demo/index2.tsx"></code>

## API

### Table Props

| 参数          | 说明                                                 | 类型                                                | 默认值  |
| ------------- | ---------------------------------------------------- | --------------------------------------------------- | ------- |
| columns       | 表格列的配置描述                                     | `ColumnProps<T>[]`                                  | -       |
| dataSource    | 数据数组                                             | `T[]`                                               | `[]`    |
| rowKey        | 表格行 key 的取值，可以是字符串或函数                | `string \| (record) => string`                      | `'key'` |
| pagination    | 分页器，配置项或 false 来禁用                        | `TablePaginationConfig \| false`                    | `{}`    |
| remoteRequest | 远程数据请求函数，返回 Promise，需返回数据列表和总数 | `(params) => Promise<{ list: T[], total: number }>` | -       |
| firstRequest  | 是否在组件挂载时自动请求数据                         | `boolean`                                           | `true`  |
| refreshDeps   | 依赖项变化时自动刷新数据                             | `any[]`                                             | `[]`    |
| onChange      | 分页、排序、筛选变化时触发                           | `(pagination, filters, sorter) => void`             | -       |
| ...restProps  | 其他 Antd Table 支持的属性                           | -                                                   | -       |

### TableRef

| 方法          | 说明             | 类型                     |
| ------------- | ---------------- | ------------------------ |
| refresh       | 手动刷新表格数据 | `() => void`             |
| getDataSource | 获取当前数据源   | `() => T[]`              |
| getColumns    | 获取当前列配置   | `() => ColumnProps<T>[]` |
