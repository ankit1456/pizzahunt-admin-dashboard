import { Flex, List } from "antd";
import { Pill } from "../../../ui";
import "./recentOrders.css";

const order = {
  customerName: "Sophia Garcia",
  customerAddress: "987 Cedar St, Hilltown, WXY",
  price: 65.25,
  status: "preparing",
};

function RecentOrders() {
  return (
    <List.Item className="recent-order">
      <Flex className="width-full" align="baseline" justify="space-between">
        <div>
          <div className="customer-name">{order.customerName}</div>
          <span className="customer-address">{order.customerAddress}</span>
        </div>
        <div>
          <span style={{ marginRight: "1rem" }}>
            <strong>{order.price}</strong>
          </span>
          <Pill fontSize={11.5} type="primary">
            {order.status}
          </Pill>
        </div>
      </Flex>
    </List.Item>
  );
}

export default RecentOrders;
