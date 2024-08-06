import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { AddUserDrawer, AddUserForm, UserFilters } from "../../features/users";
import { useUsers } from "../../hooks";
import useCreateUser from "../../hooks/useCreateUser";
import useEditUser from "../../hooks/useEditUser";
import { LIMIT_PER_PAGE, TFilterPayload, TQueryParams } from "../../types";
import { TTenant } from "../../types/tenant.types";
import { Roles, TUser, TUserPayload } from "../../types/user.types";
import { Loader, Table } from "../../ui";
import { debounce, formatDate } from "../../utils";

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
    width: 130,
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
    width: 140,
  },
];

function Users() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: 1,
    limit: LIMIT_PER_PAGE,
  });
  const [userToEdit, setUserToEdit] = useState<TUser | null>(null);

  const [form] = Form.useForm<TUserPayload>();
  const [userFilterForm] = Form.useForm();

  const { data, isFetching, isError, error } = useUsers(queryParams);
  const { createContextHolder, newUserMutate } =
    useCreateUser(handleFormSuccess);
  const { editContextHolder, editUserMutate } = useEditUser(
    userToEdit,
    handleFormSuccess
  );

  const isEditMode = !!userToEdit;

  useEffect(() => {
    if (userToEdit) {
      form.setFieldsValue({ ...userToEdit, tenantId: userToEdit.tenant?.id });
      setIsDrawerOpen(true);
    }
  }, [userToEdit, form]);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setUserToEdit(null);
  };

  const handlePageChange = (page: number) => {
    setQueryParams((params) => ({
      ...params,
      page,
    }));
  };

  const debouncedSearch = debounce((value: string | undefined) => {
    setQueryParams((params) => ({ ...params, q: value, page: 1 }));
  });

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
    }
  };

  function handleFormSuccess() {
    form.resetFields();
    handleCloseDrawer();
    setUserToEdit(null);
  }

  function handleSubmit(formValues: TUserPayload) {
    if (isEditMode) editUserMutate(formValues);
    else newUserMutate(formValues);
  }

  return (
    <Flex vertical gap={12}>
      {createContextHolder}
      {editContextHolder}

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
                <Link className="link" to="/users">
                  Users
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

      <Form
        form={userFilterForm}
        initialValues={{
          role: "",
        }}
        onFieldsChange={handleFilterChange}
      >
        <UserFilters>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Add User
          </Button>
        </UserFilters>
      </Form>

      <Table<TUser>
        columns={[
          ...columns,
          {
            title: "Actions",
            fixed: "right",
            render: (_: string, user: TUser) => {
              return (
                <Button type="link" onClick={() => setUserToEdit(user)}>
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

      <AddUserDrawer
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={handleCloseDrawer}
        form={form}
        isEditMode={isEditMode}
      >
        <Form<TUserPayload>
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={{ role: Roles.CUSTOMER }}
        >
          <AddUserForm form={form} isEditMode={isEditMode} />
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </AddUserDrawer>
    </Flex>
  );
}

export default Users;
