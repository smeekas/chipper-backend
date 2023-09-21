import express from "express";
import cors from "cors";
const path = require("path");

import webpush from "web-push";
import { getBase64, myWriteFile, readData, writeData } from "./utils";
import { PostType, SubType } from "./types";
import bodyParser from "body-parser";
import { imageUpload } from "./fileHandling";
// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port = process.env.PORT || 9999;
app.use(cors());
app.use(express.json());
// Handling '/' Request
app.get("/", (_req, _res) => {
  console.log("get /");
  _res.send(readData("./db.json"));
});
app.use("/static", express.static("images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", imageUpload.single("image"), (_req, _res) => {
  console.log("POST /");
  console.log("file", _req.file);
  console.log("body", _req.body);
  // return;
  const postData = {
    id: _req.body.id,
    title: _req.body.title,
    location: _req.body.location,
    image: `https://backend-l0yc.onrender.com/static/${_req.file?.filename}`,
  };
  // return;
  const jsonData = readData("./db.json");
  jsonData.push(postData);
  writeData("./db.json", jsonData);
  webpush.setVapidDetails(
    "mailto:hello@abc.com",
    "BFfDbXYABqkgeRUfkE5BrS484nEU9ZQ00MGYUk3ceVOtCdvIDU1E63lNJ3d8uraB4cbJQTZc3S7OxV0b78492qw",
    "p_tXIna1_E_KFSPXW4WvFyL237Yo1M6KfMWIC-dSieg"
  );
  const subscriptions: SubType = readData("./sub.json");
  subscriptions.forEach((data, index) => {
    console.log(data, "it-", index);
    const pushConfig = {
      endpoint: data.endpoint,
      keys: {
        auth: data.keys.auth,
        p256dh: data.keys.p256dh,
      },
    };
    webpush
      .sendNotification(
        pushConfig,
        JSON.stringify({
          title: "new post",
          content: "new post added you fool!",
        })
      )
      .catch((err) => {
        console.log(err, "error in notification");
      });
  });
  _res.status(201).json({ id: _req.body.id });
});
app.post("/sub", (req, res) => {
  const jsonData: SubType = readData("./sub.json");
  jsonData.push(req.body);
  writeData("./sub.json", jsonData);
  res.json({ status: true });
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
