// import express from 'express';
// import type { Request, Response } from 'express';
// import { ResumeData } from '../../models/resumeData.ts';

// const router = express.Router();


// // GET /resume - Get all resume info
// router.get('/', async (_req: Request, res: Response) => {
//     try {
//       const resumeInfo = await ResumeData.findAll({
//         attributes: { exclude: ['password'] }
//       });
//       res.json(resumeInfo);
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// // GET /resume/:id - Get resume info by id
// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//       const resumeInfo = await ResumeData.findByPk(id);
//       if (resumeInfo) {
//         res.json(resumeInfo);
//       } else {
//         res.status(404).json({ message: 'Resume info not found' });
//       }
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// // POST /resume - Create a new resume
// router.post('/', async (req: Request, res: Response) => {
//     const { // resume input data } = req.body;
//     try {
//       const newResume = await ResumeData.create({ //.add info here });
//       res.status(201).json(newResume);
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   });

//   // PUT /resume/:id - Update a user by id
// router.put('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const {//add info here// } = req.body;
//     try {
//       const resumeInfo = await ResumeData.findByPk(id);
//       if (resumeInfo) {
//         resumeInfo.//add info here = add info here;
//         resumeInfo.//add info here = add info here;
//         await resumeInfo.save();
//         res.json(resumeInfo);
//       } else {
//         res.status(404).json({ message: 'Resume info not found' });
//       }
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   });

  
//   export { router as resumeRouter };