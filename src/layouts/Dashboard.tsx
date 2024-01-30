import { Avatar, Badge, Dropdown, Flex, Layout, Menu } from "antd";
import { FaBell } from "react-icons/fa";
import { FaGift, FaUserGroup } from "react-icons/fa6";
import { IoIosRestaurant } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../store";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import { logout } from "../http/api";
import Pill from "../components/utils/pill/Pill";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <MdDashboard />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "/users",
    icon: <FaUserGroup />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: "/restaurants",
    icon: <IoIosRestaurant />,
    label: <NavLink to="/restaurants">Restaurants</NavLink>,
  },
  {
    key: "/products",
    icon: <IoFastFood />,
    label: <NavLink to="/products">Products</NavLink>,
  },
  {
    key: "/promos",
    icon: <FaGift />,
    label: <NavLink to="/promos">Promos</NavLink>,
  },
];

const Dashboard = () => {
  const { user, logoutFromStore } = useAuthState();
  const [collapsed, setCollapsed] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();
    },
  });

  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            padding: "20px 25px",
          }}
        >
          <Logo />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
            paddingLeft: collapsed ? 50 : 16,
          }}
        >
          <Flex gap="middle" align="center" justify="space-between">
            <Pill type="primary" fontSize={11.5}>
              {user.tenant
                ? `${user.tenant.name}, ${user.tenant.address}`
                : "You are an admin"}
            </Pill>

            <Flex gap={20} align="center">
              <Badge dot>
                <FaBell size={16} style={{ marginBottom: -5 }} />
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      label: "Logout",
                      onClick: () => mutate(),
                    },
                    {
                      key: "profile",
                      label: "Profile",
                    },
                  ],
                }}
                placement="bottomRight"
              >
                <Avatar size={30}>{user.firstName[0]}</Avatar>
              </Dropdown>
            </Flex>
          </Flex>
        </Header>
        <Content style={{ padding: "15px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Pizzahunt ©{new Date().getFullYear()} Made with ❤
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
