import React from "react";
import { FormColumn } from "../../interface";
import FormContext from "../../hooks/formContext";
import { Form } from "antd";
import { Rule } from "antd/lib/form";
import FormChildren from "./formChildren";

const renderFormItem = ({
  column,
  updatedFields,
  setUpdatedFields,
  readOnly,
}: {
  column: FormColumn;
  updatedFields: Set<string>;
  setUpdatedFields: (fields: Set<string>) => Set<string>;
}) => {
  const { form } = React.useContext(FormContext) as any;
  const { field, hide, label, required, validator } = column;

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
        validator.forEach((rule) => rules.push(rule));
      } else {
        rules.push(validator);
      }
    }
    return rules as Rule[];
  };

  const FormMainItem = (
    <Form.Item
      key={field}
      name={field}
      label={label}
      rules={getRules()}
      colon={!!label?.trim()}
      shouldUpdate={(prevValues: any, curValues) => {
        if (updatedFields.has(field)) {
          setUpdatedFields((prev) => {
            const next: Set<string> = new Set(prev);
            next.delete(field);
            return next;
          });
          return true;
        }
        return prevValues[field] !== curValues[field];
      }}
    >
      <FormChildren column={{ ...column, readOnly }} />
    </Form.Item>
  );

  if (hide) {
    return (
      <Form.Item noStyle shouldUpdate key={field}>
        {() => {
          const values = form.getFieldsValue();
          const isHidden = typeof hide === "function" ? hide(values) : hide;
          if (isHidden) return null;
          return FormMainItem;
        }}
      </Form.Item>
    );
  }
  return FormMainItem;
};
export default renderFormItem;
