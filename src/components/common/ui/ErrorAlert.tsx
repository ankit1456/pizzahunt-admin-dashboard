import { Alert } from "antd";

function ErrorAlert({ message }: Readonly<{ message: string }>) {
  if (!message) return null;
  return <Alert className="form__alert" type="error" message={message} />;
}

export default ErrorAlert;
