import { useState } from "react";
import blogService from "../services/blogs";

const Create = ({ fetchBlogs }) => {
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

    await blogService.create(blog).catch(error => {
      console.log(error);
      return;
    });

    fetchBlogs();
  };

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
    </>
  );
};

export default Create;
