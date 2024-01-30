import { Typography } from "antd";
import { useAuthState } from "../store";
import { getGreetings } from "../utils/getGreetings";

const { Title } = Typography;

function Home() {
  const { user } = useAuthState();
  return (
    <div>
      <Title level={4}>
        {getGreetings()}, {user?.firstName}{" "}
        <img src="/smiley.png" alt="smiley" className="greeting" />
      </Title>
    </div>
  );
}

export default Home;
