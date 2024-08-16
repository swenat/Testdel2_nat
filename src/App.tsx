import { useState } from "react";
import "./App.css";
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";
import TodoForm from "./components/TodoForm";

function App() {
	const [todos, setTodos] = useState<string[]>([]);
	const [editIndex, setEditIndex] = useState<number | null>(null);

	const addOrEditTodo = (text: string) => {
		if (editIndex !== null) {
			const updatedTodos = [...todos];
			updatedTodos[editIndex] = text;
			setTodos(updatedTodos);
			setEditIndex(null);
		} else {
			setTodos([...todos, text]);
		}
	};

	const removeTodo = (todoToRemove: string) => {
		setTodos(todos.filter((todo) => todo !== todoToRemove));
	};

	const startEditing = (index: number) => {
		setEditIndex(index);
	};

	return (
		<>
			<h1>My TodoApp</h1>

			<TodoForm
				onSubmit={addOrEditTodo}
				initialText={editIndex !== null ? todos[editIndex] : ""}
				editMode={editIndex !== null}
			/>

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
