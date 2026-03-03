import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import AddTodoForm from "../components/AddTodoForm";
import TodoTable from "../components/TodoTable";

import { getTodo, getTodos, deleteTodo as deleteTodoApi } from "../api/todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);

  const limit = 7;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos(page, limit, search);

      console.log("TODOS RESPONSE:", data);
      console.log("IS ARRAY?", Array.isArray(data));

      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page, search]);

  const viewTodo = async (id) => {
    try {
      const data = await getTodo(id);
      alert(`Title: ${data.title}\nDescription: ${data.description}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to fetch todo");
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await deleteTodoApi(todoId);
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert(err.message || "Delete failed");
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

        <TodoTable
          todos={todos}
          deleteTodo={deleteTodo}
          viewTodo={viewTodo}
          setId={setId}
        />

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="flex items-center">Page {page}</span>

          <button
            className="btn"
            disabled={todos.length < limit}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Todos;
