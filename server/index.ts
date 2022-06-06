import express from "express";
import { connectDatabase, getToDoCollection } from "../config/database";
import dotenv from "dotenv";
dotenv.config();
import { ToDo } from "./types";
import { auth, requiresAuth } from "express-openid-connect";

const port = process.env.PORT || 3000;
const app = express();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: "http://localhost:3000",
  clientID: "FgOVpqOk94jkXBvagQKikLfGn62GfVcT",
  issuerBaseURL: "https://dev-fsx9crux.us.auth0.com",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth(config));

if (!process.env.MONGODB_URI) {
  throw new Error("No MongoDB URI dotenv variable");
}

app.get("/", (req: Express.Request, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/todos", async (_req, res) => {
  const collection = getToDoCollection();
  const cursor = collection.find({});
  const allToDos = await cursor.toArray();
  res.send(allToDos);
});

app.post("/todos", async (req, res) => {
  const checkTodo = (todo: ToDo) => {
    if (typeof todo.text !== "string") {
      return "Text is not a string";
    } else if (typeof todo.status !== "boolean") {
      return "Status is not a boolean";
    } else if (typeof todo.user !== "string") {
      return "User is not a string";
    } else {
      return false;
    }
  };
  try {
    const todo = req.body;
    console.dir(checkTodo(todo));
    if (checkTodo(todo)) {
      res.status(400).send(checkTodo(todo));
    } else {
      const collection = getToDoCollection();
      await collection.insertOne(todo);
      res.status(201).send(todo + " inserted");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

connectDatabase(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
