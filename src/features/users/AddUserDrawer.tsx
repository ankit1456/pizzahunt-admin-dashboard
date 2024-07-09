import { Button, Drawer, Form, FormInstance, Space, theme } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  isAddUserDrawerOpen: boolean;
  closeAddUserDrawer: () => void;
  form: FormInstance;
};
function AddUserDrawer({
  isAddUserDrawerOpen,
  closeAddUserDrawer,
  form,
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
      title="Add User"
      destroyOnClose
      open={isAddUserDrawerOpen}
      onClose={closeAddUserDrawer}
      extra={
        <Space>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              onClick={() => {
                form.resetFields();
                closeAddUserDrawer();
              }}
            >
              Cancel
            </Button>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </Form.Item>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}

export default AddUserDrawer;
