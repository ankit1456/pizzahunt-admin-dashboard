import { Space, Tag } from "antd";
import { CSSProperties, PropsWithChildren } from "react";
import "./pill.css";

const Pill = ({
  children,
  type,
  fontSize = 11.5,
  style,
}: PropsWithChildren<{
  type: "primary" | "success" | "secondary" | "error" | "draft";
  fontSize?: number;
  style?: CSSProperties;
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
