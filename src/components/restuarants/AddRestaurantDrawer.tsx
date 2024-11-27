import { Button, Drawer, FormInstance, Space, theme } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  form: FormInstance;
  isDrawerOpen: boolean;
  isEditMode: boolean;
  onCloseDrawer: () => void;
};

function AddRestaurantDrawer({
  form,
  isDrawerOpen,
  isEditMode,
  onCloseDrawer,
  children,
}: Readonly<PropsWithChildren<Props>>) {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Drawer
      title={isEditMode ? "Edit Restaurant" : "Add Restaurant"}
      width={600}
      styles={{
        body: { background: colorBgLayout },
      }}
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

export default AddRestaurantDrawer;
