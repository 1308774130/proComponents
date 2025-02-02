/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import type {
  FormProps as AntFormProps,
  InputProps,
  SelectProps,
  DatePickerProps,
  SwitchProps,
  RadioGroupProps,
  RateProps,
  InputNumberProps,
  TreeSelectProps,
  MentionProps,
} from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox/Group';

export type FormValues = Record<string, string | number | boolean | string[] | null | undefined>;

type ValidatorRule = {
  type?: 'email' | 'url' | 'string' | 'number';
  message?: string;
  [key: string]: any;
};

type BaseControlProps = {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

type BaseColumnProps = {
  field: string;
  label?: string;
  required?: boolean;
  hide?: boolean | ((values: any) => boolean);
  validator?: ValidatorRule | ValidatorRule[] | RegExp;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number | string;
  props?: BaseControlProps;
};

type PickerType = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';

export type FormColumn =
  | ({ type: 'input' } & BaseColumnProps & { props?: BaseControlProps & InputProps })
  | ({
      type: 'select';
      options: { label: string; value: string | number }[];
    } & BaseColumnProps & { props?: BaseControlProps & Omit<SelectProps<any>, 'options'> })
  | ({
      type: 'date';
      picker?: PickerType;
      range?: boolean;
    } & BaseColumnProps & { props?: BaseControlProps & DatePickerProps })
  | ({
      type: 'radio';
      options: { label: string; value: string | number }[];
    } & BaseColumnProps & { props?: BaseControlProps & Omit<RadioGroupProps, 'options'> })
  | ({
      type: 'checkbox';
      options: { label: string; value: string | number }[];
    } & BaseColumnProps & { props?: BaseControlProps & Omit<CheckboxGroupProps, 'options'> })
  | ({ type: 'switch' } & BaseColumnProps & { props?: BaseControlProps & SwitchProps })
  | ({ type: 'rate' } & BaseColumnProps & { props?: BaseControlProps & RateProps })
  | ({
      type: 'number';
      min?: number;
      max?: number;
      step?: number;
      decimalSeparator?: string;
    } & BaseColumnProps & {
        props?: BaseControlProps &
          Omit<InputNumberProps, 'min' | 'max' | 'step' | 'decimalSeparator'>;
      })
  | ({ type: 'treeSelect' } & BaseColumnProps & { props?: BaseControlProps & TreeSelectProps<any> })
  | ({ type: 'mention' } & BaseColumnProps & { props?: BaseControlProps & MentionProps })
  | ({
      type: string;
    } & BaseColumnProps & { props?: BaseControlProps & Record<string, any> });

type FooterButton = 'submit' | 'reset';
type FooterContent = FooterButton | ReactNode | (FooterButton | ReactNode)[];

// 自定义组件接口
export interface CustomComponentProps {
  value?: any;
  onChange: (value: any) => void;
  [key: string]: any;
}

// 自定义组件类型
type CustomComponent = (props: CustomComponentProps, form: FormRef) => React.ReactNode;

export interface FormProps extends Omit<AntFormProps, 'form'> {
  columns: FormColumn[];
  header?: ReactNode;
  footer?: FooterContent;
  components?: Record<string, CustomComponent>;
}

export interface FormRef {
  getFieldValue: (name: string) => any;
  getFieldsValue: (nameList?: string[]) => any;
  setFieldValue: (name: string, value: any) => void;
  setFieldsValue: (values: Record<string, any>) => void;
  resetFields: (fields?: string[]) => void;
  validateFields: () => Promise<any>;
  submit: () => void;
  scrollToField: (name: string, options?: ScrollOptions) => void;
}
