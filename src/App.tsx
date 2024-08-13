import { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";

function App() {
	const [todos, setTodos] = useState<string[]>([]);

	return (
		<>
			<h1>Vite + React</h1>

			<TodoForm onSubmit={(text) => setTodos([...todos, text])} />

			<ul>
				{todos.map((todo) => (
					<li key={todo}>{todo}</li>
				))}
			</ul>
		</>
	);
}

export default App;
