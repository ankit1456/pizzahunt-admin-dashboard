import { Typography } from "antd";
import { useAuth } from "../../store";
import { getGreetings } from "../../utils";
import "./home.css";

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
    </div>
  );
}

export default Home;
