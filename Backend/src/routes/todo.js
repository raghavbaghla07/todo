const express = require("express");
const todoRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const Todo = require("../models/todo");
const { validateEditTodoData } = require("../utils/validation");
const mongoose = require("mongoose");


// create a todo
todoRouter.post("/todo", userAuth, async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title)
            return res.status(400).json({
                message: "Title is required"
            });

        const todo = new Todo({
            title,
            description,
            userId: req.user._id
        });

        await todo.save();

        return res.status(201).json({
            message: "Todo created successfully",
            todo
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


// get all todos
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
            .sort({ createdAt: -1 });

        return res.json({
            todos,
            page,
            limit
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


// get todo by id
todoRouter.get("/todo/:id", userAuth, async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).json({
                message: "Invalid todo id"
            });

        const todo = await Todo.findOne({
            userId: req.user._id,
            _id: req.params.id
        });

        if (!todo)
            return res.status(404).json({
                message: "Todo not found"
            });

        return res.json({
            todo
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


// update todo
todoRouter.patch("/todo/:id", userAuth, async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).json({
                message: "Invalid todo id"
            });

        if (!validateEditTodoData(req))
            return res.status(400).json({
                message: "Invalid fields to update"
            });

        const updatedTodo = await Todo.findOneAndUpdate(
            {
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
            return res.status(404).json({
                message: "Todo not found"
            });

        return res.json({
            message: "Todo updated successfully",
            todo: updatedTodo
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


// delete todo
todoRouter.delete("/todo/:id", userAuth, async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).json({
                message: "Invalid todo id"
            });

        const deleteTodo = await Todo.findOneAndDelete({
            userId: req.user._id,
            _id: req.params.id
        });

        if (!deleteTodo)
            return res.status(404).json({
                message: "Todo not found"
            });

        return res.json({
            message: "Todo deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

module.exports = todoRouter;