import { useState } from "react";
import Notification from "../components/Notification";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({ setUser, showMessage, message, css, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await loginService.login(username, password);

      window.localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      blogService.setToken(response.token);
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      const altMessage = "wrong username or password";
      showMessage(errorMessage || altMessage, "error");
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <Notification message={message} css={css} show={show} />
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username{" "}
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password{" "}
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
