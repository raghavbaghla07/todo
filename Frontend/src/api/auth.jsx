const SERVER = import.meta.env.VITE_API_URL;
export const signup = (data) => {
  return fetch(`${SERVER}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const login = (data) => {
  return fetch(`${SERVER}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const logout = () => {
  return fetch(`${SERVER}/logout`, {
    method: "POST",
    credentials: "include",
  });
};
