import { SelectProps as AntSelectProps } from 'antd';

export interface SelectProps extends AntSelectProps {
  options: any[];
  labelKey?: string;
  valueKey?: string;
  allValue?: boolean | number | string;
  allText?: string | React.ReactNode;
  onChange?: (value: any) => void;
  style?: React.CSSProperties;
}
