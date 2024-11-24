import { ConfigProvider, Layout, Space } from "antd";
import LoginForm from "../../features/authentication/loginForm/LoginForm";
import { Logo } from "../../ui";
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
