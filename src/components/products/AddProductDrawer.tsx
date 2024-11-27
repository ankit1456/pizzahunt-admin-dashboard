import { Button, Drawer, FormInstance, Space, theme } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  form: FormInstance;
  isDrawerOpen: boolean;
  isEditMode: boolean;
  onCloseDrawer: () => void;
  isLoading: boolean;
};
function AddProductDrawer({
  form,
  isDrawerOpen,
  isEditMode,
  onCloseDrawer,
  children,
  isLoading,
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
      title={isEditMode ? "Edit Product" : "Add Product"}
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

          <Button
            onClick={() => form.submit()}
            type="primary"
            loading={isLoading}
          >
            Submit
          </Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}

export default AddProductDrawer;
