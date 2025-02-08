import { Form } from 'cruise-components';
import { FormInstance } from 'cruise-components/Form/interface';
import React from 'react';
import { EditableRowProps } from '../interface';

export const EditableContext = React.createContext<FormInstance | null>(null);
export const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
