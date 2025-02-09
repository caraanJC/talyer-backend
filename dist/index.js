"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello World'
    });
});
app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
