const Login = () => {
  return (
    <div>
      <h1>Log in</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Log in</button>
      <label htmlFor="remember-me">Remember me </label>
      <input id="remember-me" type="checkbox" />

      <a href="#">Forgot password ?</a>
    </div>
  );
};

export default Login;
