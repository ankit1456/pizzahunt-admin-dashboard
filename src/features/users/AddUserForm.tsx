import { Card, Col, Form, Input, Row } from "antd";

function AddUserForm() {
  return (
    <Row>
      <Col span={24}>
        <Card title="basic info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="First name" name="firstName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last name" name="lastName">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last name" name="lastName">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default AddUserForm;
