import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, message, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import {
  AddRestaurantDrawer,
  AddRestaurantForm,
  RestaurantFilters,
} from "../../features/restaurants";
import { useRestaurants } from "../../hooks";
import { LIMIT_PER_PAGE, TQueryParams } from "../../lib/types";
import { TTenant, TTenantPayload } from "../../lib/types/tenant.types";
import { Breadcrumb, Loader, Table } from "../../ui";
import { formatDate } from "../../lib/utils";
import {
  createRestaurant,
  updateRestaurant,
} from "../../http/services/tenant.service";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [restaurantToEdit, setRestaurantToEdit] = useState<TTenant | null>(
    null
  );

  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: LIMIT_PER_PAGE,
  });

  const [form] = Form.useForm<TTenantPayload>();
  const { data, isFetching, isError, error } = useRestaurants(queryParams);

  const isEditMode = !!restaurantToEdit;
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);

    setQueryParams((queryParams) => ({
      ...queryParams,
      page,
    }));
  };

  const { mutate: newRestaurantMutate } = useMutation({
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

  const { mutate: editRestaurantMutate } = useMutation({
    mutationFn: (formValues: TTenantPayload) =>
      updateRestaurant(restaurantToEdit!.id, formValues),
    onSuccess: () => {
      form.resetFields();
      handleCloseDrawer();

      queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      messageApi.open({
        type: "success",
        content: "Restaurant updated successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });

  const handleEditRestaurant = (tenant: TTenant) => {
    setRestaurantToEdit(tenant);
    form.setFieldsValue(tenant);
    setIsDrawerOpen(true);
  };

  const handleSubmit = (formValues: TTenantPayload) => {
    if (isEditMode) editRestaurantMutate(formValues);
    else newRestaurantMutate(formValues);
  };

  const errorMessage = useMemo(() => {
    if (error instanceof AxiosError)
      return error.response?.data.message ?? error.code === "ERR_NETWORK"
        ? "Having trouble reaching the internet. Please try again later"
        : error.message;

    return "";
  }, [error]);

  return (
    <Flex vertical gap={12}>
      {contextHolder}
      <Flex justify="space-between" align="center">
        <Breadcrumb
          items={[
            {
              label: "Restaurants",
              to: "/restaurants",
            },
          ]}
        />

        <div style={{ marginRight: "10px" }}>
          {isFetching && <Loader size={22} />}
          {isError && !isFetching && (
            <Typography.Text className="font-12" type="danger">
              {errorMessage}
            </Typography.Text>
          )}
        </div>
      </Flex>

      <RestaurantFilters setQueryParams={setQueryParams}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Restaurant
        </Button>
      </RestaurantFilters>

      <Table<TTenant>
        columns={[
          ...columns,
          {
            title: "Actions",
            render: (_: string, tenant: TTenant) => {
              return (
                <Button
                  type="link"
                  onClick={() => handleEditRestaurant(tenant)}
                >
                  <MdEdit size={18} />
                </Button>
              );
            },
          },
        ]}
        data={data}
        onPageChange={handlePageChange}
        rowKey="id"
      />

      <AddRestaurantDrawer
        form={form}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={handleCloseDrawer}
        isEditMode={isEditMode}
      >
        <Form<TTenantPayload>
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <AddRestaurantForm />
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </AddRestaurantDrawer>
    </Flex>
  );
}

export default Restaurants;
