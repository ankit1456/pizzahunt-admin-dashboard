import { Button, Drawer, Space, theme } from "antd";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

type Props = {
  isAddUserDrawerOpen: boolean;
  setIsAddUserDrawerOpen: Dispatch<SetStateAction<boolean>>;
};
function AddUserDrawer({
  isAddUserDrawerOpen,
  setIsAddUserDrawerOpen,
  children,
}: PropsWithChildren<Props>) {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Drawer
      styles={{ body: { background: colorBgLayout } }}
      title="Add User"
      width={720}
      destroyOnClose
      open={isAddUserDrawerOpen}
      onClose={() => setIsAddUserDrawerOpen((open) => !open)}
      extra={
        <Space>
          <Button>Cancel</Button>
          <Button type="primary">Submit</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}

export default AddUserDrawer;
