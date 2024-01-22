import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login page", () => {
  it("should render with required fields", () => {
    render(<Login />);
    //getBy -> throws an error
    //findBy -> Async
    //queryBy -> null

    expect(screen.getAllByText("Sign in")[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();

    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });
});
