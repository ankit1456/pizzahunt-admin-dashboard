import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import "./login.css";

const Login = () => {
  return (
    <Layout className="login__container">
      <Space direction="vertical" align="center" size="large">
        <Layout.Content>
          <Logo />
        </Layout.Content>
        <Card
          bordered={false}
          style={{ width: 300 }}
          title={
            <Space className="login__title">
              <LockFilled />
              Sign in
            </Space>
          }
        >
          <Form
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide your username",
                },
                {
                  type: "email",
                  message: "Email is not valid",
                },
              ]}
              name="username"
            >
              <Input
                prefix={<UserOutlined className="login__input-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please provide your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="login__input-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Flex justify="space-between" align="baseline">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login__forgot-link" href="#">
                Forgot password?
              </a>
            </Flex>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="width-full">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  );
};

export default Login;
