import { Select as AntSelect } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { SelectProps } from './interface';

const Select = forwardRef<any, SelectProps>(
  (
    {
      options,
      labelKey = 'label',
      valueKey = 'value',
      allValue = false,
      allText = '全选',
      mode,
      onChange,
      style = { width: '100%' },
      ...restProps
    },
    ref,
  ) => {
    const selectAllValue = allValue === true ? 'selectAll' : allValue || '';
    const [selectedValues, setSelectedValues] = useState<any[]>();

    const handleChange = (value: any) => {
      let changeValue = value;
      if (mode === 'multiple') {
        if (value.includes(selectAllValue)) {
          if ((selectedValues as any[]).includes(selectAllValue)) {
            setSelectedValues(value.filter((v: any) => v !== selectAllValue));
            changeValue = value.filter((v: any) => v !== selectAllValue);
          } else {
            setSelectedValues([selectAllValue]);
            changeValue = options.map((option) => option[valueKey]);
          }
        } else {
          setSelectedValues(value);
          if ((selectedValues as any[]).includes(selectAllValue)) {
            setSelectedValues(value.filter((v: any) => v !== selectAllValue));
          }
        }
      } else {
        setSelectedValues(value);
      }

      if (onChange) {
        onChange(changeValue);
      }
    };

    const renderOptions = () => {
      const renderedOptions = options.map((option) => (
        <AntSelect.Option key={option[valueKey]} value={option[valueKey]}>
          {option[labelKey]}
        </AntSelect.Option>
      ));

      if (allValue && (mode === 'multiple' || mode === undefined)) {
        renderedOptions.unshift(
          <AntSelect.Option key="all-key" value={selectAllValue}>
            {allText}
          </AntSelect.Option>,
        );
      }

      return renderedOptions;
    };

    useImperativeHandle(ref, () => ({
      onChange,
      ...restProps,
    }));

    return (
      <AntSelect
        mode={mode}
        value={selectedValues}
        onChange={handleChange}
        style={style}
        {...restProps}
      >
        {renderOptions()}
      </AntSelect>
    );
  },
);

export default Select;
