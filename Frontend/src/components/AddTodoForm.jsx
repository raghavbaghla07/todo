import React, { useEffect, useState } from "react";
import { addTodo, updateTodo } from "../api/todo";

const AddTodoForm = ({ setTodos, todos, id, setId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      if (id) {
        const res = await updateTodo(id, { title, description });
        const data = await res.json();

        setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
      } else {
        const res = await addTodo({ title, description });
        const data = await res.json();

        setTodos((prev) => [data, ...prev]);
      }

      setId("");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      const todo = todos.find((d) => d._id === id);

      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
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
