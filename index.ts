import express from "express";
import cors from "cors";
import fs from "fs";
// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port = process.env.PORT || 9999;
// let fs = require("fs");
app.use(cors());
app.use(express.json());
// Handling '/' Request
app.get("/", (_req, _res) => {
  const rawData = fs.readFileSync("./db.json", "utf-8");
  console.log(rawData);
  console.log(JSON.parse(rawData));
  _res.send(JSON.parse(rawData));
});

app.post("/", (_req, _res) => {
  const rawData = fs.readFileSync("./db.json", "utf-8");
  const jsonData = JSON.parse(rawData);
  //    _req.body
  jsonData.push(_req.body);
  fs.writeFileSync("./db.json", JSON.stringify(jsonData), "utf-8");
});
app.post("/sub", (req, res) => {
  const rawData = fs.readFileSync("./sub.json", "utf-8");
  const jsonData = JSON.parse(rawData);
  console.log(req.body);
});
// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
// Public Key:
// BFfDbXYABqkgeRUfkE5BrS484nEU9ZQ00MGYUk3ceVOtCdvIDU1E63lNJ3d8uraB4cbJQTZc3S7OxV0b78492qw

// Private Key:
// p_tXIna1_E_KFSPXW4WvFyL237Yo1M6KfMWIC-dSieg
