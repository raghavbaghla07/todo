import { useState, useEffect } from "react";
import { updateTodo } from "../api/todo";

const EditTodoModel = ({ todo, closeModal, refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDescription(todo.description || "");
    }
  }, [todo]);

  const handleUpdate = async () => {
    try {
      await updateTodo(todo._id, { title, description });
      await refreshTodos();
      closeModal();
    } catch (err) {
      alert(err.message || "Update failed");
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
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          className="input input-bordered w-full mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleUpdate}>
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
