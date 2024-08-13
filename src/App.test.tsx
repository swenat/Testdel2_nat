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

		//Kontrollera att inget redigeringsinput visas initialt
		expect(screen.queryByLabelText("edit-todo-input")).toBeNull();
	});

	it("should display edit input when a todo is being edited", async () => {
		render(<App />);

		// Lägg till ett todo
		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		// Starta redigering
		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		// Kontrollera att redigeringsinputen visas
		expect(screen.getByLabelText("edit-todo-input")).toBeVisible();
	});

	it("should save the edited todo and remove the old todo", async () => {
		render(<App />);

		// Lägg till två todos
		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Eat" },
		});
		fireEvent.click(screen.getByText("Save"));

		// Börja redigera det första todot
		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		// Redigera och spara det första todot
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

		// Lägg till ett todo
		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		// Börja redigera
		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		// Redigera och spara med tomt värde
		const editInput = screen.getByLabelText("edit-todo-input");
		fireEvent.change(editInput, { target: { value: "" } });
		fireEvent.click(screen.getByText("Save Edit"));

		await waitFor(() => {
			// Kontrollera att det gamla todo fortfarande är kvar
			expect(screen.queryByText("Sleep")).toBeInTheDocument();
		});

		// Kontrollera att inget nytt todo med tomt värde skapades
		const todos = screen.queryAllByRole("listitem");
		expect(todos.length).toBe(1); // Det bör fortfarande bara finnas ett todo
	});

	it("should set and clear editIndex correctly", async () => {
		render(<App />);

		// Lägg till ett todo
		fireEvent.input(screen.getByPlaceholderText("Write a todo"), {
			target: { value: "Sleep" },
		});
		fireEvent.click(screen.getByText("Save"));

		// Börja redigera
		fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

		// Redigera och spara
		const editInput = screen.getByLabelText("edit-todo-input");
		fireEvent.change(editInput, { target: { value: "Rest" } });
		fireEvent.click(screen.getByText("Save Edit"));

		await waitFor(() => {
			expect(screen.getByText("Rest")).toBeInTheDocument();
		});

		// Bekräfta att editIndex är null efter spara
		expect(screen.queryByLabelText("edit-todo-input")).toBeNull();
	});
});
