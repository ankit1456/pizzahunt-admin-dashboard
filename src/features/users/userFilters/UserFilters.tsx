import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select } from "antd";
import { Roles } from "../../../types/user.types";

function UsersFilter() {
  return (
    <Card className="user-filters">
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={10}>
              <Input.Search className="width-full" placeholder="search user" />
            </Col>
            <Col span={6}>
              <Select allowClear className="width-full" placeholder="status">
                <Select.Option value="inActive">InActive</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select allowClear className="width-full" placeholder="role">
                <Select.Option value={Roles.ADMIN}>Admin</Select.Option>
                <Select.Option value={Roles.MANAGER}>Manager</Select.Option>
                <Select.Option value={Roles.CUSTOMER}>Customer</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            add user
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default UsersFilter;
