import express from "express";
import User from "../models/user.js";
import Verify from "../middleware/verify.js";

const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password -email -__v");
        res.json(users);
    } catch (err) {
        console.log(err.message);
    }
});

userRouter.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(
            "-password -email -__v"
        );
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
        ).select("-password -email -__v");
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.delete("/users/:id", async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);
        const deletedUser = await userToDelete.deleteOne();
        res.json(userToDelete);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default userRouter;
