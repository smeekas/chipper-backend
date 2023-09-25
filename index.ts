import express from "express";
import cors from "cors";
const path = require("path");

import bodyParser from "body-parser";
import { imageUpload } from "./fileHandling";
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
// app.use(express.json());
app.get("/", getAll);
app.use("/static", express.static("images"));
// app.use(bodyParser.json());
//
// app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", imageUpload.single("image"), postPost);
app.post("/sub", subscribe);
app.get("/post/:id", singlePost);
app.delete("/post/:id", deletepost);
// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});

// Public Key:
// BFfDbXYABqkgeRUfkE5BrS484nEU9ZQ00MGYUk3ceVOtCdvIDU1E63lNJ3d8uraB4cbJQTZc3S7OxV0b78492qw

// Private Key:
// p_tXIna1_E_KFSPXW4WvFyL237Yo1M6KfMWIC-dSieg
