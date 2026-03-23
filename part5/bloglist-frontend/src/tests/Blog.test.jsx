import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import blogService from "../services/blogs";

vi.mock("../services/blog");

const blog = {
  id: "1",
  title: "title test",
  author: "pewdiepie",
  url: "youtube.com",
  likes: 123,
  user: "1238789sdjkhf78123897",
};

describe("Blog", () => {
  test("does not render url or likes by default", () => {
    render(<Blog blog={blog} />);

    const element = screen.queryByText(`${blog.title} ${blog.author}`);
    const element2 = screen.queryByText(`${blog.url}`);
    const element3 = screen.queryByText(`${blog.likes}`);

    expect(element).toBeDefined();
    expect(element2).toBeNull();
    expect(element3).toBeNull();
  });

  test("url and likes are shown when button is clicked", async () => {
    render(<Blog blog={blog} />);

    const element = screen.queryByText(`${blog.title} ${blog.author}`);
    const element2 = screen.queryByText(`${blog.url}`);
    const element3 = screen.queryByText(`${blog.likes}`);

    expect(element).toBeDefined();
    expect(element2).toBeDefined();
    expect(element3).toBeDefined();
  });

  test("if like button is clicked twice the event handler is also called twice", async () => {
    const user = userEvent.setup();
    const fetchBlogs = vi.fn();
    const showMessage = vi.fn();
    const increaseLikesMock = vi
      .spyOn(blogService, "increaseLikes")
      .mockResolvedValue({});

    render(
      <Blog blog={blog} fetchBlogs={fetchBlogs} showMessage={showMessage} />
    );

    const viewButton = screen.queryByText("view");
    await user.click(viewButton);

    const likeButton = screen.queryByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    console.log(increaseLikesMock);
    expect(increaseLikesMock).toHaveBeenCalledTimes(2);
    expect(increaseLikesMock).toHaveBeenCalledWith(blog.id);

    increaseLikesMock.mockRestore();
  });
});
