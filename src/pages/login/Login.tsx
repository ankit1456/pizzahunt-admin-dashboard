import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
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
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLogout, useSelf } from "../../hooks";
import { login } from "../../http/api";
import { useAuth } from "../../store";
import { Roles, TAuthResponse, TCredentials } from "../../types/user.types";
import { ErrorAlert, Logo } from "../../ui";
import { isAuthorized } from "../../utils";
import "./login.css";

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

  const handleFormValidation = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      form.validateFields([e.target.id]);
    },
    [form]
  );

  const handleLoginSuccess = async ({
    data: { user: loggedInUser },
  }: {
    data: TAuthResponse;
  }) => {
    if (!isAuthorized(loggedInUser.role)) {
      setNonAdminError("Your account is not authorized for this access");
      return logoutMutate();
    }

    if (loggedInUser.role === Roles.MANAGER) {
      const { data } = await refetchSelf();
      if (data) return setUser(data.user);
    }

    setUser(loggedInUser);
  };

  const {
    mutate: loginMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: handleLoginSuccess,
  });

  const errorMessage: string = useMemo(() => {
    if (error instanceof AxiosError) {
      return (
        error.response?.data.message ??
        (error.code === "ERR_NETWORK"
          ? "Looks like we're having trouble reaching the network. Please check your internet connection and try again."
          : "")
      );
    }
    return "";
  }, [error]);

  const handleFormSubmit = (values: TCredentials & { remember: boolean }) => {
    loginMutate({
      email: values.email,
      password: values.password,
    });
  };

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
              onFinish={handleFormSubmit}
            >
              <ErrorAlert message={errorMessage || nonAdminError} />
              <Form.Item
                rules={[
                  { type: "email", required: true, validateTrigger: "onBlur" },
                ]}
                name="email"
              >
                <Input
                  autoFocus={true}
                  onBlur={handleFormValidation}
                  prefix={<UserOutlined className="login__input-icon" />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password
                  onBlur={handleFormValidation}
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
