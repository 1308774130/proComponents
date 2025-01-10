import { Space, Tag } from 'antd';
import React from 'react';

// 表单配置
export const formColumns = [
  {
    type: 'input',
    field: 'name2',
    label: '姓名',
  },
  {
    type: 'select',
    field: 'status',
    label: '状态',
    props: {
      options: [
        { label: '正常', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];

// 表格列配置
export const tableColumns = [
  {
    title: '姓名',
    dataIndex: 'name1',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (status: number) => (
      <Tag color={status === 1 ? 'success' : 'error'}>
        {status === 1 ? '正常' : '禁用'}
      </Tag>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];
