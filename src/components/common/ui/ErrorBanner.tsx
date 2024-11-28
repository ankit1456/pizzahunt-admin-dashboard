import { Alert } from "antd";

type Props = {
  isError: boolean;
  errorMessage: string;
};

function ErrorBanner({ isError, errorMessage }: Props) {
  if (!isError) return null;

  return (
    <Alert
      type="error"
      message={errorMessage}
      className="font-12"
      closable
      banner
    />
  );
}

export default ErrorBanner;
