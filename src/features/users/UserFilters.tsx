import { Card, Col, Form, Input, Row, Select } from "antd";
import { PropsWithChildren } from "react";
import { Roles } from "../../types/user.types";

function UserFilter({ children }: Readonly<PropsWithChildren>) {
  return (
    <Card className="user-filters">
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item name="q">
                <Input.Search allowClear placeholder="search users" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="role">
                <Select allowClear className="width-full" placeholder="role">
                  <Select.Option value="">All Users </Select.Option>
                  <Select.Option value={Roles.ADMIN}>Admin</Select.Option>
                  <Select.Option value={Roles.MANAGER}>Manager</Select.Option>
                  <Select.Option value={Roles.CUSTOMER}>Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={6}>
              <Select allowClear className="width-full" placeholder="status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inActive">In Active</Select.Option>
                <Select.Option value="all">All Users</Select.Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
}

export default UserFilter;
