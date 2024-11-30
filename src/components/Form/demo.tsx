/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import { Form } from '../index';
import type { FormColumn } from './interface';
import type { FormRef } from './interface';
import { Button, Input, message, Space } from 'antd';
import { CustomComponentProps } from './interface';
import moment from 'moment';

const CustomInput = ({ onChange, ...props }: CustomComponentProps, form: FormRef) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  console.log(form);
  useEffect(() => {
    onChange(input1 && input2 ? input1 + input2 : '');
  }, [input1, input2]);

  return (
    <Space>
      <Input
        value={props.value}
        onChange={val => {
          setInput1(val.target.value);
        }}
        {...props}
      />
      <Input
        value={props.value}
        onChange={val => {
          setInput2(val.target.value);
        }}
        {...props}
      />
    </Space>
  );
};

const Demo: React.FC = () => {
  const formRef = useRef<FormRef>(null);

  const columns: FormColumn[] = [
    {
      type: 'customInput',
      field: 'customInput',
      label: '自定义输入框',
    },
    {
      type: 'select',
      field: 'cruiseLine',
      label: '邮轮航线',
      required: true,
      options: [
        { label: '日本横滨-东京6日游', value: 'japan' },
        { label: '新加坡-马来西亚8日游', value: 'singapore' },
        { label: '地中海巡游12日游', value: 'mediterranean' },
      ],
    },
    {
      type: 'date',
      field: 'departureDate',
      label: '出发日期',
      required: true,
      range: true,
    },
    {
      type: 'date',
      picker: 'time',
      field: 'departureTime',
      label: '出发时间',
      required: true,
    },
    {
      type: 'number',
      field: 'adults',
      label: '成人人数',
      required: true,
      min: 1,
      max: 9,
    },
    {
      type: 'number',
      field: 'children',
      label: '儿童人数',
      min: 0,
      max: 9,
      width: 300,
    },
    {
      type: 'radio',
      field: 'roomType',
      label: '房间类型',
      required: true,
      options: [
        { label: '海景房', value: 'ocean' },
        { label: '内舱房', value: 'interior' },
        { label: '阳台房', value: 'balcony' },
      ],
    },
    {
      type: 'select',
      field: 'dining',
      label: '用餐时段',
      required: true,
      options: [
        { label: '早餐时段 (7:00-9:00)', value: 'breakfast' },
        { label: '午餐时段 (12:00-14:00)', value: 'lunch' },
        { label: '晚餐时段 (18:00-20:00)', value: 'dinner' },
      ],
    },
    {
      type: 'checkbox',
      field: 'activities',
      label: '附加活动',
      options: [
        { label: '岸上观光', value: 'shore' },
        { label: 'SPA护理', value: 'spa' },
        { label: '赌场体验', value: 'casino' },
        { label: '健身房', value: 'gym' },
        { label: '其他', value: 'other' },
      ],
    },
    {
      type: 'input',
      field: 'activitiesExtra',
      label: ' ',
      hide: values => !values?.activities?.includes('other'),
    },
    {
      type: 'switch',
      field: 'insurance',
      label: '旅游保险',
    },
    {
      type: 'input',
      field: 'specialRequests',
      label: '特殊要求',
      placeholder: '如果有任何特殊需求，请在此说明',
    },
    {
      type: 'input',
      field: 'contactName',
      label: '联系人姓名',
      required: true,
    },
    {
      type: 'input',
      field: 'contactPhone',
      label: '联系电话',
      required: true,
    },
    {
      type: 'input',
      field: 'email',
      label: '电子邮箱',
      required: true,
      validator: [{ type: 'email', message: '请输入有效的邮箱地址' }],
    },
    {
      type: 'input',
      field: 'phone',
      label: '手机号码',
      required: true,
      validator: /^1[3-9]\d{9}$/,
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('预订成功！我们将尽快与您联系确认行程。');
      console.log('预订信息：', values);
      formRef.current?.resetFields();
    } catch (error) {
      message.error('预订失败，请稍后重试');
    }
  };

  // 添加默认数据
  const defaultValues = {
    cruiseLine: 'japan',
    departureDate: [moment('2015-01-01', 'YYYY-MM-DD'), moment('2015-02-01', 'YYYY-MM-DD')],
    departureTime: moment(),
    adults: 2,
    children: 1,
    roomType: 'ocean',
    dining: 'breakfast',
    activities: ['shore', 'spa'],
    insurance: true,
    specialRequests: '需要准备儿童床',
    contactName: '张三',
    contactPhone: '13800138000',
    email: 'zhangsan@example.com',
    phone: '13800138000',
  };

  // 填充表单数据
  const fillFormData = () => {
    formRef.current?.setFieldsValue(defaultValues);
  };

  return (
    <Form
      ref={formRef}
      columns={columns}
      onFinish={handleSubmit}
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
          <h2>邮轮跟团游预订表单</h2>
          <Button type="primary" onClick={fillFormData}>
            填充示例数据
          </Button>
        </div>
      }
      footer={['submit', 'reset', '我是单独一行自定义的文字', <div>我是单独一行的块状</div>]}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      components={{
        customInput: CustomInput,
      }}
    />
  );
};

export default Demo;
