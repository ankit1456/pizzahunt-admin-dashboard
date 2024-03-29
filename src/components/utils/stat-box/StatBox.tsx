import { Card, Flex, Typography } from "antd";
import { PropsWithChildren } from "react";
import "./statBox.css";

type Props = Readonly<{
  title: string;
  value: string | number;
}>;

function StatBox({ title, value, children }: PropsWithChildren<Props>) {
  return (
    <Card className="statbox">
      <Flex align="start" gap={10}>
        {children}
        <div>
          <Typography.Title style={{ fontWeight: 500 }} level={5}>
            {title}
          </Typography.Title>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
            }}
          >
            {value}
          </div>
        </div>
      </Flex>
    </Card>
  );
}

export default StatBox;
