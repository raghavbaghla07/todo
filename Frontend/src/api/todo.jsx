const SERVER = import.meta.env.VITE_API_URL;

const request = async (url, options = {}) => {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${SERVER}${url}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

// GET TODOS
export const getTodos = (page = 1, limit = 10, search = "") =>
  request(
    `/todos?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
  );

// GET ONE
export const getTodo = (id) => request(`/todo/${id}`);

// CREATE
export const addTodo = (data) =>
  request("/todo", {
    method: "POST",
    body: JSON.stringify(data),
  });

// UPDATE
export const updateTodo = (id, data) =>
  request(`/todo/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// DELETE
export const deleteTodo = (id) =>
  request(`/todo/${id}`, {
    method: "DELETE",
  });
