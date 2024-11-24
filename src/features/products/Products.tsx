import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Image, message, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LIMIT_PER_PAGE, TQueryParams } from "../../types";
import { Breadcrumb, Loader, Pill, Table } from "../../ui";
import ProductFilters from "./ProductFilters";
import useProducts from "../../hooks/products/useProducts";
import { TProduct } from "../../types/product.types";
import { ColumnsType } from "antd/lib/table";
import { formatDate } from "../../utils";
import { MdEdit } from "react-icons/md";
import { AxiosError } from "axios";

const columns: ColumnsType<TProduct> = [
  {
    title: "Product name",
    dataIndex: "productName",
    key: "productName",

    render: (productName: string, product: TProduct) => (
      <Space>
        <Image
          loading="lazy"
          height={50}
          width={60}
          style={{ objectFit: "contain" }}
          src={product.image.url}
        />

        <span style={{ color: "var(--primary-color)" }}>{productName}</span>
      </Space>
    ),
    // width: 190,
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    align: "center",
    render: (category) => <span>{category.categoryName}</span>,
    width: 100,
  },

  {
    title: "Status",
    dataIndex: "isPublished",
    key: "isPublished",
    align: "center",

    render: (isPublished: boolean) => {
      return (
        <Pill
          style={{ textTransform: "capitalize" }}
          type={isPublished ? "success" : "draft"}
        >
          {isPublished ? "published" : "draft"}
        </Pill>
      );
    },
  },

  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt ",
    render: (createdAt: string) => formatDate(createdAt),
    width: 120,
  },
];

function Products() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: LIMIT_PER_PAGE,
    isPublished: !!searchParams.get("published"),
    categoryId: searchParams.get("category") ?? "",
    tenantId: searchParams.get("restaurant") ?? "",
  });

  const { data, isFetching, isError, error } = useProducts(queryParams);

  const errorMessage = useMemo(() => {
    if (error instanceof AxiosError)
      return error.response?.data.message ?? error.code === "ERR_NETWORK"
        ? "Having trouble reaching the internet. Please try again later"
        : error.message;

    return "";
  }, [error]);

  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);

    setQueryParams((params) => ({
      ...params,
      page,
    }));
  };

  return (
    <Flex vertical gap={12}>
      {contextHolder}
      <Flex justify="space-between" align="center">
        <Breadcrumb items={[{ label: "Products", to: "/products" }]} />

        <div style={{ marginRight: "10px" }}>
          {isFetching && <Loader size={22} />}
          {isError && !isFetching && (
            <Typography.Text className="font-12" type="danger">
              {errorMessage}
            </Typography.Text>
          )}
        </div>
      </Flex>

      <ProductFilters queryParams={queryParams} setQueryParams={setQueryParams}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Product
        </Button>
      </ProductFilters>

      <Table<TProduct>
        columns={[
          ...columns,
          {
            title: "Actions",
            render: (_: string) => {
              return (
                <Button type="link" onClick={() => {}}>
                  <MdEdit size={18} />
                </Button>
              );
            },
            width: 120,
          },
        ]}
        data={data}
        onPageChange={handlePageChange}
        rowKey="_id"
      />
    </Flex>
  );
}

export default Products;
