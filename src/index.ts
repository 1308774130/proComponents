import Descriptions from './Descriptions';
import Form, { useForm } from './Form';
import QueryTable from './QueryTable';
import type { QueryTableRef } from './QueryTable/interface';
import Select from './Select';
import Table from './Table';
import type { TableRef } from './Table/interface';

// 引入全局样式
import 'antd/dist/antd.less';

export { Form, QueryTable, Select, useForm, Descriptions, Table };
export type { QueryTableRef, TableRef };

export default {
  Select,
  Form,
  QueryTable,
  Descriptions,
  Table,
};
