import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";
import { FocusEvent } from "react";

type Props = {
  label: string;
  name: string;
  rules: Rule[];
  handleFormValidation: (e: FocusEvent<HTMLInputElement>) => void;
  inputType?: "text" | "email" | "password";
};

function FormItem({
  inputType = "text",
  label,
  name,
  rules,
  handleFormValidation,
}: Readonly<Props>) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules.map((rule) => ({ ...rule, validateTrigger: "onBlur" }))}
    >
      {inputType === "password" ? (
        <Input.Password onBlur={handleFormValidation} />
      ) : (
        <Input size="large" type={inputType} onBlur={handleFormValidation} />
      )}
    </Form.Item>
  );
}

export default FormItem;
