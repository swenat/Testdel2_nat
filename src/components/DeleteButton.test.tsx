import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeleteButton from "./DeleteButton";

describe("DeleteButton", () => {
	it("should render a button with 'Delete' text", () => {
		render(<DeleteButton onClick={vi.fn()} />);

		expect(screen.getByRole("button")).toHaveTextContent("Delete");
	});

	it("should call onClick when the button is clicked", () => {
		const handleClick = vi.fn();
		render(<DeleteButton onClick={handleClick} />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleClick).toBeCalled();
	});

	it("should have a red background color", () => {
		render(<DeleteButton onClick={vi.fn()} />);

		const button = screen.getByRole("button");
		const styles = getComputedStyle(button);

		// Kontrollera att bakgrundsfärgen är #ff4c4c
		expect(styles.backgroundColor).toBe("rgb(255, 76, 76)"); // motsvarar #ff4c4c
	});
});
