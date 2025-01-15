import type { TableProps } from 'antd';
import { useForm } from 'cruise-components';
import type { FormColumn, FormProps } from '../Form/interface';

export interface QueryTableRef {
  reset: () => void;
  getColumns: () => TableProps<any>['columns'];
  getDataSource: () => any[];
  getParams: () => Record<string, any>;
}

export interface QueryTableProps<T = any> extends TableProps<T> {
  // Form 相关配置
  searchColumns?: FormColumn[];
  formProps?: Omit<FormProps, 'columns' | 'header' | 'footer'> & {
    defaultType?: 'simple' | 'advance';
  };

  // Table 相关配置
  refreshDeps?: React.DependencyList;

  // 数据相关配置
  data?: T[];
  remoteRequest?: (params: any) => Promise<{ list: T[]; total: number }>;
  firstRequest?: boolean;
  defaultBtn?: ('submit' | 'reset')[]; // 默认展示提交和重置按钮，传[]则不展示

  // 操作按钮配置
  optionButtons?: {
    text: string;
    type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
    onClick?: () => void;
    [key: string]: any;
  }[];
}
