import Footer from "@components/layout/Footer";
import Header from "@components/layout/header/Header";
import SideBar from "@components/layout/sideBar/SideBar";
import { useLocalStorage } from "@hooks/common";
import { useAuth } from "@src/state/store";
import { Layout } from "antd";
import { useMemo } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useLocalStorage(false, "sidebar-collapsed");
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
    <Layout style={{ height: "100dvh" }}>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} />
        <Layout.Content style={{ padding: "1rem" }}>
          <Outlet />
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
