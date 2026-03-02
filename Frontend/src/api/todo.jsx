const SERVER = import.meta.env.VITE_API_URL;
console.log("API URL:", SERVER);
// GET TODOS
export const getTodos = (page = 1, limit = 10, search = "") => {
  return fetch(`${SERVER}/todos?page=${page}&limit=${limit}&search=${search}`, {
    method: "GET",
    credentials: "include",
  });
};

// GET ONE
export const getTodo = (id) => {
  return fetch(`${SERVER}/todo/${id}`, {
    method: "GET",
    credentials: "include",
  });
};

// CREATE
export const addTodo = (data) => {
  return fetch(`${SERVER}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

// UPDATE
export const updateTodo = (id, data) => {
  return fetch(`${SERVER}/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

// DELETE
export const deleteTodo = (id) => {
  return fetch(`${SERVER}/todo/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};
