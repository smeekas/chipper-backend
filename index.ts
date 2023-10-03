import express from "express";
import cors from "cors";
const path = require("path");

import bodyParser from "body-parser";
import { imageUpload } from "./fileHandling";
import dotenv from "dotenv";
dotenv.config();

import {
  deletepost,
  getAll,
  postPost,
  singlePost,
  subscribe,
} from "./controller/controllers";
// Initialize the express engine
const app: express.Application = express();

const port = process.env.PORT || 9999;
app.use(cors());
app.use(express.json());
app.get("/", getAll);
app.use("/static", express.static("images"));
//
app.post("/", imageUpload.single("image"), postPost);
app.post("/sub", subscribe);
app.get("/post/:id", singlePost);
app.delete("/post/:id", deletepost);
// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
