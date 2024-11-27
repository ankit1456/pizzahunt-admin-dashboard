import { Card, Col, Form, Input, Row } from "antd";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import "./restaurantsFilters.css";
import { TFilterPayload, TQueryParams } from "../../../lib/types";
import { debounce } from "../../../lib/utils";

type Props = {
  setQueryParams: Dispatch<SetStateAction<TQueryParams>>;
};

function RestaurantFilters({
  setQueryParams,
  children,
}: Readonly<PropsWithChildren<Props>>) {
  const [form] = Form.useForm();

  const handleDebouncedSearch = debounce((filterData: TFilterPayload[]) => {
    const q = filterData[0].value;
    setQueryParams((params) => ({ ...params, q, page: 1 }));
  });

  return (
    <Form form={form} onFieldsChange={handleDebouncedSearch}>
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
    </Form>
  );
}

export default RestaurantFilters;
