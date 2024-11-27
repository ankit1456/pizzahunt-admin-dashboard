import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Loader, Table } from "@components/common/ui";
import { AddUserDrawer, AddUserForm, UserFilters } from "@components/users";
import { useCreateUser, useEditUser, useUsers } from "@hooks/users";
import { LIMIT_PER_PAGE, TQueryParams } from "@lib/types";
import { TTenant } from "@lib/types/tenant.types";
import { Roles, TUser, TUserPayload } from "@lib/types/user.types";
import { formatDate } from "@lib/utils";
import { Button, Flex, Form, message, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const columns: ColumnsType<TUser> = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "name",
    render: (firstName: string, user: TUser) => (
      <span style={{ color: "var(--primary-color)" }}>
        {firstName} {user.lastName}
      </span>
    ),
    width: 190,
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 100,
  },

  {
    title: "Restaurant",
    dataIndex: "tenant",
    key: "tenant",
    render: (tenant: TTenant) => {
      return tenant ? (
        <span>
          {tenant?.name}, {tenant?.address}
        </span>
      ) : null;
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

function UsersPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<TUser | null>(null);

  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: LIMIT_PER_PAGE,
    role: searchParams.get("role") ?? "",
  });

  const [form] = Form.useForm<TUserPayload>();

  const { data, isFetching, isError, error } = useUsers(queryParams);
  const { newUserMutate } = useCreateUser(handleFormSuccess, messageApi);
  const { editUserMutate } = useEditUser(
    userToEdit,
    handleFormSuccess,
    messageApi
  );

  const isEditMode = !!userToEdit;

  const handleEditUser = (user: TUser) => {
    setUserToEdit(user);
    form.setFieldsValue({ ...user, tenantId: user.tenant?.id });
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setUserToEdit(null);
  };

  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);

    setQueryParams((params) => ({
      ...params,
      page,
    }));
  };

  function handleFormSuccess() {
    form.resetFields();
    handleCloseDrawer();
  }

  function handleSubmit(formValues: TUserPayload) {
    if (isEditMode) editUserMutate(formValues);
    else newUserMutate(formValues);
  }

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
              label: "Users",
              to: "/users",
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

      <UserFilters setQueryParams={setQueryParams}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add User
        </Button>
      </UserFilters>

      <Table<TUser>
        columns={[
          ...columns,
          {
            title: "Actions",
            render: (_: string, user: TUser) => {
              return (
                <Button type="link" onClick={() => handleEditUser(user)}>
                  <MdEdit size={18} />
                </Button>
              );
            },
            width: 120,
          },
        ]}
        data={data}
        onPageChange={handlePageChange}
        rowKey="id"
      />

      <AddUserDrawer
        form={form}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={handleCloseDrawer}
        isEditMode={isEditMode}
      >
        <Form<TUserPayload>
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={{ role: Roles.CUSTOMER }}
        >
          <AddUserForm isEditMode={isEditMode} editUserId={userToEdit?.id} />
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </AddUserDrawer>
    </Flex>
  );
}

export default UsersPage;
