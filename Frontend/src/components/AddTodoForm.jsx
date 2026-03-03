import { useState } from "react";
import { addTodo } from "../api/todo";

const AddTodoForm = ({ refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await addTodo({ title, description });
      await refreshTodos();
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.message || "Failed to add todo");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center gap-4 my-6">
        <input
          className="input input-bordered"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input input-bordered"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default AddTodoForm;
