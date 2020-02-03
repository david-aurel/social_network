import React from "react";
import BioEditor from "../src/bioEditor.js";
import { render } from "@testing-library/react";

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
