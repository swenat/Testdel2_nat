import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeleteButton from "./DeleteButton";

describe("DeleteButton", () => {
	it("should render a red button with a 'Delete' text", () => {
		render(<DeleteButton onClick={vi.fn()} />);

		const button = screen.getByRole("button");

		// Kontrollera att knappen har rätt text
		expect(button).toHaveTextContent("Delete");

		// Kontrollera att bakgrundsfärgen är #ff4c4c (röd)
		const styles = getComputedStyle(button);
		expect(styles.backgroundColor).toBe("rgb(255, 76, 76)");
	});

	it("should call onClick when the button is clicked", () => {
		const handleClick = vi.fn();
		render(<DeleteButton onClick={handleClick} />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleClick).toBeCalled();
	});
});
