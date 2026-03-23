import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("Blog", () => {
  const blog = {
    title: "title test",
    author: "pewdiepie",
    url: "youtube.com",
    likes: 123,
    user: "1238789sdjkhf78123897",
  };

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
    const user = userEvent.setup();
    const mockHandler = vi.fn();

    render(
      <Blog blog={blog} fetchBlogs={mockHandler} showMessage={mockHandler} />
    );

    const viewButton = screen.queryByText("view");
    await user.click(viewButton);

    const likeButton = screen.queryByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
