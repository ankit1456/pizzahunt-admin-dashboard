import { HeartFilled } from "@ant-design/icons";
import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store";

import { useState } from "react";
import Header from "../components/header/Header";
import Sider from "../components/sider/Sider";

const Dashboard = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return <Navigate to="/auth/signin" replace />;

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} />
        <Layout.Content style={{ padding: "15px" }}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          Pizzahunt ©{new Date().getFullYear()} Made with <HeartFilled />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
