import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
	it("should be possible to add a todo", () => {
		render(<App />);

		fireEvent.input(screen.getByRole("textbox"), {
			target: { value: "Sleep" },
		});

		fireEvent.click(screen.getByText("Save"));

		expect(screen.getByText("Sleep"));
	});

	it("should be possible to add multiple todos", () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Eat" },
		});
		fireEvent.click(screen.getByText("Save"));

		expect(screen.getByText("Sleep")).toBeInTheDocument;
		expect(screen.getByText("Eat")).toBeInTheDocument;
	});

	it("should be possible to remove a todo", () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Eat" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

		expect(screen.queryByText("Sleep")).toBeNull();
		expect(screen.getByText("Eat")).toBeInTheDocument();
	});
	it("should render edit input only when editing a todo", () => {
		render(<App />);

		expect(screen.queryByLabelText("edit-todo-input")).toBeNull();
	});

	it("should display edit input when a todo is being edited", async () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		expect(screen.getByLabelText("edit-todo-input")).toBeVisible();
	});

	it("should save the edited todo and remove the old todo", async () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Eat" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		const editInput = screen.getByLabelText("edit-todo-input");
		fireEvent.change(editInput, { target: { value: "Rest" } });
		fireEvent.click(screen.getByText("Save Edit"));

		await waitFor(() => {
			expect(screen.getByText("Rest")).toBeInTheDocument();
		});

		expect(screen.queryByText("Sleep")).toBeNull();
		expect(screen.getByText("Eat")).toBeInTheDocument();
	});

	it("should not save an empty todo when editing", async () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		const editInput = screen.getByLabelText("edit-todo-input");
		fireEvent.change(editInput, { target: { value: "" } });
		fireEvent.click(screen.getByText("Save Edit"));

		await waitFor(() => {
			expect(screen.queryByText("Sleep")).toBeInTheDocument();
		});

		const todos = screen.queryAllByRole("listitem");
		expect(todos.length).toBe(1);
	});

	it("should set and clear editIndex correctly", async () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		const editInput = screen.getByLabelText("edit-todo-input");
		fireEvent.change(editInput, { target: { value: "Rest" } });
		fireEvent.click(screen.getByText("Save Edit"));

		await waitFor(() => {
			expect(screen.getByText("Rest")).toBeInTheDocument();
		});

		expect(screen.queryByLabelText("edit-todo-input")).toBeNull();
	});
	it("should have a red delete button", () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];

		const styles = getComputedStyle(deleteButton);
		expect(styles.backgroundColor).toBe("rgb(255, 76, 76)");
	});
});
