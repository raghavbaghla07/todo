import React, { useEffect, useState } from "react";

const AddTodoForm = ({ setTodos, todos, id, setId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (id) {
      updateById(id);
    } else {
      const obj = {
        id: Date.now(),
        title,
        description,
      };

      setTodos([...todos, obj]);
    }

    setId("");
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (id) {
      const todo = todos.find((d) => d.id === id);

      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      }
    }
  }, [id, todos]);

  const updateById = (id) => {
    const obj = { title, description };

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...obj } : todo)),
    );
  };

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
