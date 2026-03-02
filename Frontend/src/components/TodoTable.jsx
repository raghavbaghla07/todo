import { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../api/todo";

export default function TodoTable() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const res = await getTodos(1, 10, "");
      const data = await res.json();

      // if backend sends error object
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch todos");
      }

      // ensure array
      const todoList = data.todos || data;

      if (!Array.isArray(todoList)) {
        setTodos([]);
      } else {
        setTodos(todoList);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No todos found
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr key={todo._id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>

                <td className="text-center">
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
