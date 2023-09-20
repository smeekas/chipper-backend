"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path = require("path");
const web_push_1 = __importDefault(require("web-push"));
const utils_1 = require("./utils");
const body_parser_1 = __importDefault(require("body-parser"));
const fileHandling_1 = require("./fileHandling");
// Initialize the express engine
const app = (0, express_1.default)();
// Take a port 3000 for running server.
const port = process.env.PORT || 9999;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Handling '/' Request
app.get("/", (_req, _res) => {
    console.log("get /");
    _res.send((0, utils_1.readData)("./db.json"));
});
app.use("/static", express_1.default.static("images"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post("/", fileHandling_1.imageUpload.single("image"), (_req, _res) => {
    var _a;
    console.log("POST /");
    console.log("file", _req.file);
    console.log("body", _req.body);
    // return;
    const postData = {
        id: _req.body.id,
        title: _req.body.title,
        location: _req.body.location,
        image: `http://127.0.0.1:9999/static/${(_a = _req.file) === null || _a === void 0 ? void 0 : _a.filename}`
    };
    // return;
    const jsonData = (0, utils_1.readData)("./db.json");
    jsonData.push(postData);
    (0, utils_1.writeData)("./db.json", jsonData);
    web_push_1.default.setVapidDetails("mailto:hello@abc.com", "BFfDbXYABqkgeRUfkE5BrS484nEU9ZQ00MGYUk3ceVOtCdvIDU1E63lNJ3d8uraB4cbJQTZc3S7OxV0b78492qw", "p_tXIna1_E_KFSPXW4WvFyL237Yo1M6KfMWIC-dSieg");
    const subscriptions = (0, utils_1.readData)("./sub.json");
    subscriptions.forEach((data, index) => {
        console.log(data, "it-", index);
        const pushConfig = {
            endpoint: data.endpoint,
            keys: {
                auth: data.keys.auth,
                p256dh: data.keys.p256dh,
            },
        };
        web_push_1.default
            .sendNotification(pushConfig, JSON.stringify({
            title: "new post",
            content: "new post added you fool!",
        }))
            .catch((err) => {
            console.log(err, "error in notification");
        });
    });
    _res.status(201).json({ id: _req.body.id });
});
app.post("/sub", (req, res) => {
    const jsonData = (0, utils_1.readData)("./sub.json");
    jsonData.push(req.body);
    (0, utils_1.writeData)("./sub.json", jsonData);
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
