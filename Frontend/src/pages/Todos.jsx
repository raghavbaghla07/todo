import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import AddTodoForm from "../components/AddTodoForm";
import TodoTable from "../components/TodoTable";
import EditTodoModal from "../components/EditTodoModal";

import { getTodo, getTodos, deleteTodo as deleteTodoApi } from "../api/todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editTodo, setEditTodo] = useState(null);

  const limit = 7;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos(page, limit, search);
      setTodos(data);
    } catch (err) {
      alert(err.message || "Failed to load todos");
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
      alert(err.message || "Failed to fetch todo");
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await deleteTodoApi(todoId);
      fetchTodos();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <>
      <Navbar />
      <SearchBar setSearch={setSearch} />

      <div className="container mt-4">
        <h1 className="text-center mb-4">Todo Dashboard</h1>

        <AddTodoForm refreshTodos={fetchTodos} />

        <TodoTable
          todos={todos}
          deleteTodo={deleteTodo}
          viewTodo={viewTodo}
          setEditTodo={setEditTodo}
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

      {editTodo && (
        <EditTodoModal
          todo={editTodo}
          closeModal={() => setEditTodo(null)}
          refreshTodos={fetchTodos}
        />
      )}
    </>
  );
};

export default Todos;
