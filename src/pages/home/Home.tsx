import { Col, List, Row, Typography } from "antd";
import { useAuth } from "../../store";
import { getGreetings } from "../../utils";
import "./home.css";
import { GiPaperBagFolded } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { StatBox } from "../../components";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Los Angeles battles huge ldfires.",
  "Los Angeles battles  wildfires.",
  "Los Angeles wef  huge wildfires.",
];

function Home() {
  const { user } = useAuth();
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
                <GiPaperBagFolded
                  size={30}
                  style={{
                    backgroundColor: "var(--color-bg-green)",
                    color: "var(--color-green)",
                    borderRadius: "10px",
                    padding: "2px",
                    paddingBottom: "4.4px",
                  }}
                />
              </StatBox>
            </Col>
            <Col xs={24} sm={12}>
              <StatBox title="Total sale" value={80}>
                <IoStatsChart
                  size={32}
                  style={{
                    backgroundColor: "var(--color-bg-blue)",
                    color: "var(--color-blue)",
                    borderRadius: "10px",
                    padding: "6px",
                    paddingBottom: "4px",
                  }}
                />
              </StatBox>
            </Col>

            <Col xs={24}>{/* <StatBox /> */}</Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <List
            style={{
              height: 400,
              overflow: "auto",
            }}
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
