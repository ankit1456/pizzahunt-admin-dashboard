import { Card, Col, Form, Row } from "antd";
import { FocusEvent } from "react";
import { FormItem } from "../../ui";

function AddRestaurantForm() {
  const form = Form.useFormInstance();

  const handleFormValidation = (e: FocusEvent<HTMLInputElement>) => {
    form.validateFields([e.target.id]);
  };

  return (
    <Row gutter={20}>
      <Col span={24}>
        <Card title="Restaurant info" bordered={false}>
          <Row gutter={20}>
            <Col span={12}>
              <FormItem
                label="Restaurant name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please provide restaurant's name",
                    validateTrigger: "onBlur",
                  },
                ]}
                handleFormValidation={handleFormValidation}
              />
            </Col>
            <Col span={12}>
              <FormItem
                label="Restaurant address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please provide restaurant's address",
                    validateTrigger: "onBlur",
                  },
                ]}
                handleFormValidation={handleFormValidation}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default AddRestaurantForm;
