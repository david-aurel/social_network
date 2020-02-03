import React from "react";
import BioEditor from "./bioEditor";
import { render, fireEvent } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");
const cb = jest.fn();

test('When no bio is passed to it, an "Add" button is rendered.', () => {
    const { container } = render(<BioEditor />);
    expect(container.innerHTML).toContain("<button>add bio</button>");
    // console.log(container.innerHTML);
});

test('When a bio is passed to it, an "Edit" button is rendered.', () => {
    const { container } = render(<BioEditor bio="bio test" />);
    expect(container.innerHTML).toContain("<button>edit bio</button>");
    // console.log(container.innerHTML);
});

test('Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.', () => {
    const { container } = render(<BioEditor />);
    fireEvent.click(container.querySelector("button"));
    expect(container.innerHTML).toContain("<textarea></textarea>");
    expect(container.innerHTML).toContain("<button>submit</button>");

    const { container: container2 } = render(<BioEditor bio="bio test" />);
    fireEvent.click(container2.querySelector("button"));
    expect(container.innerHTML).toContain("<textarea></textarea>");
    expect(container.innerHTML).toContain("<button>submit</button>");
});

test('Clicking the "Save" button causes an ajax request.', async () => {
    const { container } = render(<BioEditor bio="bio test" setBio={cb} />);
    fireEvent.click(container.querySelector("button"));
    fireEvent.click(container.querySelector("button"));
    expect(axios.post.mock.calls.length).toBe(1);
});

test("When the mock request is successful, the function that was passed as a prop to the component gets called.", async () => {
    const { container } = render(<BioEditor bio="bio test" setBio={cb} />);
    fireEvent.click(container.querySelector("button"));
    fireEvent.click(container.querySelector("button"));
    expect(cb.mock.calls.length).toBe(1);
});
