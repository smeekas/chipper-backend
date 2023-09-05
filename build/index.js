"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
// Initialize the express engine
const app = (0, express_1.default)();
// Take a port 3000 for running server.
const port = process.env.PORT || 9999;
// let fs = require("fs");
app.use((0, cors_1.default)());
// Handling '/' Request
app.get("/", (_req, _res) => {
    const rawData = fs_1.default.readFileSync("./db.json", "utf-8");
    console.log(rawData);
    console.log(JSON.parse(rawData));
    _res.send(JSON.parse(rawData));
});
app.post("/", (_req, _res) => {
    const rawData = fs_1.default.readFileSync("./db.json", "utf-8");
    const jsonData = JSON.parse(rawData);
    //    _req.body
    jsonData.push(_req.body);
    fs_1.default.writeFileSync("./db.json", JSON.stringify(jsonData), "utf-8");
});
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
