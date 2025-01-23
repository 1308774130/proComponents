import React from 'react';
import Descriptions from '../index';
import { data } from './mock';
import { columns } from './setting';

const BasicDemo: React.FC = () => {
  return (
    <>
      <Descriptions title="基本使用">
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="传入数据源使用" data={data} columns={columns} />
    </>
  );
};

export default BasicDemo;
