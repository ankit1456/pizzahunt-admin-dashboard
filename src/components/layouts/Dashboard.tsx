import { HeartFilled } from "@ant-design/icons";
import { Layout } from "antd";
import { useState, useMemo } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "@src/state/store";
import { Header, Sider } from "@components/common/ui";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const redirectPath = useMemo(() => {
    if (user) return null;
    const redirect = location.pathname.split("/")[1];
    if (redirect) {
      searchParams.set("redirect", redirect);
      setSearchParams(searchParams);
    }
    return "/auth/signin?" + searchParams.toString();
  }, [user, location.pathname, searchParams, setSearchParams]);

  if (redirectPath) return <Navigate to={redirectPath} replace />;

  return (
    <Layout style={{ height: "100dvh", overflow: "hidden" }}>
      <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} />
        <Layout.Content style={{ padding: "1rem", paddingBottom: 0 }}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center", paddingBlock: "15px" }}>
          Pizzahunt ©{new Date().getFullYear()} Made with{" "}
          <HeartFilled style={{ color: "red" }} />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
