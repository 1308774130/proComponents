import { FormInstance } from 'antd';
import { useWatch } from 'antd/lib/form/Form';

export const useWatchForm = (
  formRef: FormInstance<any>,
  columns: FormColumn[],
) => {
  const watchValues = useWatch('name2', formRef);
  console.log(watchValues);
  return watchValues;
};
