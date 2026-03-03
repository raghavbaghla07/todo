function TodoTable({ todos = [], deleteTodo, viewTodo, setEditTodo }) {
  if (!todos.length) {
    return <p className="text-center mt-10 text-gray-500">No todos found</p>;
  }

  return (
    <div className="overflow-x-auto mt-6 flex justify-center">
      <table className="table w-[70%]">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.description || "-"}</td>

              <td className="text-center space-x-2">
                <button
                  onClick={() => viewTodo(todo._id)}
                  className="btn btn-sm btn-info"
                >
                  View
                </button>

                <button
                  onClick={() => setEditTodo(todo)}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete this todo?")) {
                      deleteTodo(todo._id);
                    }
                  }}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTable;
