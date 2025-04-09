# Form

基于 Antd Form 的二次封装，可以通过 `components` 属性自定义表单项组件。

## 基础用法 🌰

<code src="./demo/form1.tsx"></code>

## 表单联动 🌰

<code src="./demo/form2.tsx"></code>

## 表单实例 🌰

<code src="./demo/form3.tsx"></code>

## 只读模式 🌰

<code src="./demo/readOnly.tsx"></code>

## API

### FormProps

| 参数       | 说明                             | 类型                                                | 默认值 |
| ---------- | -------------------------------- | --------------------------------------------------- | ------ |
| columns    | 表单项配置数组                   | `FormColumn[]`                                      | `[]`   |
| header     | 表单头部内容                     | `ReactNode`                                         | -      |
| footer     | 表单底部内容                     | `ReactNode \| ('submit' \| 'reset' \| ReactNode)[]` | -      |
| components | 自定义组件映射表                 | `Record<string, CustomComponent>`                   | `{}`   |
| onFinish   | 提交表单且数据验证成功后回调事件 | `(values: any) => void`                             | -      |

### FormColumn

| 参数        | 说明                 | 类型                                                                                                                    | 默认值    |
| ----------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------- |
| type        | 表单项类型           | `'input' \| 'select' \| 'date' \| 'switch' \| 'radio' \| 'checkbox' \| 'rate' \| 'number' \| 'treeSelect' \| 'mention'` | `'input'` |
| field       | 字段名               | `string`                                                                                                                | -         |
| label       | 标签名               | `string`                                                                                                                | -         |
| required    | 是否必填             | `boolean`                                                                                                               | `false`   |
| hide        | 是否隐藏             | `boolean \| ((values: any) => boolean)`                                                                                 | `false`   |
| validator   | 校验规则             | `Rule \| Rule[] \| RegExp`                                                                                              | -         |
| placeholder | 占位提示             | `string`                                                                                                                | -         |
| disabled    | 是否禁用             | `boolean`                                                                                                               | `false`   |
| readOnly    | 是否只读             | `boolean`                                                                                                               | `false`   |
| props       | 传递给表单控件的属性 | `object`                                                                                                                | -         |
| width       | 表单项宽度           | `string \| number`                                                                                                      | `'100%'`  |

### FormInstance

表单实例方法，通过 `form` 获取。
| 名称 | 说明 | 类型 |
| ----------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| setFieldItem | 更新表单某项的参数 | `(field: string, config: Partial<FormColumn>) => void` |
| getFieldItem | 获取表单某项的参数 | `(field: string) => FormColumn` |
