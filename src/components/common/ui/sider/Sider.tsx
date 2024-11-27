import { Logo } from "@components/common/ui";
import { Roles } from "@lib/types/user.types";
import { useAuth } from "@src/state/store";
import { Layout, Menu } from "antd";
import { Dispatch, SetStateAction } from "react";
import { FaGift, FaUserGroup } from "react-icons/fa6";
import { IoIosRestaurant } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./sider.css";

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      key: "/",
      icon: <MdDashboard />,
      label: <NavLink to="/">Home</NavLink>,
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

  if (role === Roles.ADMIN) {
    const adminItems = [
      ...baseItems.slice(0, 1),
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
      ...baseItems.slice(1),
    ];

    return adminItems;
  }

  return baseItems;
};

type Props = Readonly<{
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}>;

function Sider({ collapsed, setCollapsed }: Props) {
  const { user } = useAuth();

  const sideItems = getMenuItems(user?.role as string);
  const location = useLocation();

  return (
    <Layout.Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="sider"
    >
      <div
        style={{
          padding: "20px 25px",
        }}
      >
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={sideItems}
      />
    </Layout.Sider>
  );
}

export default Sider;
