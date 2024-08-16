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

		expect(screen.getByText("Sleep")).toBeInTheDocument();
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

	it("should set the form to edit mode when editing a todo", () => {
		render(<App />);

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		expect(screen.getByRole("textbox")).toHaveValue("Sleep");
		expect(screen.getByText("Save Edit")).toBeInTheDocument();
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

		const editInput = screen.getByRole("textbox");
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
		fireEvent.input(screen.getByRole("textbox"), { target: { value: "" } });
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

		const editInput = screen.getByRole("textbox");
		fireEvent.change(editInput, { target: { value: "Rest" } });
		fireEvent.click(screen.getByText("Save Edit"));

		await waitFor(() => {
			expect(screen.getByText("Rest")).toBeInTheDocument();
		});
	});
});

//hade gått att slå ihop testerna för edit till en men tyckte att denna var tydligare
