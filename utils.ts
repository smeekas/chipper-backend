import fs from "fs";
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
