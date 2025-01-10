import { Typography } from 'antd';
import { Select } from 'cruise-components';
import React from 'react';
import { normalOptions, options } from './mock';

const App = () => {
  const handleSelectChange = (value: any) => {
    console.log('Selected values:', value);
  };

  return (
    <>
      <Typography.Title level={3}>基本使用-antd</Typography.Title>
      <Select
        options={normalOptions}
        onChange={handleSelectChange}
        defaultValue="lucy"
      />
      <Typography.Title level={3}>单选-全选</Typography.Title>
      <Select
        options={options}
        labelKey="name"
        valueKey="id"
        allValue={true}
        defaultValue={'selectAll'}
        onChange={handleSelectChange}
      />
      <Typography.Title level={3}>多选-全选</Typography.Title>
      <Select
        options={options}
        labelKey="name"
        valueKey="id"
        allValue={-1}
        defaultValue={[-1]}
        allText="全部选中"
        mode="multiple"
        onChange={handleSelectChange}
      />
    </>
  );
};

export default App;
