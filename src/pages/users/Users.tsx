import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Flex, Form, message, Typography } from "antd";
import { useMemo, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddUserDrawer from "../../features/users/AddUserDrawer";
import AddUserForm from "../../features/users/AddUserForm";
import UsersFilter from "../../features/users/UserFilters";
import { useUsers } from "../../hooks";
import { createUser } from "../../http/api";
import { LIMIT_PER_PAGE } from "../../types";
import { Roles, TUser, TUserPayload } from "../../types/user.types";
import { Loader } from "../../ui";
import Table from "../../ui/Table";
import { formatDate } from "../../utils";

function Users() {
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false);
  const [form] = Form.useForm<TUserPayload>();

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: LIMIT_PER_PAGE,
  });
  const { data, isFetching, isError, error } = useUsers(queryParams);

  const columns = useMemo(
    () => [
      {
        title: "Sr no",
        dataIndex: "serialNumber",
        render: (_: unknown, __: unknown, index: number) => {
          if (data?.page && data.limit) {
            return String(index + 1 + (data.page - 1) * data.limit).padStart(
              2,
              "0"
            );
          }
        },
      },
      {
        title: "Name",
        dataIndex: "firstName",
        key: "name",
        render: (firstName: string, user: TUser) => (
          <Link to={`/users/${user.id}`}>
            {firstName} {user.lastName}
          </Link>
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
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt ",
        render: (createdAt: string) => formatDate(createdAt),
      },
    ],
    [data?.limit, data?.page]
  );

  const closeAddUserDrawer = () => setIsAddUserDrawerOpen(false);

  const { mutate: newUserMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: createUser,
    onSuccess: () => {
      form.resetFields();
      closeAddUserDrawer();
      queryClient.invalidateQueries({ queryKey: ["users"] });

      messageApi.open({
        type: "success",
        content: "User created successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });

  const handleSubmit = (formValues: TUserPayload) => {
    newUserMutate(formValues);
  };

  const handlePageChange = (page: number) => {
    setQueryParams((queryParams) => ({
      ...queryParams,
      page,
    }));
  };

  return (
    <Flex className="users" vertical gap={12}>
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

      <UsersFilter
        onFilterChange={(filterName, filterValue) => {
          console.log(filterName, filterValue);
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddUserDrawerOpen(true)}
        >
          Add User
        </Button>
      </UsersFilter>

      <Table<TUser>
        columns={columns}
        data={data}
        onPageChange={handlePageChange}
        rowKey="id"
      />

      <AddUserDrawer
        isAddUserDrawerOpen={isAddUserDrawerOpen}
        closeAddUserDrawer={closeAddUserDrawer}
        form={form}
      >
        <Form<TUserPayload>
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={{ role: Roles.MANAGER }}
        >
          <AddUserForm form={form} />
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </AddUserDrawer>
    </Flex>
  );
}

export default Users;
