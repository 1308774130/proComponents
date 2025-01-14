import { Input, Space } from 'antd';
import { CustomComponentProps, FormRef } from 'cruise-components/Form/interface';
import React, { useEffect, useState } from 'react';

export const CustomInput = ({ onChange, ...props }: CustomComponentProps, form: FormRef) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

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
