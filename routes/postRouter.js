import express from "express";
import Post from "../models/post.js";
const postRouter = express.Router();

postRouter.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.log(err.message);
    }
});

postRouter.post("/posts", async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.json(newPost);
    } catch (err) {
        console.log(err.message);
    }
});

export default postRouter;
