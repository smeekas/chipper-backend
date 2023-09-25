import { RequestHandler } from "express";
import { PostData, SubType } from "../types";
import webpush from "web-push";
import http from "http";
import { readData, writeData } from "../utils";
import { uploadDirect } from "@uploadcare/upload-client";
import { json } from "body-parser";
import { unlink } from "fs";
import path from "path";
export const getAll: RequestHandler = (req, res, next) => {
  res.send(readData("./db.json"));
};

export const subscribe: RequestHandler = (req, res) => {
  const jsonData: SubType = readData("./sub.json");
  jsonData.push(req.body);
  writeData("./sub.json", jsonData);
  res.json({ status: true });
};

export const singlePost: RequestHandler = (req, res) => {
  const jsonData = readData("./db.json");

  const post = jsonData.find((post: { id: any }) => post.id === req.params.id);
  if (post) {
    return res.json(post);
  } else {
    return res.status(400).json({ message: "something went wrong" });
  }
};
export const deletepost: RequestHandler = (req, res) => {
  const jsonData: PostData[] = readData("./db.json");
  const post = jsonData.filter(
    (post: { id: any }) => post.id !== req.params.id
  );
  const removedpost = jsonData.find(
    (post: { id: any }) => post.id === req.params.id
  );
  if (removedpost) {
    const imageName = removedpost.image.split("/").at(-1);
    if (imageName) {
      console.log(imageName, path.join(__dirname, "images", imageName));
      unlink(path.join(__dirname, "..", "images", imageName), (err) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ message: "somrthing went wrong", err: err });
        }
        writeData("./db.json", post);
        return res.status(200).json({ message: "deleted" });
      });
    }
  }
};
export const postPost: RequestHandler = async (_req, _res) => {
  console.log(_req.body);
  console.log(_req.files);
  console.log(_req.file?.path);
  console.log(!_req.file);
  try {
    if (!_req.file) {
      return _res.status(400).json({ message: "Something went wrong" });
    }
    // const result = await uploadDirect(convertMulterFileToFile(_req.file), {
    //   publicKey: "211624b78165a04bde0c",
    //   store: "auto",
    //   // contentType: "image/jpg",
    // });
    const postData = {
      id: _req.body.id,
      title: _req.body.title,
      location: _req.body.location,
      image: `https://backend-l0yc.onrender.com/static/${_req.file?.filename}`,
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
    console.log(err);
    _res.status(400).json({ message: "something went wrong" });
  }
};
