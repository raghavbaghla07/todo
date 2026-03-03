import { useState } from "react";
import { addTodo } from "../api/todo";

const AddTodoForm = ({ refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await addTodo({ title, description });

      setTitle("");
      setDescription("");

      await refreshTodos();
    } catch (err) {
      setError(err.message || "Failed to add todo");
    } finally {
      setLoading(false);
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
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
        />

        <input
          className="input input-bordered"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError("");
          }}
        />
        <button
          className="btn btn-primary"
          disabled={loading || !title.trim() || !description.trim()}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
};

export default AddTodoForm;
