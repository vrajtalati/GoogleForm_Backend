"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const submissionRoutes_1 = __importDefault(require("./routes/submissionRoutes"));
const db_1 = __importDefault(require("./services/db"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
(0, db_1.default)();
app.use('/', submissionRoutes_1.default);
exports.default = app;
