import { HeartFilled } from "@ant-design/icons";
import { Layout } from "antd";

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      Pizzahunt ©{new Date().getFullYear()} Made with{" "}
      <HeartFilled style={{ color: "red" }} />
    </Layout.Footer>
  );
}

export default Footer;
