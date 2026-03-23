import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

describe("Blog", () => {
  test("does not render url or likes by default", () => {
    const blog = {
      title: "title test",
      author: "pewdiepie",
      url: "youtube.com",
      likes: 123,
      user: "1238789sdjkhf78123897",
    };

    render(<Blog blog={blog} />);

    const element = screen.queryByText(`${blog.title} ${blog.author}`);
    const element2 = screen.queryByText(`${blog.url}`);
    const element3 = screen.queryByText(`${blog.likes}`);

    expect(element).toBeDefined();
    expect(element2).toBeNull();
    expect(element3).toBeNull();
  });
});
