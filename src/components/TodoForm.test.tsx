import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
	it("should render an input with a submit button", () => {
		render(<TodoForm onSubmit={vi.fn()} />);

		expect(screen.getByRole("textbox")).toBeVisible();
		expect(screen.getByRole("button")).toHaveTextContent("Save");
	});

	it("should submit the text that was entered in the input", () => {
		const handleSubmit = vi.fn();
		render(<TodoForm onSubmit={handleSubmit} />);

		fireEvent.input(screen.getByRole("textbox"), { target: { value: "Eat" } });
		fireEvent.click(screen.getByRole("button"));

		expect(handleSubmit).toBeCalledWith("Eat");
	});

	it("should clear the input field after submission", () => {
		const handleSubmit = vi.fn();
		render(<TodoForm onSubmit={handleSubmit} />);

		fireEvent.input(screen.getByRole("textbox"), { target: { value: "Eat" } });
		fireEvent.click(screen.getByRole("button"));

		// Cast the element to HTMLInputElement
		const inputElement = screen.getByRole("textbox") as HTMLInputElement;
		expect(inputElement.value).toBe(""); // Check that the input field is cleared
	});

	it("should not submit when input is empty", () => {
		const handleSubmit = vi.fn();
		render(<TodoForm onSubmit={handleSubmit} />);

		fireEvent.click(screen.getByRole("button")); // Click button without entering text

		expect(handleSubmit).not.toBeCalled(); // Ensure onSubmit is not called
	});
});
