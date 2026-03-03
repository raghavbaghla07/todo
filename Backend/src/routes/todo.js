const express = require("express");
const todoRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const Todo = require("../models/todo");
const { validateEditTodoData } = require("../utils/validation");
const mongoose = require("mongoose");


// ============================
// CREATE TODO
// ============================
todoRouter.post("/todo", userAuth, async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const todo = new Todo({
            title,
            description,
            userId: req.user._id,
        });

        await todo.save();

        // 🔥 return pure object (important)
        return res.status(201).json(todo);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});


// ============================
// GET ALL TODOS
// ============================
todoRouter.get("/todos", userAuth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    try {
        const todos = await Todo.find({
            userId: req.user._id,
            title: { $regex: search, $options: "i" },
        })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // 🔥 return array directly
        return res.json(todos);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});


// ============================
// GET TODO BY ID
// ============================
todoRouter.get("/todo/:id", userAuth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid todo id",
            });
        }

        const todo = await Todo.findOne({
            userId: req.user._id,
            _id: req.params.id,
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        // 🔥 return pure object
        return res.json(todo);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});


// ============================
// UPDATE TODO
// ============================
todoRouter.patch("/todo/:id", userAuth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid todo id",
            });
        }

        if (!validateEditTodoData(req)) {
            return res.status(400).json({
                message: "Invalid fields to update",
            });
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            {
                userId: req.user._id,
                _id: req.params.id,
            },
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        // 🔥 return pure object
        return res.json(updatedTodo);

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});


// ============================
// DELETE TODO
// ============================
todoRouter.delete("/todo/:id", userAuth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid todo id",
            });
        }

        const deletedTodo = await Todo.findOneAndDelete({
            userId: req.user._id,
            _id: req.params.id,
        });

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        return res.json({
            message: "Todo deleted successfully",
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = todoRouter;