import React, { ReactNode } from "react";
import { Button, Form, Space } from "antd";
import FormContext from "../../hooks/formContext";

const renderFooter = ({ footer }: any) => {
  if (!footer) return null;
  const { form = {} } = React.useContext(FormContext);

  const renderFooterContent = (
    content: ReactNode | "submit" | "reset",
    index?: number
  ) => {
    if (content === "submit") {
      return (
        <Button type="primary" htmlType="submit" key="form-btn-submit">
          提交
        </Button>
      );
    }
    if (content === "reset") {
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

  const footerItems = Array.isArray(footer) ? footer : [footer];
  const defaultButtons = footerItems.filter(
    (item) => item === "submit" || item === "reset"
  );
  const customItems = footerItems.filter(
    (item) => item !== "submit" && item !== "reset"
  );

  return (
    <>
      {defaultButtons.length > 0 && (
        <Form.Item>
          <div style={{ textAlign: "center" }}>
            <Space>
              {defaultButtons.map((item, index) => (
                <span key={`default-${index}`}>
                  {renderFooterContent(item)}
                </span>
              ))}
            </Space>
          </div>
        </Form.Item>
      )}
      {customItems.map((item, index) => (
        <Form.Item key={`custom-${index}`}>
          {renderFooterContent(item, index)}
        </Form.Item>
      ))}
    </>
  );
};
export default renderFooter;
