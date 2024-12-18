import { BellFilled } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Flex, Layout } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import "./header.css";
import { useLogout } from "@hooks/auth";
import { Roles } from "@lib/types/user.types";
import { useAuth } from "@src/state/store";
import { Pill } from "@components/common/ui";

type Props = {
  readonly collapsed: boolean;
};

function Header({ collapsed }: Props) {
  const { user } = useAuth();

  const { logoutMutate } = useLogout();

  const isAdmin = user?.role === Roles.ADMIN;
  const tenantName = user?.tenant?.name;
  const tenantAddress = user?.tenant?.address;

  const tenantInfo =
    tenantName && tenantAddress
      ? `${tenantName}, ${tenantAddress}`
      : "No outlet assigned to you yet";

  return (
    <Layout.Header
      className="header"
      style={{
        paddingLeft: collapsed ? 50 : 16,
      }}
    >
      <Flex gap="middle" align="center" justify="space-between">
        <Pill type="primary">
          <Flex gap={7}>
            <Badge status="success" />{" "}
            <span>{isAdmin ? "You are an admin" : tenantInfo}</span>
          </Flex>
        </Pill>

        <Flex gap={20} align="center" className="header__dropdown">
          <Badge dot={1 > 0}>
            <BellFilled className="notification-icon" />
          </Badge>
          <Dropdown
            menu={{
              items: [
                {
                  key: "username",
                  label: `${user?.firstName} ${user?.lastName}`,
                  style: { textTransform: "capitalize" },
                },
                {
                  key: "logout",
                  label: "logout",
                  onClick: () => logoutMutate(),
                },
              ],
            }}
            placement="bottom"
          >
            <Flex align="center" gap={7} className="header__avatar--container">
              <Avatar className="header__avatar" size={30}>
                {user?.firstName[0].toUpperCase()}
              </Avatar>

              <IoIosArrowDown size={16} />
            </Flex>
          </Dropdown>
        </Flex>
      </Flex>
    </Layout.Header>
  );
}

export default Header;
