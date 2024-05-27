import { Breadcrumb, Button, Flex, Table } from "antd";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RestaurantFilters from "../../features/restaurants/restaurantFilters/restaurantFilters";
import useRestaurants from "../../hooks/useRestaurants";
import { Loader } from "../../ui";
import { formatDate } from "../../utils";
import { TTenant } from "../../types/tenant.types";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddRestaurant from "../../features/restaurants/AddRestaurantDrawer";

const columns = [
  {
    title: "Sr no",
    dataIndex: "serialNumber",
    render: (_: unknown, __: unknown, index: number) =>
      String(index + 1).padStart(2, "0"),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string, restaurant: TTenant) => (
      <Link to={`/restaurants/${restaurant.id}`}>{name}</Link>
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
    render: (createdAt: string) => formatDate(new Date(createdAt)),
  },
];

function Restaurants() {
  const { restaurants, isLoading, isError, error } = useRestaurants();
  const [isAddRestaurantDrawerOpen, setIsAddRestaurantDrawerOpen] =
    useState(false);

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
              <Link className="link" to="/restaurants">
                Restaurants
              </Link>
            ),
          },
        ]}
      />
      {isLoading && <Loader />}
      {isError && <div>{error?.message}</div>}

      <RestaurantFilters>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddRestaurantDrawerOpen((open) => !open)}
        >
          Add Restaurant
        </Button>
      </RestaurantFilters>
      <Table
        rowKey="id"
        dataSource={restaurants}
        columns={columns}
        scroll={{ x: 700 }}
      />

      <AddRestaurant
        isAddRestaurantDrawerOpen={isAddRestaurantDrawerOpen}
        setIsAddRestaurantDrawerOpen={setIsAddRestaurantDrawerOpen}
      />
    </Flex>
  );
}

export default Restaurants;
