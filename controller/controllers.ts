import { RequestHandler } from "express";
import { SubType } from "../types";
import webpush from "web-push";

import { readData, writeData } from "../utils";
import { uploadDirect } from "@uploadcare/upload-client";
export const getAll: RequestHandler = (req, res, next) => {
  res.send(readData("./db.json"));
};

export const subscribe: RequestHandler = (req, res) => {
  const jsonData: SubType = readData("./sub.json");
  jsonData.push(req.body);
  writeData("./sub.json", jsonData);
  res.json({ status: true });
};
export const postPost: RequestHandler = async (_req, _res) => {
  try {
    if (!_req.file)
      return _res.status(400).json({ message: "Something went wrong" });
    const result = await uploadDirect(_req.file.buffer as Buffer, {
      publicKey: "211624b78165a04bde0c",
      store: "auto",
    });
    const postData = {
      id: _req.body.id,
      title: _req.body.title,
      location: _req.body.location,
      image: `https://ucarecdn.com/${result.uuid}`,
    };
    const jsonData = readData("./db.json");
    jsonData.push(postData);
    writeData("./db.json", jsonData);
    if (process.env.pub && process.env.pri) {
      webpush.setVapidDetails(
        "mailto:hello@abc.com",
        process.env.pub,
        process.env.pri
      );
    }
    //   const subscriptions: SubType = readData("./sub.json");
    //   subscriptions.forEach((data, index) => {
    //     const pushConfig = {
    //       endpoint: data.endpoint,
    //       keys: {
    //         auth: data.keys.auth,
    //         p256dh: data.keys.p256dh,
    //       },
    //     };
    //     webpush
    //       .sendNotification(
    //         pushConfig,
    //         JSON.stringify({
    //           title: "new post",
    //           content: "new post added you fool!",
    //         })
    //       )
    //       .catch((err) => {
    //         console.log(err, "error in notification");
    //       });
    //   });
    _res.status(201).json({ id: _req.body.id });
  } catch (err) {
    _res.status(400).json({ message: "something went wrong" });
  }
};
