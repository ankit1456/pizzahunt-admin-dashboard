import { LoginForm } from "@components/auth";
import { Logo } from "@components/common/ui";
import { ConfigProvider, Layout, Space } from "antd";
import "./login.css";

function LoginPage() {
  return (
    <ConfigProvider theme={{ token: { fontSize: 13 } }}>
      <Layout className="login__container">
        <Space direction="vertical" align="center" size="large">
          <Layout.Content>
            <Logo />
          </Layout.Content>
          <LoginForm />
        </Space>
      </Layout>
    </ConfigProvider>
  );
}

export default LoginPage;
