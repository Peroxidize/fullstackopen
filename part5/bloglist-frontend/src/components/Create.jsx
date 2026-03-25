import { useState } from "react";
import blogService from "../services/blogs";

const Create = ({ fetchBlogs, showMessage }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async event => {
    event.preventDefault();

    const blog = {
      title: title,
      author: author,
      url: url,
    };

    setTitle("");
    setAuthor("");
    setUrl("");

    try {
      await blogService.create(blog);
      showMessage(`a new blog ${title} by ${author} added`, "success");
      fetchBlogs();
    } catch (error) {
      console.log(error.response);
      const errorMessage = error.response?.data?.error;
      const altMessage = "failed to fetch blogs";
      showMessage(errorMessage || altMessage, "error");
    }
  };

  if (!showForm) {
    return (
      <button data-testid="showForm" onClick={() => setShowForm(!showForm)}>
        create new blog
      </button>
    );
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title:
            <input
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              value={author}
              onChange={event => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input value={url} onChange={event => setUrl(event.target.value)} />
          </label>
        </div>
        <button>create</button>
      </form>
      <button onClick={() => setShowForm(!showForm)}>cancel</button>
    </>
  );
};

export default Create;
