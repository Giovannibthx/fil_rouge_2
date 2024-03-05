import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 3000;

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        axtended: true,
    })
);

const mongoDB =
    "mongodb+srv://giovannibthx:2OI2eOb86SziIhcw@filrouge2.4qv5nud.mongodb.net/?retryWrites=true&w=majority&appName=filRouge2";
mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
    res.send("Welcome to our API using mongo and express");
});

app.listen(port, () => console.log(`server is running on port ${port}`));
