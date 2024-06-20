"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submissionController_1 = require("../controllers/submissionController");
const router = (0, express_1.Router)();
router.get('/ping', submissionController_1.ping);
router.post('/submit', submissionController_1.submit);
router.get('/read', submissionController_1.read);
exports.default = router;
