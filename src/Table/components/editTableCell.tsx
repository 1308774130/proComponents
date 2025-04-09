import { useContext, useState } from 'react';
import { EditableCellProps } from '../interface';
import { Input } from 'antd';
import { EditableContext } from './editTableRow';
import { Form } from 'cruise-components';
import React from 'react';

export const EditableCell: React.FC<EditableCellProps<any>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  render,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {render ? (
          render(record[dataIndex], record, dataIndex, save)
        ) : (
          <Input onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
