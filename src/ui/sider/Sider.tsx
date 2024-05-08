import { Layout, Menu } from "antd";
import { Dispatch, SetStateAction } from "react";
import { FaGift, FaUserGroup } from "react-icons/fa6";
import { IoIosRestaurant } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store";
import { Roles } from "../../types/user.types";
import Logo from "../Logo";
import "./sider.css";

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      key: "/",
      icon: <MdDashboard />,
      label: <NavLink to="/">Home</NavLink>,
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

  if (role === Roles.ADMIN) {
    const adminItems = [...baseItems];

    adminItems.splice(1, 0, {
      key: "/users",
      icon: <FaUserGroup />,
      label: <NavLink to="/users">Users</NavLink>,
    });

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
        <Logo />
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["/"]}
        mode="inline"
        items={sideItems}
      />
    </Layout.Sider>
  );
}

export default Sider;
