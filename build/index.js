"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path = require("path");
const fileHandling_1 = require("./fileHandling");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const controllers_1 = require("./controller/controllers");
// Initialize the express engine
const app = (0, express_1.default)();
const port = process.env.PORT || 9999;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", controllers_1.getAll);
app.use("/static", express_1.default.static("images"));
//
app.post("/", fileHandling_1.imageUpload.single("image"), controllers_1.postPost);
app.post("/sub", controllers_1.subscribe);
app.get("/post/:id", controllers_1.singlePost);
app.delete("/post/:id", controllers_1.deletepost);
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
