/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Form as AntForm,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Row,
  Space,
  Switch,
  TreeSelect,
} from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import { Rule } from 'antd/lib/form';
import { Select } from 'cruise-components';
import { SelectProps } from 'cruise-components/Select/interface';
import React, { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { FormColumn, FormInstance, FormProps } from './interface';

const Form = forwardRef<FormInstance, FormProps>(
  (
    {
      columns,
      header,
      footer,
      components = {},
      onFinish,
      form: propsForm,
      columnGrid = 1,
      columnGap = 16,
      ...restProps
    },
    ref
  ) => {
    const [form] = AntForm.useForm();
    const finalForm = propsForm || form;
    const [formColumns, setFormColumns] = useState<FormColumn[]>(columns);
    const [updatedFields, setUpdatedFields] = useState<Set<string>>(new Set());

    finalForm.setFieldItem = (field: string, config: Partial<FormColumn>) => {
      setFormColumns(prev =>
        prev.map(item => (item.field === field ? { ...item, ...config } : item))
      );
      setUpdatedFields(prev => new Set(prev).add(field));
    };

    finalForm.getFieldItem = (field: string) => formColumns.find(item => item.field === field);

    useImperativeHandle(ref, () => finalForm, [finalForm]);

    useEffect(() => {
      setFormColumns(columns);
    }, [columns]);

    const [span, setSpan] = useState(24 / columnGrid);

    useEffect(() => {
      if (restProps.layout !== 'inline') setSpan(24 / columnGrid);
    }, [columnGrid]);

    const renderFormItem = (column: FormColumn) => {
      const {
        type,
        field,
        hide,
        label,
        required,
        validator,
        placeholder,
        props,
        disabled = false,
        ...restProps
      } = column;

      const getComponent = () => {
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
          onChange: (value: any, ...args: any[]) => {
            // 先调用原始的 onChange
            if (restProps?.onChange) {
              // 处理不同控件的值
              restProps.onChange(value, finalForm, ...args);
            }
          },
        };

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
                  {...(componentProps as unknown as RangePickerProps<any>)}
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

      const getRules = () => {
        const rules = [];
        if (required) {
          rules.push({ required: true, message: `${label}必填` });
        }
        if (validator) {
          if (validator instanceof RegExp) {
            rules.push({
              pattern: validator,
              message: `请输入正确的${label}格式`,
            });
          } else if (Array.isArray(validator)) {
            validator.forEach(rule => rules.push(rule));
          } else {
            rules.push(validator);
          }
        }
        return rules as Rule[];
      };

      const FormItem = (
        <AntForm.Item
          key={field}
          name={field}
          label={label}
          rules={getRules()}
          colon={!!label?.trim()}
          shouldUpdate={(prevValues, curValues) => {
            if (updatedFields.has(field)) {
              setUpdatedFields(prev => {
                const next = new Set(prev);
                next.delete(field);
                return next;
              });
              return true;
            }
            return prevValues[field] !== curValues[field];
          }}
        >
          {getComponent()}
        </AntForm.Item>
      );

      return hide ? (
        <AntForm.Item noStyle shouldUpdate key={field}>
          {finalForm => {
            const values = finalForm.getFieldsValue();
            const isHidden = typeof hide === 'function' ? hide(values) : hide;
            return isHidden ? null : FormItem;
          }}
        </AntForm.Item>
      ) : (
        FormItem
      );
    };

    const renderFooterContent = (content: ReactNode | 'submit' | 'reset', index?: number) => {
      if (content === 'submit') {
        return (
          <Button type="primary" htmlType="submit" key="form-btn-submit">
            提交
          </Button>
        );
      }
      if (content === 'reset') {
        return (
          <Button onClick={() => finalForm.resetFields()} key="form-btn-reset">
            重置
          </Button>
        );
      }
      if (React.isValidElement(content)) {
        return React.cloneElement(content, { key: `content-${index}` });
      }
      return <React.Fragment key={`content-${index}`}>{content}</React.Fragment>;
    };

    const renderFooter = () => {
      if (!footer) return null;

      const footerItems = Array.isArray(footer) ? footer : [footer];
      const defaultButtons = footerItems.filter(item => item === 'submit' || item === 'reset');
      const customItems = footerItems.filter(item => item !== 'submit' && item !== 'reset');

      return (
        <>
          {defaultButtons.length > 0 && (
            <AntForm.Item>
              <div style={{ textAlign: 'center' }}>
                <Space>
                  {defaultButtons.map((item, index) => (
                    <span key={`default-${index}`}>{renderFooterContent(item)}</span>
                  ))}
                </Space>
              </div>
            </AntForm.Item>
          )}
          {customItems.map((item, index) => (
            <AntForm.Item key={`custom-${index}`}>{renderFooterContent(item, index)}</AntForm.Item>
          ))}
        </>
      );
    };

    return (
      <AntForm form={finalForm} onFinish={onFinish} {...restProps}>
        {header}
        <Row gutter={columnGap}>
          {formColumns.map((column, index) => (
            <Col span={span} key={column.field || `column-${index}`}>
              {renderFormItem(column)}
            </Col>
          ))}
        </Row>
        {renderFooter()}
      </AntForm>
    );
  }
);
export default Form;
