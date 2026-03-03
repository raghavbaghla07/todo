import { useState, useEffect } from "react";
import { updateTodo } from "../api/todo";

const EditTodoModel = ({ todo, closeModal, refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDescription(todo.description || "");
    }
  }, [todo]);

  const handleUpdate = async () => {
    if (loading) return; // prevent double click

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

      await updateTodo(todo._id, { title, description });

      await refreshTodos();
      closeModal();
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!todo) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Todo</h3>

        <input
          className="input input-bordered w-full mb-3"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="Title"
        />

        <input
          className="input input-bordered w-full mb-3"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError("");
          }}
          placeholder="Description"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            Save
          </button>
          <button className="btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModel;
