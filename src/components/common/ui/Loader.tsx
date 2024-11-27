import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

type Props = {
  fullscreen?: boolean;
  size?: number;
};

const Spinner = ({ size = 24 }: { size?: number }) => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
);

const Loader = ({ fullscreen = false, size }: Props) => {
  if (!fullscreen) return <Spinner size={size} />;

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100dvh",
      }}
    >
      <Spinner size={size} />
    </Flex>
  );
};

export default Loader;
