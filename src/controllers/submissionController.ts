import { Request, Response } from 'express';
import { Submission } from '../models/submissionModel';



export const ping = (req: Request, res: Response) => {
  res.json(true);
};

export const submit = async (req: Request, res: Response) => {
  try {
    const newSubmission = new Submission(req.body);
    const savedSubmission = await newSubmission.save();
    res.status(200).json({ success: true, submission: savedSubmission });
  } catch (error) {
    res.status(400).json({ error: 'Error saving submission', details: error });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const index = parseInt(req.query.index as string, 10);
    const submissions = await Submission.find();
    const totalCount = submissions.length;

    if (index >= 0 && index < totalCount) {
      const submission = submissions[index].toObject();
      const response = { submission, total_count: totalCount };
      res.json(response);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: 'Error reading submissions', details: error.message });
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    const index = parseInt(req.query.index as string, 10);
    const submissions = await Submission.find();
    const totalCount = submissions.length;

    if (index >= 0 && index < totalCount) {
      const submissionId = submissions[index]._id;
      const updatedSubmission = await Submission.findByIdAndUpdate(submissionId, req.body, { new: true });
      if (updatedSubmission) {
        const response = { submission: updatedSubmission, total_count: totalCount };
        res.status(200).json({ success: true, ...response });
      } else {
        res.status(404).json({ error: 'Submission not found' });
      }
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Error updating submission', details: error.message });
  }
};


export const remove = async (req: Request, res: Response) => {
  try {
    const index = parseInt(req.query.index as string, 10);
    const submissions = await Submission.find();
    const totalCount = submissions.length;

    if (index >= 0 && index < totalCount) {
      const submissionId = submissions[index]._id;
      const deletedSubmission = await Submission.findByIdAndDelete(submissionId);
      if (deletedSubmission) {
        const response = { submission: deletedSubmission, total_count: totalCount - 1 }; // Decrement count
        res.status(200).json({ success: true, ...response });
      } else {
        res.status(404).json({ error: 'Submission not found' });
      }
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Error deleting submission', details: error.message });
  }
};
