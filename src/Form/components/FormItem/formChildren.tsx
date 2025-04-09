import type {
  DatePickerProps,
  InputNumberProps,
  InputProps,
  MentionProps,
  RadioGroupProps,
  RateProps,
  SwitchProps,
  TreeSelectProps,
} from 'antd';
import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Switch,
  TreeSelect,
} from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { Select } from 'cruise-components';
import { SelectProps } from 'cruise-components/Select/interface';
import React, { useContext } from 'react';
import FormContext from '../../hooks/formContext';
import type { FormColumn, FormInstance } from '../../interface';
import { RangePickerProps } from 'antd/lib/date-picker';

const getLabelFromOptions = (options: any[], value: any) => {
  const option = options.find(option => option.value === value);
  return option ? option.label : value;
};

const formChildren = ({ column, ...props }: { column: FormColumn }) => {
  const { components, form } = useContext(FormContext);
  const {
    type,
    field,
    hide,
    label,
    required,
    validator,
    placeholder,
    disabled = false,
    readOnly = false,
    ...restProps
  } = column;
  const defaultPlaceholder = `请输入${label}`;

  const componentProps = {
    placeholder: placeholder || defaultPlaceholder,
    disabled,
    style: {
      width: restProps.width || type === 'switch' ? 'auto' : '100%',
      ...props?.style,
    },
    ...restProps,
    ...props,
    onChange: (value: any, ...args: any) => {
      // 先调用原始的 onChange
      if (restProps?.onChange) {
        // 处理不同控件的值
        restProps.onChange(value, form, ...args);
      }
    },
  };

  if (readOnly) {
    if (componentProps?.value)
      switch (type) {
        case 'select':
          return (
            <div>{getLabelFromOptions(componentProps?.options || [], componentProps.value)}</div>
          );
        case 'checkbox':
          const checkboxValues = Array.isArray(componentProps.value)
            ? componentProps.value.map(value =>
                getLabelFromOptions(componentProps.options || [], value)
              )
            : [];
          return <div>{checkboxValues.join(', ')}</div>;
        case 'radio':
          return (
            <div>{getLabelFromOptions(componentProps.options || [], componentProps.value)}</div>
          );
        case 'date':
          if (column.range) {
            const rangeValue = componentProps.value;
            return (
              <div>
                {rangeValue
                  ? `${rangeValue[0].format('YYYY-MM-DD')} - ${rangeValue[1].format('YYYY-MM-DD')}`
                  : ''}
              </div>
            );
          }
          return <div>{componentProps.value ? componentProps.value.format('YYYY-MM-DD') : ''}</div>;
        default:
          return <div>{componentProps.value}</div>;
      }
    else return <div>--</div>;
  }
  if (components[type]) {
    const CustomComponent = components[type];
    return CustomComponent(
      {
        ...componentProps,
      },
      form as unknown as FormInstance
    );
  }
  switch (type) {
    case 'select':
      return (
        <Select
          placeholder={placeholder || `请选择${label}`}
          {...(componentProps as SelectProps)}
        />
      );
    case 'date': {
      const dateColumn = column as Extract<FormColumn, { type: 'date' }>;
      if (dateColumn.range) {
        return (
          <DatePicker.RangePicker
            picker={dateColumn.picker || 'date'}
            placeholder={
              placeholder
                ? (placeholder as unknown as [string, string])
                : [`请选择${label}开始时间`, `请选择${label}结束时间`]
            }
            {...(componentProps as unknown as RangePickerProps)}
          />
        );
      }
      return (
        <DatePicker
          picker={dateColumn.picker || 'date'}
          placeholder={placeholder || `请选择${label}`}
          {...(componentProps as DatePickerProps)}
        />
      );
    }
    case 'switch':
      return <Switch {...(componentProps as SwitchProps)} />;
    case 'radio':
      return <Radio.Group {...(componentProps as RadioGroupProps)} />;
    case 'checkbox':
      return <Checkbox.Group {...(componentProps as CheckboxGroupProps)} />;
    case 'rate':
      return <Rate {...(componentProps as RateProps)} />;
    case 'number':
      return (
        <InputNumber
          controls={false}
          placeholder={placeholder || defaultPlaceholder}
          {...(componentProps as InputNumberProps)}
        />
      );
    case 'treeSelect':
      return (
        <TreeSelect
          placeholder={placeholder || `请选择${label}`}
          {...(componentProps as TreeSelectProps<any>)}
        />
      );
    case 'mention':
      return (
        <Mentions
          placeholder={placeholder || defaultPlaceholder}
          {...(componentProps as MentionProps)}
        />
      );
    case 'input':
    default:
      return (
        <Input
          placeholder={placeholder || defaultPlaceholder}
          {...(componentProps as InputProps)}
        />
      );
  }
};

export default formChildren;
