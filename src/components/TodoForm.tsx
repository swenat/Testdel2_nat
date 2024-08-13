import { FormEvent, useState } from "react";

// Våra props ger oss möjligheten att skapa integrationstester.
interface Props {
  onSubmit: (text: string) => void;
}

function TodoForm(props: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Save</button>
    </form>
  );
}

export default TodoForm;
