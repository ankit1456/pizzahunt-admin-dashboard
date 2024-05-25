import { Breadcrumb, Flex, Table } from "antd";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UsersFilter from "../../features/users/UserFilters";
import { useUsers } from "../../hooks";
import { TUser } from "../../types/user.types";
import { Loader } from "../../ui";
import { formatDate } from "../../utils";
import "./users.css";

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
      <Link to={`/users/${firstName}`}>
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
  const { users, isLoading, isError, error } = useUsers();

  return (
    <Flex className="users" vertical gap={10}>
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
      />
      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        scroll={{ x: 700 }}
      />
    </Flex>
  );
}

export default Users;
