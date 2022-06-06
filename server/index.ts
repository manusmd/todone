import express from "express";
import { connectDatabase /* , getToDoCollection */ } from "../config/database";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

if (!process.env.MONGODB_URI) {
  throw new Error("No MongoDB URI dotenv variable");
}

app.get("/hello", (_req, res) => {
  res.send("Hello World!");
});

/* // Serve production bundle
app.use(express.static("dist")); */

connectDatabase(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
