import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        const { first_name, email, password } = req.body;
        const emailVerification = await User.findOne({ email: email });
        if (emailVerification) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const generatedSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, generatedSalt);

        const newUser = new User({
            first_name,
            email,
            password: hashedPassword,
        });
        newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }
        const passwordVerification = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordVerification) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { _id: user._id, firstname: first_name, lastname: last_name },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        res.header("auth-token", token).json({ token });
        res.json({ message: "Logged in" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default authRouter;
