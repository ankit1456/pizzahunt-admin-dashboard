import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
} from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import "./login.css";
import { useMutation } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { login, logout } from "../../http/api";
import { useAuthState } from "../../store";
import { isAuthorized } from "../../utils/isAuthorized";

const handleLogin = async function (credentials: Credentials) {
  const { data } = await login(credentials);

  return data;
};

const Login = () => {
  const { user, setUser, logoutFromStore } = useAuthState();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,
    onSuccess: async (user) => {
      if (!isAuthorized(user.role)) {
        return await logoutMutate();
      }
      setUser(user);
    },
  });

  if (error?.message === "Network Error") {
    error.message =
      "Looks like we're having trouble reaching the network. Please check your connection and try again.";
  }
  return (
    <Layout className="login__container">
      <Space direction="vertical" align="center" size="large">
        <Layout.Content>
          <Logo />
        </Layout.Content>
        <Card
          bordered={false}
          style={{ width: 330 }}
          title={
            <Space className="login__title">
              <LockFilled />
              Sign in {user?.firstName}
            </Space>
          }
        >
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => {
              mutate({
                email: values.email,
                password: values.password,
              });
            }}
          >
            {isError && (
              <Alert
                className="auth__alert"
                type="error"
                message={error.message}
              />
            )}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide your email",
                },
                {
                  type: "email",
                  message: "Email is not valid",
                },
              ]}
              name="email"
            >
              <Input
                prefix={<UserOutlined className="login__input-icon" />}
                placeholder="Email"
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
              <Button
                loading={isPending}
                type="primary"
                htmlType="submit"
                className="width-full"
              >
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
