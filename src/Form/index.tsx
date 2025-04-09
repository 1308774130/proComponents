/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form as AntForm, Col, Row } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import type {
  CustomFormComponent,
  FormColumn,
  FormInstance,
  FormProps,
} from "./interface";
import { useForm } from "./hooks/useForm";
import FormContext from "./hooks/formContext";
import Footer from "./components/Footer";
import FormItem from "./components/FormItem";

export { useForm };
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
      children,
      readOnly: formReadOnly = false,
      ...restProps
    },
    ref
  ) => {
    const [form] = useForm();
    const finalForm = propsForm || form;
    const [formColumns, setFormColumns] = useState<FormColumn[] | undefined>(
      columns
    );
    const [updatedFields, setUpdatedFields] = useState<Set<string>>(new Set());

    finalForm.setFieldItem = (field: string, config: Partial<FormColumn>) => {
      setFormColumns((prev) =>
        prev?.map((item) =>
          item.field === field ? { ...item, ...config } : item
        )
      );
      setUpdatedFields((prev) => new Set(prev).add(field));
    };

    finalForm.getFieldItem = (field: string) =>
      formColumns?.find((item) => item.field === field);

    useImperativeHandle(ref, () => finalForm, [finalForm]);

    useEffect(() => {
      setFormColumns(columns);
    }, [columns]);

    const [span, setSpan] = useState(24 / columnGrid);

    useEffect(() => {
      if (restProps.layout !== "inline") setSpan(24 / columnGrid);
    }, [columnGrid]);

    return (
      <FormContext.Provider value={{ form: finalForm, components }}>
        <AntForm form={finalForm} onFinish={onFinish} {...restProps}>
          {header}
          {formColumns ? (
            <Row gutter={columnGap}>
              {formColumns.map((column, index) => (
                <Col span={span} key={column.field || `column-${index}`}>
                  <FormItem
                    column={column}
                    updatedFields={updatedFields}
                    setUpdatedFields={setUpdatedFields}
                    readOnly={formReadOnly}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <>{children}</>
          )}
          <Footer footer={footer} />
        </AntForm>
      </FormContext.Provider>
    );
  }
) as CustomFormComponent;

Form.Item = AntForm.Item;
Form.List = AntForm.List;
Form.Provider = AntForm.Provider;
Form.ErrorList = AntForm.ErrorList;
Form.useFormInstance = AntForm.useFormInstance;
Form.useWatch = AntForm.useWatch;
Form.useForm = useForm;

export default Form;
