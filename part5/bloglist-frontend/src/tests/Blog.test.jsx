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
    render(<Blog blog={blog} />);

    const user = userEvent.setup();

    const button = screen.queryByText("view");
    await user.click(button);

    const element = screen.queryByText(`${blog.title} ${blog.author}`);
    const element2 = screen.queryByText(`${blog.url}`);
    const element3 = screen.queryByText(`${blog.likes}`);

    expect(element).toBeDefined();
    expect(element2).toBeDefined();
    expect(element3).toBeDefined();
  });
});
