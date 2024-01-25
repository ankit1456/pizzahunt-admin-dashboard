import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../store";
import { Layout, Menu, theme } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaUserGroup, FaGift } from "react-icons/fa6";
import { IoIosRestaurant } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";

import { useState } from "react";
import Logo from "../components/icons/Logo";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "/",
    icon: (
      <div>
        <MdDashboard size={20} />
      </div>
    ),
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "/users",
    icon: (
      <div>
        <FaUserGroup size={17} />
      </div>
    ),
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: "/restaurants",
    icon: (
      <div>
        <IoIosRestaurant size={21} />
      </div>
    ),
    label: <NavLink to="/restaurants">Restaurants</NavLink>,
  },
  {
    key: "/products",
    icon: (
      <div>
        <IoFastFood size={20} />
      </div>
    ),
    label: <NavLink to="/products">Products</NavLink>,
  },
  {
    key: "/promos",
    icon: (
      <div>
        <FaGift size={17} />
      </div>
    ),
    label: <NavLink to="/promos">Promos</NavLink>,
  },
];

const Dashboard = () => {
  const { user } = useAuthState();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
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
