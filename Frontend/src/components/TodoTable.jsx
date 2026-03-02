function TodoTable({ todos, deleteTodo, setId }) {
  if (!todos.length) {
    return <p className="text-center mt-10">No todos found</p>;
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
              <td>{todo.description}</td>

              <td className="text-center">
                <button
                  onClick={() => setId(todo._id)}
                  className="btn btn-sm btn-warning mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(todo._id)}
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
