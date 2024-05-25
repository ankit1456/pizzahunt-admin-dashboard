import { Button, Drawer, Space } from "antd";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isAddUserDrawerOpen: boolean;
  setIsAddUserDrawerOpen: Dispatch<SetStateAction<boolean>>;
};
function AddUser({
  isAddUserDrawerOpen,
  setIsAddUserDrawerOpen,
}: Readonly<Props>) {
  return (
    <Drawer
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
        expedita? Magnam, dolore cum? Provident, tenetur? Porro quidem sint
        aliquam nihil.
      </p>
    </Drawer>
  );
}

export default AddUser;
