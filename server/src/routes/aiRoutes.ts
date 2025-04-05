import express, { Request, Response } from 'express';
import { generateResume } from '../utils/openai.js';

const router = express.Router();

// POST /api/ai/resume
router.post('/resume', async (req: Request, res: Response) => {
  const { resumeString, jobDescription } = req.body;

  try {
    const resume = await generateResume(resumeString, jobDescription);
    res.json({ resume });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate resume" });
  }
  // future implementation of the resume generation
  // try {
  //   const enhancedResume = await generateResume(resumeString, jobDescription);
  //   res.json({ enhancedResume });
  // } catch (err) {
  //   res.status(500).json({ error: 'Failed to generate resume' });
  // }
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