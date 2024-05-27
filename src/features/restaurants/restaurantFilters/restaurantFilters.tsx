import { Card, Col, Form, Input, Row } from "antd";
import { PropsWithChildren } from "react";
import "./restaurantsFilters.css";

function RestaurantFilters({ children }: PropsWithChildren) {
  return (
    <Card className="restaurant-filters">
      <Row justify="space-between" align="middle">
        <Col>
          <Form.Item name="q" style={{ marginBottom: 0 }}>
            <Input.Search
              className="restaurant-search"
              allowClear
              placeholder="search"
            />
          </Form.Item>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
}

export default RestaurantFilters;
