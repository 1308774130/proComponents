import { Form } from 'antd';
import { FormColumn, FormInstance } from './interface';

export const useForm = <T extends object = any>(): [FormInstance] => {
  const [antForm, ...antFormRest] = Form.useForm<T>();
  const form = antForm as FormInstance;

  return [form, ...antFormRest];
};
