import { Button, Drawer, FormInstance, Space, theme } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  isDrawerOpen: boolean;
  form: FormInstance;
  onCloseDrawer: () => void;
};

function AddRestaurantDrawer({
  form,
  isDrawerOpen,
  onCloseDrawer,
  children,
}: Readonly<PropsWithChildren<Props>>) {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Drawer
      title="Add Restaurant"
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
