import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Loader, Pill, Table } from "@components/common/ui";
import AddProductDrawer from "@components/products/AddProductDrawer";
import AddProductForm from "@components/products/AddProductForm";
import ProductFilters from "@components/products/ProductFilters";
import { useCreateProduct, useEditProduct, useProducts } from "@hooks/products";
import { LIMIT_PER_PAGE, TQueryParams } from "@lib/types";
import {
  TProduct,
  TProductFormValues,
  TProductPayload,
} from "@lib/types/product.types";
import { Roles } from "@lib/types/user.types";
import { formatDate, generateFormData } from "@lib/utils";
import { useAuth } from "@src/state/store";
import { Button, Flex, Form, Image, message, Space, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const columns: ColumnsType<TProduct> = [
  {
    title: "Product name",
    dataIndex: "productName",
    key: "productName",
    render: (productName: string, product) => (
      <Space>
        <Image
          loading="lazy"
          height={60}
          width={60}
          style={{ objectFit: "contain" }}
          src={product.image.url}
        />

        <span
          style={{ color: "var(--primary-color)", textTransform: "capitalize" }}
        >
          {productName}
        </span>
      </Space>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 200,
    render: (category) => <span>{category.categoryName}</span>,
  },

  {
    title: "Status",
    dataIndex: "isPublished",
    key: "isPublished",
    width: 200,
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
    width: 200,
    render: (createdAt: string) => formatDate(createdAt),
  },
];

function Products() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<TProduct | null>(null);
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

  const [form] = Form.useForm<TProductFormValues>();

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

  const handleCloseDrawer = () => {
    console.log(form.isFieldsTouched());
    setIsDrawerOpen(false);
    setProductToEdit(null);
  };

  function handleFormSuccess() {
    form.resetFields();
    handleCloseDrawer();
  }

  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);

    setQueryParams((params) => ({
      ...params,
      page,
    }));
  };
  const errorMessage = useMemo(() => {
    if (error instanceof AxiosError)
      return error.response?.data.message ?? error.code === "ERR_NETWORK"
        ? "Having trouble reaching the internet. Please try again later"
        : error.message;

    return "";
  }, [error]);

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

    const productPayload = generateFormData<TProductPayload>(data);

    if (isEditMode) editProductMutate(productPayload);
    else newProductMutate(productPayload);
  }

  return (
    <>
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

        <ProductFilters setQueryParams={setQueryParams}>
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
                  <Button
                    type="link"
                    onClick={() => handleEditProduct(product)}
                  >
                    <MdEdit size={18} />
                  </Button>
                );
              },
              width: 200,
            },
          ]}
          data={data}
          onPageChange={handlePageChange}
          rowKey="_id"
        />
      </Flex>
      <AddProductDrawer
        form={form}
        isSubmitting={isPending || isEditing}
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
    </>
  );
}

export default Products;
