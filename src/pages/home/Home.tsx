import { Card, Col, Flex, List, Row, Typography } from "antd";
import { useState } from "react";
import { GiPaperBagFolded } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RecentOrders } from "../../features/orders";
import { useAuth } from "../../store";
import { StatBox } from "../../ui";
import { getGreetings } from "../../utils";
import "./home.css";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Australian walks 100km after outback crash.",
  "Australian walks 100km after outback crash.",
  "Australian walks 100km after outback crash.",
  "Australian walks 100km after outback crash.",
  "Australian walks 100km after outback crash.",
];

function Home() {
  const { user } = useAuth();
  const [salesFilter, setSalesFilter] = useState("W");

  return (
    <div className="home">
      <Typography.Title className="greeting__text">
        {getGreetings()},{" "}
        <span style={{ textTransform: "capitalize", marginRight: "2px" }}>
          {user?.firstName}
        </span>
        <img src="/smiley.png" alt="smiley" className="greeting__emoji" />
      </Typography.Title>

      <Row
        gutter={[
          { xs: 10, sm: 12, md: 16, lg: 20 },
          { xs: 10, sm: 12, md: 16, lg: 20 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={12}>
          <Row
            gutter={[
              { xs: 10, sm: 12, md: 16, lg: 20 },
              { xs: 10, sm: 12, md: 16, lg: 20 },
            ]}
          >
            <Col xs={24} sm={12}>
              <StatBox title="Total orders" value={80}>
                <GiPaperBagFolded size={30} className="stat-order-icon" />
              </StatBox>
            </Col>
            <Col xs={24} sm={12}>
              <StatBox title="Total sale" value={80}>
                <IoStatsChart size={32} className="stat-sale-icon" />
              </StatBox>
            </Col>

            <Col xs={24}>
              <Card
                style={{
                  padding: "10px",
                }}
                className="sales-chart"
                size="small"
                title={
                  <Flex align="center" gap={10}>
                    <IoStatsChart size={32} className="stat-sale-icon" />
                    <span>Sales</span>
                  </Flex>
                }
                extra={
                  <Flex gap={10} align="center">
                    <Flex
                      className={`sales-chart-filter ${
                        salesFilter === "W" ? "sales-active-filter" : ""
                      }`}
                      onClick={() => setSalesFilter("W")}
                      align="center"
                      justify="center"
                    >
                      W
                    </Flex>
                    <Flex
                      className={`sales-chart-filter ${
                        salesFilter === "M" ? "sales-active-filter" : ""
                      }`}
                      onClick={() => setSalesFilter("M")}
                      align="center"
                      justify="center"
                    >
                      M
                    </Flex>
                    <Flex
                      className={`sales-chart-filter ${
                        salesFilter === "Y" ? "sales-active-filter" : ""
                      }`}
                      onClick={() => setSalesFilter("Y")}
                      align="center"
                      justify="center"
                    >
                      Y
                    </Flex>
                  </Flex>
                }
              >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <Card className="recent-orders">
            <List
              split={false}
              style={{
                border: "none",
              }}
              size="small"
              header={
                <Flex gap={10} align="center">
                  <GiPaperBagFolded size={30} className="stat-order-icon" />
                  <Typography.Text
                    style={{ fontWeight: 500, fontSize: "1rem" }}
                  >
                    Recent orders
                  </Typography.Text>
                </Flex>
              }
              footer={
                <Link className="recent-orders-footer" to="/orders">
                  See all orders
                </Link>
              }
              bordered
              dataSource={data}
              renderItem={(item) => <RecentOrders key={item} />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
