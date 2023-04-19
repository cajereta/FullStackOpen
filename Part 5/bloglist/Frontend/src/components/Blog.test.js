import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogItem from "./BlogItem";

describe("Content is rendered", () => {
  test("Renders content", () => {
    const title = "Component testing is done with react-testing-library";
    const author = "Me";
    const url = "www.youtube.com";
    const likes = 0;
    render(<BlogItem title={title} author={author} url={url} likes={likes} />);

    const element = screen.getByText(`Title: ${title} by ${author}`);
    expect(element).toBeDefined();
  });
});

describe("Clicking the button show details", () => {
  test("Clicking the button calls event handler once", async () => {
    const title = "Component testing is done with react-testing-library";
    const author = "Me";
    const url = "www.youtube.com";
    const likes = 0;


    const { container } = render(<BlogItem title={title} author={author} url={url} likes={likes} />);
    const user = userEvent.setup();
    const button = screen.getByText("Show details");
    await user.click(button);

    const element = container.querySelector(".children");
    expect(element).toHaveTextContent("Likes: 0");
    expect(element).toBeDefined();
    expect(element).toHaveTextContent("Url: www.youtube.com");
  });
});

describe("Clicking like button twice adds two likes ", () => {
  test("Like button is pressed twice and the app functions as expected", async () => {
    const title = "Component testing is done with react-testing-library";
    const author = "Me";
    const url = "www.youtube.com";
    const likes = 0;
    const mockHandler = jest.fn();

    render(<BlogItem title={title} author={author} url={url} likes={likes} updateLikes={mockHandler} />);

    const user = userEvent.setup();
    //Getting the button to show up
    const showDetailsButton = screen.getByText("Show details");
    await user.click(showDetailsButton);

    //Clicking the real button
    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);

  });

});