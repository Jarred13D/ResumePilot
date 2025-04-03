// server/routes/resume.routes.ts
import express from "express";
import { generateResume } from "../utils/openai";

const router = express.Router();

router.post("/api/generate-resume", async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    // Format the resume data into a string
    const resumeString = `
      Resume for: ${resumeData.name}

      Professional Summary:
      ${resumeData.summary}

      Job Title: ${resumeData.jobTitle}
      Company: ${resumeData.company}
      Responsibilities:
      ${resumeData.description}

      Education:
      ${resumeData.education} - ${resumeData.degree}

      Skills:
      ${resumeData.skills}
    `;

    // Call your OpenAI utility function
    const enhancedResume = await generateResume(resumeString, jobDescription);

    // Send back the enhanced resume
    res.json({
      success: true,
      suggestions: [enhancedResume], // or parse the response into multiple suggestions
    });
  } catch (error) {
    console.error("Error in generate-resume endpoint:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate resume",
    });
  }
});

export default router;
