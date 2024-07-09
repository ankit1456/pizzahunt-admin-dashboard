import { Card, Col, Flex, Form, FormInstance, Input, Row, Select } from "antd";
import { Rule } from "antd/lib/form";
import { FocusEvent } from "react";
import useRestaurants from "../../hooks/useRestaurants";
import { Roles } from "../../types/user.types";

function AddUserForm({ form }: Readonly<{ form: FormInstance }>) {
  const { restaurants } = useRestaurants();

  const handleFormValidation = (e: FocusEvent<HTMLInputElement>) => {
    form.validateFields([e.target.id]);
  };

  const renderFormItem = (
    label: string,
    name: string,
    rules: Rule[],
    inputType: "text" | "email" | "password" = "text"
  ) => (
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

  return (
    <Row className="add-user-form" gutter={20}>
      <Col span={24}>
        <Flex vertical gap={20}>
          <Card title="Basic info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                {renderFormItem("First name", "firstName", [
                  {
                    required: true,
                    message: "Please provide user's first name",
                  },
                ])}
              </Col>
              <Col span={12}>
                {renderFormItem("Last name", "lastName", [
                  {
                    required: true,
                    message: "Please provide user's last name",
                  },
                ])}
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                {renderFormItem(
                  "Email",
                  "email",
                  [
                    {
                      required: true,
                      message: "Please provide user's email",
                    },
                    {
                      type: "email",
                      message: "Please provide a valid email",
                    },
                  ],
                  "email"
                )}
              </Col>
              <Col span={12}>
                {renderFormItem(
                  "Password",
                  "password",
                  [
                    {
                      required: true,
                      message: "Please provide user's password",
                    },
                    {
                      min: 8,
                      message: "Password must contain 8 characters",
                    },
                  ],
                  "password"
                )}
              </Col>
            </Row>
          </Card>

          <Card title="Role" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select
                    allowClear
                    className="width-full"
                    placeholder="Assign role"
                  >
                    <Select.Option value={Roles.CUSTOMER}>
                      Customer
                    </Select.Option>
                    <Select.Option value={Roles.MANAGER}>Manager</Select.Option>
                    <Select.Option value={Roles.ADMIN}>Admin</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId">
                  <Select
                    allowClear
                    className="width-full"
                    placeholder="Assign restaurant"
                  >
                    {restaurants?.map((rest) => (
                      <Select.Option key={rest.id} value={rest.id}>
                        {rest.name}, {rest.address}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Flex>
      </Col>
    </Row>
  );
}

export default AddUserForm;
