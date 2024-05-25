import { Card, Col, Input, Row, Select } from "antd";
import { PropsWithChildren } from "react";
import { Roles } from "../../../types/user.types";
import "./userFilters.css";

type Props = {
  readonly onFilterChange: (filterName: string, filterValue: string) => void;
};

function UsersFilter({ onFilterChange, children }: PropsWithChildren<Props>) {
  return (
    <Card className="user-filters">
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={10}>
              <Input.Search
                className="width-full user-search"
                placeholder="search user"
                onChange={(e) =>
                  onFilterChange("userSearchQuery", e.target.value)
                }
              />
            </Col>
            <Col span={6}>
              <Select
                allowClear
                defaultValue="all"
                className="width-full"
                placeholder="role"
                onChange={(selectedOption) =>
                  onFilterChange("userRoleQuery", selectedOption)
                }
              >
                <Select.Option value="all">All Users </Select.Option>
                <Select.Option value={Roles.ADMIN}>Admin</Select.Option>
                <Select.Option value={Roles.MANAGER}>Manager</Select.Option>
                <Select.Option value={Roles.CUSTOMER}>Customer</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select
                allowClear
                className="width-full"
                placeholder="status"
                onChange={(selectedOption) =>
                  onFilterChange("userStatusQuery", selectedOption)
                }
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inActive">InActive</Select.Option>
                <Select.Option value="all">All Users</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
}

export default UsersFilter;
