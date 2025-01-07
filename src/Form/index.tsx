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
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Space,
  Switch,
  TreeSelect,
} from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import { Rule } from 'antd/lib/form';
import { Select } from 'pro-components';
import { SelectProps } from 'pro-components/Select/interface';
import React, { ReactNode, forwardRef, useImperativeHandle } from 'react';
import type { FormColumn, FormProps, FormRef } from './interface';

const Form = forwardRef<FormRef, FormProps>(
  ({ columns, header, footer, components = {}, onFinish, ...restProps }, ref) => {
    const [form] = AntForm.useForm();

    useImperativeHandle(ref, () => ({
      getFieldValue: form.getFieldValue,
      getFieldsValue: form.getFieldsValue,
      setFieldValue: form.setFieldValue,
      setFieldsValue: form.setFieldsValue,
      resetFields: form.resetFields,
      validateFields: form.validateFields,
      submit: form.submit,
      scrollToField: form.scrollToField as (name: string, options?: ScrollOptions) => void,
    }));

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
        readOnly = false,
        ...restProps
      } = column;

      const getComponent = () => {
        const defaultPlaceholder = `请输入${label}`;
        const componentProps = {
          placeholder: placeholder || defaultPlaceholder,
          disabled,
          readOnly,
          style: {
            width: restProps.width || type === 'switch' ? 'auto' : '100%',
            ...props?.style,
          },
          ...restProps,
          ...props,
        };

        if (components[type]) {
          const CustomComponent = components[type];
          return CustomComponent(
            {
              ...componentProps,
              onChange: value => {
                form.setFieldValue(field, value);
              },
            },
            form as unknown as FormRef
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
        >
          {getComponent()}
        </AntForm.Item>
      );

      return hide ? (
        <AntForm.Item noStyle shouldUpdate>
          {form => {
            const values = form.getFieldsValue();
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
          <Button onClick={() => form.resetFields()} key="form-btn-reset">
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
      <AntForm form={form} onFinish={onFinish} {...restProps}>
        {header}
        {columns.map((column, index) => (
          <React.Fragment key={column.field || `column-${index}`}>
            {renderFormItem(column)}
          </React.Fragment>
        ))}
        {renderFooter()}
      </AntForm>
    );
  }
);

export default Form;
