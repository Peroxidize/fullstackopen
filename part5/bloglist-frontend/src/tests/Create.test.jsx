import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Create from "../components/Create";
import blogService from "../services/blogs";

describe("Create", () => {
  test("event handler receives the correct details", async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    const mockHandler2 = vi.fn();
    const createMock = vi.spyOn(blogService, "create").mockResolvedValue({});

    const blog = {
      title: "In your eyes",
      author: "The Weeknd",
      url: "youtube.com",
    };

    render(<Create fetchBlogs={mockHandler} showMessage={mockHandler2} />);

    const showFormButton = screen.getByText("create new blog");
    await user.click(showFormButton);

    const titleField = screen.getByLabelText("title:");
    const authorField = screen.getByLabelText("author:");
    const urlField = screen.getByLabelText("url:");
    const createButton = screen.getByText("create");

    await user.type(titleField, blog.title);
    await user.type(authorField, blog.author);
    await user.type(urlField, blog.url);
    await user.click(createButton);

    expect(createMock).toHaveBeenCalledWith(blog);

    createMock.mockRestore();
  });
});
