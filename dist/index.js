"use strict";
/*
Author: Kalle Liljeström
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const jsonParser = body_parser_1.default.json();
app.use(express_1.default.static('public'));
let UserList = [];
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join('public', '../index.html'));
    res.sendFile(path_1.default.join('public', '../js/main.js'));
});
app.get("/hello", function (req, res) {
    res.json({ msg: "Hello world!" });
});
app.get("/echo/:id", function (req, res) {
    res.json({ id: req.params.id });
});
app.post("/sum", jsonParser, function (req, res) {
    console.log(req.body);
    let numArray = req.body.numbers;
    let sum = 0;
    for (let i = 0; i < numArray.length; i++) {
        sum += numArray[i];
    }
    res.json({ sum: sum });
});
app.post("/users", jsonParser, function (req, res) {
    UserList.push(req.body);
    res.json({ msg: "User successfully added" });
});
app.get("/users", function (req, res) {
    res.status(201).json(UserList);
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
