import {  render, screen } from "@testing-library/react";
import NewGameButton from ".";

test("Check that New Game button renders correctly", () => {
    const mockFunction = () => {
        return
    }
    render(<NewGameButton updateFunction={mockFunction}/>)
    const button = screen.getByRole("button")

    expect(button).toBeInTheDocument()
})