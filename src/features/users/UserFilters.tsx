import { Card, Col, Form, Input, Row, Select } from "antd";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Roles } from "../../types/user.types";
import { useSearchParams } from "react-router-dom";
import { TFilterPayload, TQueryParams } from "../../types";
import { debounce } from "../../utils";

type Props = {
  setQueryParams: Dispatch<SetStateAction<TQueryParams>>;
};

function UserFilter({
  children,
  setQueryParams,
}: Readonly<PropsWithChildren<Props>>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  const debouncedSearch = debounce((value: string | undefined) => {
    setQueryParams((params) => ({ ...params, q: value, page: 1 }));
  }, 2000);

  const handleFilterChange = (filterData: TFilterPayload[]) => {
    const filters = filterData
      .map((filter) => ({
        [filter.name[0]]: filter.value,
      }))
      .reduce((acc, entry) => ({ ...acc, ...entry }), {});

    if ("q" in filters) {
      debouncedSearch(filters.q);
    } else {
      setQueryParams((params) => ({ ...params, ...filters, page: 1 }));

      if (filters.role) searchParams.set("role", filters.role);
      else searchParams.delete("role");
    }
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <Form
      form={form}
      initialValues={{
        role: searchParams.get("role") ?? "",
      }}
      onFieldsChange={handleFilterChange}
    >
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
                    <Select.Option value={Roles.CUSTOMER}>
                      Customer
                    </Select.Option>
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
    </Form>
  );
}

export default UserFilter;
