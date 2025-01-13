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
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      message.success('预订成功！我们将尽快与您联系确认行程。');
      console.log('预订信息：', values);
      form.resetFields();
    } catch (error) {
      message.error('预订失败，请稍后重试');
    }
  };

  // 填充表单数据
  const fillFormData = () => {
    form.setFieldsValue(defaultValues);
  };

  return (
    <Form
      form={form}
      columns={columns1}
      onFinish={handleSubmit}
      header={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px 0',
          }}
        >
          <h2>邮轮跟团游预订表单</h2>
          <Button type="primary" onClick={fillFormData}>
            填充示例数据
          </Button>
        </div>
      }
      footer={[
        'submit',
        'reset',
        '我是footer单独一行自定义的文字',
        <div key="footer-block">我是footer单独一行的块状</div>,
      ]}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      components={{
        customInput: CustomInput,
      }}
    />
  );
};

export default Demo;
