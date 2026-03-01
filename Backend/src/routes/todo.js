const express = require("express")
const todoRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const Todo = require("../models/todo");

const { validateEditTodoData } = require("../utils/validation")
//crate a todo
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

//get all todo
todoRouter.get("/todos", userAuth, async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    try {
        const todos = await Todo.find({
            userId: req.user._id,
            title: { $regex: search, $options: "i" }
        })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })

        res.send(todos);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

// get todo by id
todoRouter.get("/todo/:id", userAuth, async (req, res) => {
    try {
        const todo = await Todo.findOne({
            userId: req.user._id,
            _id: req.params.id
        })
        if (!todo)
            res.status(404).send("todo not found");
        res.send(todo);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

//update todo
todoRouter.patch("/todo/:id", userAuth, async (req, res) => {
    try {
        if (!validateEditTodoData(req))
            return res.status(400).send("Invalid fields to update");

        const updatedTodo = await Todo.findOneAndUpdate({
            userId: req.user._id,
            _id: req.params.id
        },
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedTodo)
            return res.status(404).send("todo not found")

        res.send(updatedTodo);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

// delete todo
todoRouter.delete("/todo/:id", userAuth, async (req, res) => {
    try {
        const deleteTodo = await Todo.findOneAndDelete({
            userId: req.user._id,
            _id: req.params.id
        });
        if (!deleteTodo)
            return res.status(404).send("Todo does not exist")
        res.send("todo deleted successfully")
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})
module.exports = todoRouter;


