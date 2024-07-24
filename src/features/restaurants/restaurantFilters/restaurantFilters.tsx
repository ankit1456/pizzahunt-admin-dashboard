import { Card, Col, Form, Input, Row } from "antd";
import { PropsWithChildren } from "react";
import "./restaurantsFilters.css";

function RestaurantFilters({ children }: Readonly<PropsWithChildren>) {
  return (
    <Card className="restaurant-filters">
      <Row justify="space-between">
        <Col span={8}>
          <Form.Item name="q">
            <Input.Search
              allowClear
              className="restaurant-search"
              placeholder="search restaurants"
            />
          </Form.Item>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
}

export default RestaurantFilters;
