import SelectRestaurant from "@components/common/SelectRestaurant";
import { FormItem } from "@components/common/ui";
import { Roles } from "@lib/types/user.types";
import { useAuth } from "@src/state/store";
import { Card, Col, Flex, Form, Row, Select } from "antd";
import { FocusEvent } from "react";

type Props = {
  isEditMode: boolean;
  editUserId: string | undefined;
};

function AddUserForm({ isEditMode = false, editUserId }: Readonly<Props>) {
  const { user } = useAuth();

  const form = Form.useFormInstance();

  const handleFormValidation = (e: FocusEvent<HTMLInputElement>) => {
    form.validateFields([e.target.id]);
  };

  const selectedRole = Form.useWatch<Roles>("role", form);

  return (
    <Row className="add-user-form" gutter={20}>
      <Col span={24}>
        <Flex vertical gap={20}>
          <Card title="Basic info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <FormItem
                  label="First name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide user's first name",
                    },
                  ]}
                  handleFormValidation={handleFormValidation}
                />
              </Col>
              <Col span={12}>
                <FormItem
                  label="Last name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide user's last name",
                    },
                  ]}
                  handleFormValidation={handleFormValidation}
                />
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <FormItem
                  inputType="email"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please provide user's email",
                    },
                    {
                      type: "email",
                      message: "Please provide a valid email",
                    },
                  ]}
                  handleFormValidation={handleFormValidation}
                />
              </Col>
              {!isEditMode && (
                <Col span={12}>
                  <FormItem
                    inputType="password"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please provide user's password",
                      },
                      {
                        min: 8,
                        message: "Password must contain 8 characters",
                      },
                    ]}
                    handleFormValidation={handleFormValidation}
                  />
                </Col>
              )}
            </Row>
          </Card>

          <Card title="Role" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select
                    id="select-role"
                    allowClear
                    className="width-full"
                    placeholder="assign role"
                    disabled={user?.id === editUserId}
                  >
                    <Select.Option value={Roles.CUSTOMER}>
                      Customer
                    </Select.Option>
                    <Select.Option value={Roles.MANAGER}>Manager</Select.Option>
                    <Select.Option value={Roles.ADMIN}>Admin</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              {selectedRole === Roles.MANAGER && (
                <Col span={12}>
                  <Form.Item label="Restaurant" name="tenantId">
                    <SelectRestaurant />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>
        </Flex>
      </Col>
    </Row>
  );
}

export default AddUserForm;
