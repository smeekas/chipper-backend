import express from "express";
import cors from "cors";
import fs from "fs";
// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port = process.env.PORT || 9999;
// let fs = require("fs");
app.use(cors());
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
// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
