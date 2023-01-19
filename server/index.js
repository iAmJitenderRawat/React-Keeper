import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { Todo } from "./Schema/Todo.js";
import * as dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const app = express();

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.static("public"));
app.use(cors());

const CONNECTION_URL = process.env.URL;
const PORT = process.env.PORT;

app.post("/todos", (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
  });
  todo.save();
  res.json(todo);
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.delete("/todos/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((err) => console.log("error:", err.message));
