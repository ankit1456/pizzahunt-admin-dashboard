import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { Dispatch, PropsWithChildren, SetStateAction, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SelectRestaurant from "../../common/components/SelectRestaurant";
import useCategories from "../../hooks/categories/useCategories";
import { TFilterPayload, TQueryParams } from "../../types";
import { debounce } from "../../utils";

type Props = {
  queryParams: TQueryParams;
  setQueryParams: Dispatch<SetStateAction<TQueryParams>>;
};

function ProductFilters({
  children,
  setQueryParams,
}: Readonly<PropsWithChildren<Props>>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  const { data: categories } = useCategories();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string | undefined) => {
        setQueryParams((params) => ({ ...params, q: value, page: 1 }));
      }),
    [setQueryParams]
  );

  const handleFilterChange = (filterData: TFilterPayload[]) => {
    const filters = filterData
      .map((filter) => ({
        [filter.name[0]]: filter.value,
      }))
      .reduce((acc, entry) => ({ ...acc, ...entry }), {});

    if ("q" in filters) {
      if (filters.q) searchParams.set("q", filters.q);
      else searchParams.delete("q");
      debouncedSearch(filters.q);
    } else {
      if (filters.categoryId) searchParams.set("category", filters.categoryId);
      else if ("categoryId" in filters && !filters.categoryId)
        searchParams.delete("category");

      if (filters.tenantId) searchParams.set("restaurant", filters.tenantId);
      else if ("tenantId" in filters && !filters.tenantId)
        searchParams.delete("restaurant");

      if (filters.isPublished)
        searchParams.set("published", filters.isPublished);
      else if ("isPublished" in filters && !filters.isPublished)
        searchParams.delete("published");

      setQueryParams((params) => ({ ...params, ...filters, page: 1 }));
    }

    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <Form
      form={form}
      initialValues={{
        q: searchParams.get("q") ?? "",
        isPublished: searchParams.get("published") === "true",
        categoryId: searchParams.get("category"),
        tenantId: searchParams.get("restaurant"),
      }}
      onFieldsChange={handleFilterChange}
    >
      <Card className="user-filters">
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Row gutter={20} align="middle">
              <Col span={6}>
                <Form.Item name="q">
                  <Input.Search allowClear placeholder="search products" />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item name="categoryId">
                  <Select
                    allowClear
                    className="width-full"
                    placeholder="category"
                  >
                    {categories?.data.map((category) => (
                      <Select.Option key={category._id} value={category._id}>
                        {category.categoryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item name="tenantId">
                  {/* <Select
                    allowClear
                    className="width-full"
                    placeholder="Restaurant"
                  >
                    <Select.Option value="SADFD">bengaluru</Select.Option>
                    <Select.Option value="mumisd">mumbai</Select.Option>
                  </Select> */}

                  <SelectRestaurant placeholder="restaurant" />
                </Form.Item>
              </Col>

              <Col>
                <Space>
                  <Form.Item name="isPublished">
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Form.Item>
                  <Typography.Text style={{ fontSize: "13px" }}>
                    {form.getFieldValue("isPublished")
                      ? "published"
                      : "non published"}
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col>{children}</Col>
        </Row>
      </Card>
    </Form>
  );
}

export default ProductFilters;
