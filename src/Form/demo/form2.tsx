import { Form, useForm } from 'cruise-components';
import React from 'react';
import { columns2 } from './setting';

const Demo: React.FC = () => {
  const [form] = useForm();

  const getSelectOptions = value => {
    const count = Math.floor(Math.random() * 5) + 3; // 生成3-7个选项
    const options = [];

    for (let i = 0; i < count; i++) {
      options.push({
        label: `${value} - 选项${i + 1}`,
        value: `option${i + 1}`,
      });
    }

    form.setFieldItem('select2', { options });
  };

  const select1Change = value => {
    getSelectOptions(value);
  };

  return <Form form={form} columns={columns2(select1Change)} />;
};

export default Demo;
