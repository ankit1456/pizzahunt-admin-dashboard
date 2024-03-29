import { Space, Tag } from "antd";
import { PropsWithChildren } from "react";
import "./pill.css";

const Pill = ({
  children,
  type,
  fontSize = 11.5,
  style,
}: PropsWithChildren<{
  type: "primary" | "success" | "onway" | "error" | "draft";
  fontSize?: number;
  style?: object;
}>) => {
  return (
    <Space wrap>
      <Tag
        bordered={false}
        className={`pill ${type}-pill`}
        style={{
          ...style,
          fontSize,
        }}
      >
        {children}
      </Tag>
    </Space>
  );
};

export default Pill;
