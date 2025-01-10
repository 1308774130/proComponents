import type { QueryTableRef } from 'cruise-components';
import { QueryTable, useForm } from 'cruise-components';
import React, { useRef, useState } from 'react';
import { formColumns, tableColumns } from './setting';

const Demo = () => {
  const [form] = useForm();
  const tableRef = useRef<QueryTableRef | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [deepData, setDeepData] = useState(1);

  // 模拟数据请求
  const handleRequest = async (params: any) => {
    // 模拟接口请求
    return new Promise<{ list: any[]; total: number }>((resolve) => {
      setTimeout(() => {
        console.log('请求了', new Date().getTime());
        resolve({
          list: [
            { id: 1, name1: '张三', age: 25, status: 1 },
            { id: 2, name1: '李四', age: 30, status: 0 },
            { id: 3, name1: '王五', age: 35, status: 1 },
            { id: 4, name1: '赵六', age: 40, status: 0 },
            { id: 5, name1: '孙七', age: 45, status: 1 },
            { id: 6, name1: '周八', age: 50, status: 0 },
            { id: 7, name1: '吴九', age: 55, status: 1 },
            { id: 8, name1: '郑十', age: 60, status: 0 },
            { id: 9, name1: '陈十一', age: 65, status: 1 },
            { id: 10, name1: '王十二', age: 70, status: 0 },
          ],
          total: 20,
        });
      }, 1000);
    });
  };

  return (
    <QueryTable
      ref={tableRef}
      searchColumns={formColumns}
      formProps={{
        form: form,
      }}
      remoteRequest={handleRequest}
      firstRequest={true}
      rowKey="id"
      columns={tableColumns}
      optionButtons={[
        {
          text: '外部依赖更新',
          type: 'primary',
          onClick: () => {
            setDeepData(deepData + 1);
          },
        },
      ]}
      refreshDeps={[deepData]}
    />
  );
};

export default Demo;
