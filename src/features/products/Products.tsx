import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Image, message, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LIMIT_PER_PAGE, TQueryParams } from "../../types";
import { Breadcrumb, Loader, Pill, Table } from "../../ui";
import ProductFilters from "./ProductFilters";
import useProducts from "../../hooks/products/useProducts";
import {
  TProduct,
  TProductFormValues,
  TProductPayload,
} from "../../types/product.types";
import { ColumnsType } from "antd/lib/table";
import { formatDate } from "../../utils";
import { MdEdit } from "react-icons/md";
import { AxiosError } from "axios";
import { useAuth } from "../../store";
import { Roles } from "../../types/user.types";
import AddProductDrawer from "./AddProductDrawer";
import useCreateProduct from "../../hooks/products/useCreateProduct";
import AddProductForm from "./AddProductForm";
import { generateFormData } from "./helpers";
import useEditProduct from "../../hooks/products/useEditProduct";

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
          style={{ textTransform: "capitalize", borderRadius: "8px" }}
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<TProduct | null>(null);

  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  const { user } = useAuth();

  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: LIMIT_PER_PAGE,
    isPublished: !!searchParams.get("published"),
    categoryId: searchParams.get("category") ?? "",
    tenantId:
      user?.role === Roles.MANAGER
        ? user.tenant?.id
        : searchParams.get("restaurant") ?? "",
  });

  const { data, isFetching, isError, error } = useProducts(queryParams);

  const { newProductMutate, isPending } = useCreateProduct(
    handleFormSuccess,
    messageApi
  );
  const { editProductMutate, isPending: isEditing } = useEditProduct(
    productToEdit,
    handleFormSuccess,
    messageApi
  );

  const isEditMode = !!productToEdit;

  const handleEditProduct = (product: TProduct) => {
    setProductToEdit(product);
    form.setFieldsValue({
      ...product,
      attributes: product.attributes.reduce((acc, cur) => {
        return { ...acc, [cur.attributeName]: cur.value };
      }, {}),
    });
    setIsDrawerOpen(true);
  };

  function handleFormSuccess() {
    form.resetFields();
    handleCloseDrawer();
  }

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

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setProductToEdit(null);
  };

  function handleSubmit(formValues: TProductFormValues) {
    const formAttributes = formValues.attributes;

    const attributes = Object.entries(formAttributes).map(
      ([attributeName, value]) => ({
        attributeName,
        value,
      })
    );

    const data: TProductPayload = {
      ...formValues,
      attributes,
      image: formValues.image.file,
    };

    const productPayload = generateFormData(data);

    if (isEditMode) editProductMutate(productPayload);
    else newProductMutate(productPayload);
  }

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
            render: (_: string, product: TProduct) => {
              return (
                <Button type="link" onClick={() => handleEditProduct(product)}>
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
      <AddProductDrawer
        form={form}
        isLoading={isPending || isEditing}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={handleCloseDrawer}
        isEditMode={isEditMode}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            isPublished: isEditMode ? productToEdit.isPublished : false,
          }}
        >
          <AddProductForm />
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </AddProductDrawer>
    </Flex>
  );
}

export default Products;
