import { Button, message } from 'antd';
import { Form, useForm } from 'cruise-components';
import React from 'react';
import { CustomInput } from './components/CustomInput';
import { defaultValues } from './mock';
import { columns1 } from './setting';

const Demo: React.FC = () => {
  const [form] = useForm();

  const handleSubmit = async (values: any) => {
    try {
      // 模拟提交
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
      message.success('预订成功！我们将尽快与您联系确认行程。');
      console.log('预订信息：', values);
      form.resetFields();
    } catch (error) {
      message.error('预订失败，请稍后重试');
    }
  };

  return (
    <Form
      form={form}
      columns={columns1}
      onFinish={handleSubmit}
      initialValues={defaultValues}
      readOnly={true}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      components={{
        customInput: CustomInput,
      }}
    />
  );
};

export default Demo;
