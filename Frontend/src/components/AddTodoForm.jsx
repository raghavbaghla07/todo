import React, { useEffect, useState } from "react";
import { addTodo, updateTodo } from "../api/todo";

const AddTodoForm = ({ setTodos, todos, id, setId, refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      if (id) {
        // update
        const updatedTodo = await updateTodo(id, { title, description });

        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? updatedTodo : todo)),
        );
      } else {
        // create
        const newTodo = await addTodo({ title, description });

        // instant UI update
        setTodos((prev) => [newTodo, ...prev]);

        //  server refresh
        if (refreshTodos) await refreshTodos();
      }

      setId("");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      const todo = todos.find((t) => t._id === id);

      if (todo) {
        setTitle(todo.title || "");
        setDescription(todo.description || "");
      }
    }
  }, [id, todos]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="container my-5 text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          value={title}
          className="mx-2"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          value={description}
          className="mx-2"
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-warning">{id ? "Update" : "Add"}</button>
      </div>
    </form>
  );
};

export default AddTodoForm;
