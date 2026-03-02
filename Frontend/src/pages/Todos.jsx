import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import AddTodoForm from "../components/AddTodoForm";
import TodoTable from "../components/TodoTable";

import { getTodos, deleteTodo as deleteTodoApi } from "../api/todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const page = 1;
  const limit = 10;

  const fetchTodos = async () => {
    try {
      const res = await getTodos(page, limit, search);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search]);

  const deleteTodo = async (todoId) => {
    try {
      await deleteTodoApi(todoId);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <SearchBar setSearch={setSearch} />

      <div className="container mt-4">
        <h1 className="text-center mb-4">Todo Dashboard</h1>

        <AddTodoForm
          id={id}
          setId={setId}
          todos={todos}
          setTodos={setTodos}
          refreshTodos={fetchTodos}
        />

        <TodoTable todos={todos} deleteTodo={deleteTodo} setId={setId} />
      </div>
    </>
  );
};

export default Todos;
