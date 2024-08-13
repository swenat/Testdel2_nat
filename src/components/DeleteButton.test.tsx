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
});
