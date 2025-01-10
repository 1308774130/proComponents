import type { QueryTableRef } from 'cruise-components';
import { QueryTable, useForm } from 'cruise-components';
import React, { useEffect, useRef, useState } from 'react';
import { formColumns, tableColumns } from './setting';

const Demo = () => {
  const [form] = useForm();
  const tableRef = useRef<QueryTableRef | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
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
      { id: 11, name1: '赵十三', age: 75, status: 1 },
      { id: 12, name1: '孙十四', age: 80, status: 0 },
      { id: 13, name1: '周十五', age: 85, status: 1 },
      { id: 14, name1: '吴十六', age: 90, status: 0 },
      { id: 15, name1: '郑十七', age: 95, status: 1 },
      { id: 16, name1: '陈十八', age: 100, status: 0 },
      { id: 17, name1: '王十九', age: 105, status: 1 },
      { id: 18, name1: '赵二十', age: 110, status: 0 },
      { id: 19, name1: '孙二十一', age: 115, status: 1 },
      { id: 20, name1: '周二十二', age: 120, status: 0 },
      { id: 21, name1: '吴二十三', age: 125, status: 1 },
    ]);
  }, []);

  return (
    <QueryTable
      ref={tableRef}
      searchColumns={formColumns}
      formProps={{
        form: form,
      }}
      data={data}
      firstRequest={true}
      rowKey="id"
      columns={tableColumns}
      optionButtons={[
        {
          text: '赋值查询参数',
          type: 'primary',
          onClick: () => {
            form.setFieldsValue({
              name2: '张三',
              status: 1,
            });
          },
        },
        {
          text: '获取查询参数',
          onClick: () => {
            console.log(tableRef.current?.getParams());
          },
        },
        {
          text: '重置查询参数',
          onClick: () => {
            form.resetFields();
          },
        },
        {
          text: '获取表格数据',
          onClick: () => {
            console.log(tableRef.current?.getDataSource());
          },
        },
      ]}
    />
  );
};

export default Demo;
