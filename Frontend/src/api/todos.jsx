const SERVER = "http://localhost:3000";
const getToken = () => localStorage.getItem("token");

export const getTodos = () => {
    return fetch(SERVER + "/todos", {
        headers: {
            Authorization: "Bearer " + getToken(),
        },
    });
}
export const getTodo = (id) => {
    return fetch(SERVER + "/todos/" + id, {
        headers: {
            Authorization: "Bearer " + getToken(),
        },
    });
}
export const addTodo = (data) => {
    return fetch(SERVER + "/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(data)
    });
}
export const updateTodo = (id, data) => {
    return fetch(SERVER + "/todos/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(data)
    });
}
export const deleteTodo = (id) => {
    return fetch(SERVER + "/todos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + getToken(),
        },
    });
}