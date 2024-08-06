import { Card, Col, Flex, Form, FormInstance, Row, Select } from "antd";
import { FocusEvent, useState } from "react";
import { useInfiniteRestaurants } from "../../hooks";
import { LIMIT_PER_SCROLL, TQueryParams } from "../../types";
import { Roles } from "../../types/user.types";
import { FormItem, Loader } from "../../ui";
import { debounce } from "../../utils";

type Props = {
  form: FormInstance;
  isEditMode: boolean;
};

function AddUserForm({ form, isEditMode = false }: Readonly<Props>) {
  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: 1,
    limit: LIMIT_PER_SCROLL,
    q: "",
  });

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteRestaurants(queryParams);

  const handleFormValidation = (e: FocusEvent<HTMLInputElement>) => {
    form.validateFields([e.target.id]);
  };

  const handleDebouncedSearch = debounce((value: string) => {
    setQueryParams((params) => ({ ...params, q: value }));
  });

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
                    <Select
                      allowClear
                      className="width-full"
                      placeholder="assign restaurant"
                      listHeight={192}
                      showSearch
                      filterOption={false}
                      loading={isFetching}
                      onPopupScroll={(e) => {
                        const target = e.target as HTMLElement;
                        if (
                          target.scrollTop + target.offsetHeight ===
                            target.scrollHeight &&
                          hasNextPage &&
                          !isFetching &&
                          !isFetchingNextPage
                        ) {
                          fetchNextPage();
                        }
                      }}
                      onSearch={handleDebouncedSearch}
                    >
                      {data?.map((page) =>
                        page.data.data.map((restaurant) => (
                          <Select.Option
                            value={restaurant.id}
                            key={restaurant.id}
                          >
                            {restaurant.name}, {restaurant.address}
                          </Select.Option>
                        ))
                      )}

                      {hasNextPage && (
                        <Select.Option
                          style={{ pointerEvents: "none" }}
                          value=""
                          disabled
                        >
                          {isFetchingNextPage && (
                            <Flex align="center" justify="center">
                              <Loader />
                            </Flex>
                          )}
                        </Select.Option>
                      )}
                    </Select>
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
