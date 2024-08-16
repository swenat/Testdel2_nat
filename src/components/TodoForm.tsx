import { FormEvent, useEffect, useState } from "react";

// Våra props ger oss möjligheten att skapa integrationstester.
interface Props {
	onSubmit: (text: string) => void;
	initialText?: string;
	editMode?: boolean;
}

function TodoForm({ onSubmit, initialText = "", editMode = false }: Props) {
	const [text, setText] = useState(initialText);

	useEffect(() => {
		setText(initialText);
	}, [initialText]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (text.trim() === "") return;
		onSubmit(text);
		setText(""); // Clear input field after submission
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Write a todo"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button>{editMode ? "Save Edit" : "Save"}</button>
		</form>
	);
}

export default TodoForm;
