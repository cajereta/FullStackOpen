import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("The form calls the event handler", () => {
  test("The event handler is called with the right details", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();
    const creator = "Felipe";
    render(<BlogForm createBlog={createBlog} user={creator} />);

    const inputs = screen.getAllByRole("textbox");
    const sendButton = screen.getByText("Save");

    await user.type(inputs[0], "Testing a form");
    await user.type(inputs[1], "Author is me");
    await user.type(inputs[2], "www.youtube.com");

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Testing a form");
    expect(createBlog.mock.calls[0][0].likes).toBe(0);
  });
});