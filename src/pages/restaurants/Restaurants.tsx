import { Breadcrumb, Button, Flex, Typography } from "antd";
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
import { LIMIT_PER_PAGE } from "../../types";
import Table from "../../ui/Table";

function Restaurants() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: LIMIT_PER_PAGE,
  });
  const { data, isFetching, isError, error } = useRestaurants(queryParams);
  const [isAddRestaurantDrawerOpen, setIsAddRestaurantDrawerOpen] =
    useState(false);

  const columns = [
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
      render: (createdAt: string) => formatDate(createdAt),
    },
  ];

  const handlePageChange = (page: number) => {
    setQueryParams((queryParams) => ({
      ...queryParams,
      page,
    }));
  };

  return (
    <Flex className="users" vertical gap={12}>
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
                <Link className="link" to="/restaurants">
                  Restaurants
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

      <RestaurantFilters>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddRestaurantDrawerOpen((open) => !open)}
        >
          Add Restaurant
        </Button>
      </RestaurantFilters>

      <Table<TTenant>
        columns={columns}
        data={data}
        onPageChange={handlePageChange}
        rowKey="id"
      />

      <AddRestaurant
        isAddRestaurantDrawerOpen={isAddRestaurantDrawerOpen}
        setIsAddRestaurantDrawerOpen={setIsAddRestaurantDrawerOpen}
      />
    </Flex>
  );
}

export default Restaurants;
