import { useState } from "react";
import "./App.css";
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";
import TodoForm from "./components/TodoForm";

function App() {
	const [todos, setTodos] = useState<string[]>([]);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [editText, setEditText] = useState("");

	const addTodo = (text: string) => {
		setTodos([...todos, text]);
	};

	const removeTodo = (todoToRemove: string) => {
		setTodos(todos.filter((todo) => todo !== todoToRemove));
	};

	const startEditing = (index: number) => {
		setEditIndex(index);
		setEditText(todos[index]);
	};

	const saveEdit = () => {
		if (editIndex !== null && editText.trim() !== "") {
			const updatedTodos = [...todos];
			updatedTodos[editIndex] = editText;
			setTodos(updatedTodos);
			setEditIndex(null);
			setEditText("");
		}
	};

	return (
		<>
			<h1>My TodoApp</h1>

			<TodoForm onSubmit={addTodo} />

			{editIndex !== null && (
				<div>
					<input
						type="text"
						aria-label="edit-todo-input"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
					/>
					<button onClick={saveEdit}>Save Edit</button>
				</div>
			)}

			<ul>
				{todos.map((todo, index) => (
					<li key={todo}>
						{todo}
						<EditButton onClick={() => startEditing(index)} />
						<DeleteButton onClick={() => removeTodo(todo)} />
					</li>
				))}
			</ul>
		</>
	);
}

export default App;
