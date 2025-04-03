import express, { Request, Response } from 'express';
import { generateResume } from '../utils/openai.js';

const router = express.Router();

// POST /api/ai/resume
router.post('/resume', async (req: Request, res: Response) => {
  const { jobDescriptionString, resumeString } = req.body;

  if (!resumeString || !jobDescriptionString) {
    return res.status(400).json({ error: "Missing resume or job description" });
  }

  try {
    const enhancedResume = await generateResume(resumeString, jobDescriptionString);
    res.json({ enhancedResume });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

// // POST /api/ai/cover-letter
// router.post('/cover-letter', async (req: Request, res: Response) => {
//   const { name, role, resume, jobDescription } = req.body;

//   try {
//     const letter = await generateCoverLetter(name, role, resume, jobDescription);
//     res.json({ letter });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to generate cover letter' });
//   }
// });

export default router;