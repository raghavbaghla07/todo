const SERVER = "/api";

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

// SIGNUP
export const signup = (data) =>
  request("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

// LOGIN
export const login = (data) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

// LOGOUT
export const logout = () =>
  request("/logout", {
    method: "POST",
  });
