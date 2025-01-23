import type { DescriptionsProps as AntDescriptionsProps } from 'antd';
import type { DescriptionsItemProps } from 'antd/lib/descriptions/Item';

export interface ColumnProps extends Omit<DescriptionsItemProps, 'children'> {
  field: string;
}

export interface DescriptionsProps extends AntDescriptionsProps {
  data?: Record<string, any>;
  columns?: ColumnProps[];
  defaultEmptyValue?: React.ReactNode;
}
