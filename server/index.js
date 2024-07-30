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

app.post("/todos", async (req, res) => {
  if(!req.body.title){
    return res.status(400).json({ message: "Title is required" });
  }
  const todo = new Todo({
    title: req.body.title,
    content: req?.body?.content,
  });
  await todo.save();
  res.json(todo);
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.get("/todos/:id", async (req, res) => {
  try {
    const todos = await Todo.findById(req.params.id);
    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

app.patch("/todos/:id", async (req, res) => {
  if(!req?.body?.title){
    return res.status(400).json({ message: "Title is required" });
  }
  const result = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      $set: { title: req.body.title, content: req.body.content },
    },
    { new: true }
  );
  res.json(result);
});

app.delete("/todos/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("error:", err.message));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
