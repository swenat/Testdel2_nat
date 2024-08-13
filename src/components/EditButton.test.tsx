import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EditButton from "./EditButton";

describe("EditButton", () => {
	it("should render a button with 'Edit' text", () => {
		render(<EditButton onClick={vi.fn()} />);

		expect(screen.getByRole("button")).toHaveTextContent("Edit");
	});

	it("should call onClick when the button is clicked", () => {
		const handleClick = vi.fn();
		render(<EditButton onClick={handleClick} />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleClick).toBeCalled();
	});
});
