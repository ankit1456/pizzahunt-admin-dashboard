import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins,sans-serif",
          colorText: "#363636",
          colorPrimary: "#F65F42",
          colorLink: "#F65F42",
          colorFillSecondary: "#FFF5F0",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
