import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Layout,
  Space,
} from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../components";
import { useLogout, useSelf } from "../../hooks";

import { login } from "../../http/api";
import { useAuth } from "../../store";
import { Roles, TCredentials, TUser } from "../../types";
import { isAuthorized } from "../../utils";
import "./login.css";

const handleLogin = async function (credentials: TCredentials) {
  const { data } = await login(credentials);

  return data;
};

const validateMessages = {
  required: "Please provide your ${label} ",
  types: {
    email: "Please provide an valid ${label}",
  },
};

function LoginPage() {
  const { setUser } = useAuth();
  const [nonAdminError, setNonAdminError] = useState("");

  const [form] = Form.useForm();

  const { logoutMutate } = useLogout();

  const { refetch: refetchSelf } = useSelf(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,
    onSuccess: async (user) => {
      if (user.role === Roles.MANAGER) {
        const { data } = await refetchSelf();
        setUser(data as TUser);
      }
      if (!isAuthorized(user.role)) {
        setNonAdminError("Admin privileges required");
        return logoutMutate();
      }
      setUser(user);
    },
  });

  let errors: string[] = [];

  if (error instanceof AxiosError) {
    errors = error.response?.data.errors.map(
      (err: { message: string }) => err.message
    );
  }
  if (error instanceof AxiosError && error.code === "ERR_NETWORK") {
    error.message =
      "Looks like we're having trouble reaching the network. Please check your internet connection and try again.";
  }
  return (
    <ConfigProvider theme={{ token: { fontSize: 13 } }}>
      <Layout className="login__container">
        <Space direction="vertical" align="center" size="large">
          <Layout.Content>
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{ minWidth: 330 }}
            title={
              <Space className="login__title">
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form
              form={form}
              validateMessages={validateMessages}
              initialValues={{
                remember: true,
              }}
              onFinish={(values: TCredentials & { remember: boolean }) => {
                mutate({
                  email: values.email,
                  password: values.password,
                });
              }}
            >
              {isError && (
                <Alert
                  className="form__alert"
                  type="error"
                  message={
                    errors?.map((err) => <div key={err}>{err}</div>) ??
                    error.message
                  }
                />
              )}
              {nonAdminError && (
                <Alert
                  className="form__alert"
                  type="error"
                  message={nonAdminError}
                />
              )}
              <Form.Item
                rules={[
                  { type: "email", required: true, validateTrigger: "onBlur" },
                ]}
                name="email"
              >
                <Input
                  autoFocus={true}
                  onBlur={() => {
                    form.validateFields(["email"]);
                  }}
                  prefix={<UserOutlined className="login__input-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password
                  onBlur={() => {
                    form.validateFields(["password"]);
                  }}
                  prefix={<LockOutlined className="login__input-icon" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Flex justify="space-between" align="baseline">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link className="font-12" to="/auth/forgot-password">
                  Forgot password?
                </Link>
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
    </ConfigProvider>
  );
}

export default LoginPage;
