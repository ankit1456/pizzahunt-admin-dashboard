import { Button, Drawer, FormInstance, Space, theme } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  form: FormInstance;
  isDrawerOpen: boolean;
  isEditMode: boolean;
  onCloseDrawer: () => void;
};
function AddUserDrawer({
  form,
  isDrawerOpen,
  isEditMode,
  onCloseDrawer,
  children,
}: PropsWithChildren<Props>) {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Drawer
      styles={{
        body: { background: colorBgLayout },
      }}
      size="large"
      title={isEditMode ? "Edit User" : "Add User"}
      destroyOnClose
      open={isDrawerOpen}
      onClose={onCloseDrawer}
      extra={
        <Space>
          <Button
            onClick={() => {
              form.resetFields();
              onCloseDrawer();
            }}
          >
            Cancel
          </Button>

          <Button onClick={() => form.submit()} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}

export default AddUserDrawer;
