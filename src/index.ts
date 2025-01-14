import Form, { useForm } from './Form';
import QueryTable from './QueryTable';
import type { QueryTableRef } from './QueryTable/interface';
import Select from './Select';

// 引入全局样式
import 'antd/dist/antd.less';

export { Form, QueryTable, Select, useForm };
export type { QueryTableRef };

export default {
  Select,
  Form,
  QueryTable,
};
