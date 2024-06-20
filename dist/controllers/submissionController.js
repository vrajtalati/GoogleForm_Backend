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
exports.search = exports.remove = exports.update = exports.read = exports.submit = exports.ping = void 0;
const submissionModel_1 = require("../models/submissionModel");
// Ping route to check server status
const ping = (req, res) => {
    res.json(true);
};
exports.ping = ping;
// Route to submit a new submission
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
// Route to read a specific submission by index
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.query.index, 10);
        const submissions = yield submissionModel_1.Submission.find();
        const totalCount = submissions.length;
        if (index >= 0 && index < totalCount) {
            const submission = submissions[index].toObject();
            const response = { submission, total_count: totalCount };
            res.json(response);
        }
        else {
            res.status(404).json({ error: 'Submission not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error reading submissions', details: error.message });
    }
});
exports.read = read;
// Route to update a specific submission by index
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.query.index, 10);
        const submissions = yield submissionModel_1.Submission.find();
        const totalCount = submissions.length;
        if (index >= 0 && index < totalCount) {
            const submissionId = submissions[index]._id;
            const updatedSubmission = yield submissionModel_1.Submission.findByIdAndUpdate(submissionId, req.body, { new: true });
            if (updatedSubmission) {
                const response = { submission: updatedSubmission, total_count: totalCount };
                res.status(200).json(Object.assign({ success: true }, response));
            }
            else {
                res.status(404).json({ error: 'Submission not found' });
            }
        }
        else {
            res.status(404).json({ error: 'Submission not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating submission', details: error.message });
    }
});
exports.update = update;
// Route to delete a specific submission by index
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.query.index, 10);
        const submissions = yield submissionModel_1.Submission.find();
        const totalCount = submissions.length;
        if (index >= 0 && index < totalCount) {
            const submissionId = submissions[index]._id;
            const deletedSubmission = yield submissionModel_1.Submission.findByIdAndDelete(submissionId);
            if (deletedSubmission) {
                const response = { submission: deletedSubmission, total_count: totalCount - 1 }; // Decrement count
                res.status(200).json(Object.assign({ success: true }, response));
            }
            else {
                res.status(404).json({ error: 'Submission not found' });
            }
        }
        else {
            res.status(404).json({ error: 'Submission not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting submission', details: error.message });
    }
});
exports.remove = remove;
// Route to search for submissions by email
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            res.status(400).json({ error: 'Email query parameter is required' });
            return;
        }
        const submissions = yield submissionModel_1.Submission.find({ email: { $regex: new RegExp(email, 'i') } });
        if (submissions.length > 0) {
            res.status(200).json({ success: true, submissions, total_count: submissions.length });
        }
        else {
            res.status(404).json({ error: 'No submissions found with the provided email' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error searching submissions', details: error.message });
    }
});
exports.search = search;
