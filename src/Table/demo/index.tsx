import { Table, TableRef } from 'cruise-components';
import React, { useRef } from 'react';
import { tableColumns } from '../../QueryTable/demo/setting';

const Demo = () => {
  const tableRef = useRef<TableRef<any> | null>(null);

  // 模拟数据请求
  const handleRequest = async (params: any) => {
    console.log('查询参数:', params);
    // 模拟接口请求
    return new Promise<{ list: any[]; total: number }>(resolve => {
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
    <Table
      ref={tableRef}
      remoteRequest={handleRequest}
      firstRequest={true}
      rowKey="id"
      columns={tableColumns}
    />
  );
};

export default Demo;
