import { Button, Drawer, Space } from "antd";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isAddRestaurantDrawerOpen: boolean;
  setIsAddRestaurantDrawerOpen: Dispatch<SetStateAction<boolean>>;
};
function AddRestaurantDrawer({
  isAddRestaurantDrawerOpen,
  setIsAddRestaurantDrawerOpen,
}: Readonly<Props>) {
  return (
    <Drawer
      title="Add Restaurant"
      width={720}
      destroyOnClose
      open={isAddRestaurantDrawerOpen}
      onClose={() => setIsAddRestaurantDrawerOpen((open) => !open)}
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

export default AddRestaurantDrawer;
