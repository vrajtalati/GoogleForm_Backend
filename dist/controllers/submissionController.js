"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = exports.submit = exports.ping = void 0;
const submissionModel_1 = require("../models/submissionModel");
const ping = (req, res) => {
    res.json(true);
};
exports.ping = ping;
const submit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubmission = new submissionModel_1.Submission(req.body);
        const savedSubmission = yield newSubmission.save();
        res.status(200).json({ success: true, submission: savedSubmission });
    }
    catch (error) {
        res.status(400).json({ error: 'Error saving submission', details: error });
    }
});
exports.submit = submit;
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.query.index, 10);
        const submissions = yield submissionModel_1.Submission.find();
        if (index >= 0 && index < submissions.length) {
            res.json(submissions[index]);
        }
        else {
            res.status(404).json({ error: 'Submission not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error reading submissions', details: error });
    }
});
exports.read = read;
