import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";

test("Renders the Navbar", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
});