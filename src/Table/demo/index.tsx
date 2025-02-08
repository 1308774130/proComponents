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

        // 生成随机数据
        const randomList = Array.from({ length: 10 }, (_, index) => {
          const names = ['张', '李', '王', '赵', '孙', '周', '吴', '郑', '陈', '马'];
          const randomName =
            names[Math.floor(Math.random() * names.length)] +
            names[Math.floor(Math.random() * names.length)] +
            (Math.random() > 0.5 ? names[Math.floor(Math.random() * names.length)] : '');
          return {
            id: index + 1,
            name1: randomName,
            age: Math.floor(Math.random() * 50) + 20, // 20-70岁之间
            status: Math.random() > 0.5 ? 1 : 0,
          };
        });

        resolve({
          list: randomList,
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
