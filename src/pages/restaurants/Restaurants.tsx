import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Flex, Form, message, Typography } from "antd";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  AddRestaurantDrawer,
  AddRestaurantForm,
  RestaurantFilters,
} from "../../features/restaurants";
import { useRestaurants } from "../../hooks";
import { createRestaurant } from "../../http/api";
import { LIMIT_PER_PAGE, TFilterPayload, TQueryParams } from "../../types";
import { TTenant, TTenantPayload } from "../../types/tenant.types";
import { Loader, Table } from "../../ui";
import { debounce, formatDate } from "../../utils";
import { ColumnsType } from "antd/lib/table";

const columns: ColumnsType<TTenant> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <span style={{ color: "var(--primary-color)" }}>{name}</span>
    ),
  },

  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt ",
    render: (createdAt: string) => formatDate(createdAt),
  },
];

function Restaurants() {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: 1,
    limit: LIMIT_PER_PAGE,
  });

  const [form] = Form.useForm<TTenantPayload>();
  const [restaurantFilterForm] = Form.useForm();

  const { data, isFetching, isError, error } = useRestaurants(queryParams);

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const handlePageChange = (page: number) => {
    setQueryParams((queryParams) => ({
      ...queryParams,
      page,
    }));
  };

  const handleDebouncedSearch = debounce((filterData: TFilterPayload[]) => {
    const q = filterData[0].value;
    setQueryParams((params) => ({ ...params, q, page: 1 }));
  });

  const { mutate: newRestaurantMutate } = useMutation({
    mutationKey: ["restaurant"],
    mutationFn: createRestaurant,
    onSuccess: () => {
      form.resetFields();
      handleCloseDrawer();

      queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      messageApi.open({
        type: "success",
        content: "Restaurant created successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });

  const handleSubmit = (formValues: TTenantPayload) => {
    newRestaurantMutate(formValues);
  };

  return (
    <Flex vertical gap={12}>
      {contextHolder}
      <Flex justify="space-between" align="center">
        <Breadcrumb
          separator={<FaAngleRight style={{ marginBottom: "-2px" }} />}
          style={{ fontSize: ".8rem" }}
          items={[
            {
              title: (
                <Link className="link" to="/">
                  Dashboard
                </Link>
              ),
            },
            {
              title: (
                <Link className="link" to="/restaurants">
                  Restaurants
                </Link>
              ),
            },
          ]}
        />

        <div style={{ marginRight: "10px" }}>
          {isFetching && <Loader size={22} />}
          {isError && (
            <Typography.Text type="danger">{error?.message}</Typography.Text>
          )}
        </div>
      </Flex>

      <Form form={restaurantFilterForm} onFieldsChange={handleDebouncedSearch}>
        <RestaurantFilters>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Restaurant
          </Button>
        </RestaurantFilters>
      </Form>

      <Table<TTenant>
        columns={columns}
        data={data}
        onPageChange={handlePageChange}
        rowKey="id"
      />

      <AddRestaurantDrawer
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={handleCloseDrawer}
        form={form}
      >
        <Form<TTenantPayload>
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <AddRestaurantForm form={form} />
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </AddRestaurantDrawer>
    </Flex>
  );
}

export default Restaurants;
