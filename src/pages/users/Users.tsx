import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Flex, Form, message, Table } from "antd";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddUserDrawer from "../../features/users/AddUserDrawer";
import AddUserForm from "../../features/users/AddUserForm";
import UsersFilter from "../../features/users/UserFilters";
import { useUsers } from "../../hooks";
import { createUser } from "../../http/api";
import { Roles, TUser, TUserPayload } from "../../types/user.types";
import { Loader } from "../../ui";
import { formatDate } from "../../utils";

const columns = [
  {
    title: "Sr no",
    dataIndex: "serialNumber",
    render: (_: unknown, __: unknown, index: number) =>
      String(index + 1).padStart(2, "0"),
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
    render: (createdAt: string) => formatDate(new Date(createdAt)),
  },
];

function Users() {
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const { users, isLoading, isError, error } = useUsers();
  const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false);
  const [form] = Form.useForm<TUserPayload>();

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

  return (
    <Flex className="users" vertical gap={10}>
      {contextHolder}
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
      {isLoading && <Loader />}
      {isError && <div>{error?.message}</div>}

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

      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        scroll={{ x: 700 }}
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
