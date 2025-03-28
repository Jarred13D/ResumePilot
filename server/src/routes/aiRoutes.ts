import express, { Request, Response } from 'express';
import { generateResume, generateCoverLetter } from '../utils/openai';

const router = express.Router();

// POST /api/ai/enhance
router.post('/resume', async (req: Request, res: Response) => {
  const { jobDescription } = req.body;

  try {
    const resume = await generateResume(jobDescription);
    res.json({ resume });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

// POST /api/ai/cover-letter
router.post('/cover-letter', async (req: Request, res: Response) => {
  const { name, role, resume, jobDescription } = req.body;

  try {
    const letter = await generateCoverLetter(name, role, resume, jobDescription);
    res.json({ letter });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate cover letter' });
  }
});

export default router;