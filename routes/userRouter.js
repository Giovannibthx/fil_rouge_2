import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err.message);
    }
});

userRouter.post("/users", async (req, res) => {
    try {
        const newUser = await new User(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

userRouter.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.delete("/users/:id", async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);
        const deletedUser = await userToDelete.deleteOne();
        res.json(deletedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default userRouter;