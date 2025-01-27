import type { TableProps as AntTableProps } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

// 定义自定义 Table 的额外属性
export interface TableExtraProps<T> {
  refreshDeps?: any[];
  remoteRequest?: (params: Record<string, any>) => Promise<{ list: T[]; total: number }>;
  firstRequest?: boolean;
}

// 合并 AntTable 的属性和自定义属性
export type TableProps<T> = AntTableProps<T> & TableExtraProps<T>;

// 自定义 Table 的 ref 类型
export interface TableRef<T> {
  refresh: () => void;
  getDataSource: () => T[];
  getColumns: () => AntTableProps<T>['columns'];
}

export type TableWithColumns<T> = React.ForwardRefExoticComponent<
  TableProps<T> & React.RefAttributes<TableRef<T>>
> & {
  Column: typeof Column;
  ColumnGroup: typeof ColumnGroup;
};
