import { File } from "@web-std/file";

import fs from "fs";
import { Multer } from "multer";
import path from "path";
export function writeData(path: string, data: object) {
  fs.writeFileSync(path, JSON.stringify(data), "utf-8");
}

export function myWriteFile(path: string, data: any) {
  fs.writeFile(path, data, { encoding: "binary" }, (err) => {
    console.log(err);
  });
}
export function readData(path: string) {
  const rawData = fs.readFileSync(path, "utf-8");
  return JSON.parse(rawData);
}

export function getBase64(file: File) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    // console.log(reader.result);
    return reader.result;
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
// export function MulterToBlob(file: Express.Multer.File) {
//   const formData = new FormData();
//   const buff = Buffer.from(file.buffer);
//   formData.append("file", buff, {
//     filename: file.originalname,
//     contentType: file.mimetype,
//   });

//   return this.httpService
//     .post("http://test_server/file", formData, {
//       headers: {
//         ...formData.getHeaders(),
//         "Content-Length": `${formData.getLengthSync()}`,
//       },
//     })
//     .pipe(map((response) => response.data));
// }
// export function convertMulterFileToFile(multerFile: Express.Multer.File) {
//   // Read the file data using 'fs.readFileSync'
//   path.dirname;
//   const pathToFile = path.join(__dirname, multerFile.path);
//   console.log(pathToFile);
//   const fileData = fs.readFile(pathToFile);
//   console.log(fileData);
//   // Create a new File object
//   const regularFile = new File([multerFile.buffer], multerFile.originalname, {
//     type: multerFile.mimetype,
//   });

//   return regularFile;
// }
