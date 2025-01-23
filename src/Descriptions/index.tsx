import React from 'react';
import { Descriptions as AntDescriptions } from 'antd';
import { DescriptionsProps } from './interface';

const Descriptions: React.FC<DescriptionsProps> & { Item: typeof AntDescriptions.Item } = ({
  data = {},
  columns = [],
  defaultEmptyValue = '-',

  ...props
}) => {
  if (!columns.length) {
    return <AntDescriptions {...props} />;
  }
  return (
    <AntDescriptions {...props}>
      {columns.map(({ field, label, ...itemProps }, index) => (
        <AntDescriptions.Item key={index} label={label} {...itemProps}>
          {data[field] !== undefined ? data[field] : defaultEmptyValue}
        </AntDescriptions.Item>
      ))}
    </AntDescriptions>
  );
};

Descriptions.Item = AntDescriptions.Item;

export default Descriptions;
