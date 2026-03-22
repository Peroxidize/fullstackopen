import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Create from "./components/Create";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [css, setCss] = useState("");
  const [show, setShow] = useState("");

  useEffect(() => {
    fetchBlogs();

    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showMessage = (message, state) => {
    setMessage(message);
    setCss(state);
    setShow("show");
    setTimeout(() => setShow(""), 5000);
  };

  const onLogout = () => {
    window.localStorage.clear();
    setUser(null);
    blogService.setToken(null);
  };

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    } catch (error) {
      showMessage("unable to fetch blogs", "error");
    }
  };

  const loginProps = {
    setUser,
    showMessage,
    message,
    css,
    show,
  };

  const notificationProps = {
    message,
    css,
    show,
  };

  return (
    <>
      {!user && <Login {...loginProps} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification {...notificationProps} />
          <p>
            {user.name} logged in <button onClick={onLogout}>logout</button>
          </p>
          <Create fetchBlogs={fetchBlogs} showMessage={showMessage} />
          {blogs.map(blog => {
            const username = blog.user.username;

            if (username !== user.username) {
              return null;
            }

            return (
              <Blog
                key={blog.id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                showMessage={showMessage}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default App;
