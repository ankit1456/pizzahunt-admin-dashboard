import {
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import { FocusEvent, useState } from "react";
import useCategories from "../../hooks/categories/useCategories";
import { FormItem } from "../../ui";
import ImageUpload from "../../features/products/ImageUpload";
import SelectRestaurant from "../common/SelectRestaurant";
import PriceConfigurationForm from "../../features/products/PriceConfigurationForm";
import AttributesForm from "../../features/products/AttributesForm";

function AddProductForm() {
  // const { user } = useAuth();
  const [error, setError] = useState<string>("");

  const form = Form.useFormInstance();

  const handleFormValidation = (e: FocusEvent<HTMLInputElement>) => {
    form.validateFields([e.target.id]);
  };
  const selectedCategoryId = Form.useWatch<string>("categoryId", form);
  const { data } = useCategories();

  return (
    <Row className="add-user-form" gutter={20}>
      <Col span={24}>
        <Flex vertical gap={20}>
          <Card title="Basic Info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <FormItem
                  label="Product name"
                  name="productName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide product's name",
                    },
                  ]}
                  handleFormValidation={handleFormValidation}
                />
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Please select product's category",
                    },
                  ]}
                >
                  <Select
                    // id="select-category"
                    allowClear
                    className="width-full"
                    placeholder="category"

                    // disabled={user?.id === editProductId}
                  >
                    {data?.data.map((category) => (
                      <Select.Option key={category._id} value={category._id}>
                        {category.categoryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please provide product's description",
                    },
                  ]}
                >
                  <Input.TextArea
                    maxLength={300}
                    autoSize={{ minRows: 2, maxRows: 7 }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Product Image" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  validateStatus={error ? "error" : ""}
                  help={error || ""}
                  label="Image"
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: "Please upload product's image",
                    },
                  ]}
                >
                  <ImageUpload
                    initialImage={form.getFieldValue("image")}
                    setError={setError}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Tenant Info" bordered={false}>
            <Row>
              {/* {selectedRole === Roles.MANAGER && ( */}
              <Col span={12}>
                <Form.Item
                  label="Restaurant"
                  name="tenantId"
                  rules={[
                    { required: true, message: "please select a restaurant" },
                  ]}
                >
                  <SelectRestaurant />
                </Form.Item>
              </Col>
              {/* )} */}
            </Row>
          </Card>

          <Card title="Status" bordered={false}>
            <Row>
              <Col>
                <Flex gap={10} align="start">
                  <Form.Item label="isPublished" name="isPublished">
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                  </Form.Item>
                  <Typography.Text
                    style={{
                      fontSize: "13px",
                      marginTop: "5px",
                    }}
                  >
                    published
                  </Typography.Text>
                </Flex>
              </Col>
            </Row>
          </Card>

          {selectedCategoryId && (
            <Card title="Product price configuration">
              <Row>
                <Col>
                  <PriceConfigurationForm
                    selectedCategoryId={selectedCategoryId}
                  />
                </Col>
              </Row>
            </Card>
          )}

          {selectedCategoryId && (
            <Card title="Product attributes">
              <Row>
                <Col>
                  <AttributesForm selectedCategoryId={selectedCategoryId} />
                </Col>
              </Row>
            </Card>
          )}
        </Flex>
      </Col>
    </Row>
  );
}

export default AddProductForm;
