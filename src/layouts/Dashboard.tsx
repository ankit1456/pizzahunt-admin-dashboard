import { HeartFilled } from "@ant-design/icons";
import { Layout } from "antd";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store";
import { Header, Sider } from "../ui";

const Dashboard = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  if (!user)
    return (
      <Navigate to={`/auth/signin?redirect=${location.pathname}`} replace />
    );

  return (
    <Layout style={{ height: "100dvh", overflow: "hidden" }}>
      <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} />
        <Layout.Content
          style={{
            padding: "1rem",
            paddingBottom: 0,
          }}
        >
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center", paddingBlock: "15px" }}>
          Pizzahunt ©{new Date().getFullYear()} Made with <HeartFilled />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
