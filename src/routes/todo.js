const express = require("express")
const todoRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const Todo = require("../models/todo")

todoRouter.post("/todo", userAuth, async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({
            title,
            description,
            userId: req.user._id
        });
        await todo.save();
        res.send(todo);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})


todoRouter.get("/todos", userAuth, async (req, res) => {
    try {
        const todos = await Todo.find({
            userId: req.user._id
        })
        res.send(todos);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = todoRouter;


