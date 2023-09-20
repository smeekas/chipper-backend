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
app.use(express_1.default.json());
// Handling '/' Request
app.get("/", (_req, _res) => {
    const rawData = fs_1.default.readFileSync("./db.json", "utf-8");
    // console.log(rawData);
    // console.log(JSON.parse(rawData));
    _res.send(JSON.parse(rawData));
});
app.post("/", (_req, _res) => {
    const rawData = fs_1.default.readFileSync("./db.json", "utf-8");
    const jsonData = JSON.parse(rawData);
    //    _req.body
    jsonData.push(_req.body);
    fs_1.default.writeFileSync("./db.json", JSON.stringify(jsonData), "utf-8");
});
app.post("/sub", (req, res) => {
    const rawData = fs_1.default.readFileSync("./sub.json", "utf-8");
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
