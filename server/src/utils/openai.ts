// Removed unused imports
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate a resume based on a job description
export async function generateResume(
  resumeString: string,
  jobDescriptionString: string
): Promise<string> {
  const prompt = `You are a professional resume writer. Rewrite the resume below to better align with the job description.

---

**Your Objective:**
Tailor the resume to this job description by rewriting the **Professional Experience** section to highlight:
- Key skills and phrases from the job description
- Measurable achievements
- Strong action verbs
- Impact-driven results
- Remove any bullet points that don’t add value

---

**Formatting Rules (Markdown):**
- Start with the applicant's name in **bold**
- Use the following sections with bold headers:
  - **Professional Summary**
  - **Skills**
  - **Education**
  - **Professional Experience**
- In **Professional Experience**:
  - Bold job titles
  - Italicize company names
  - Include a short, inferred company description if not provided
  - Use markdown list syntax for bullet points:
  - use - for bullets (e.g., "Managed incident response…")
  - Reword all bullets to match the job description and use action verbs
- Use GitHub-Flavored Markdown

---

**Resume:**

${resumeString}

---

**Job Description:**

${jobDescriptionString}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000,
    });

    return completion.choices[0].message.content?.trim() ?? "";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

// Generate a cover letter for a job application
// This function takes in the name of the applicant, the role they are applying for, their resume, and the job description
export async function generateCoverLetter(
  name: string,
  role: string,
  resume: string,
  jobDescription: string
): Promise<string> {
  const prompt = `Write a professional cover letter for ${name} applying for the role of ${role}. Use the following resume details and job description:\n\nResume:\n${resume}\n\nJob Description:\n${jobDescription}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0].message.content?.trim() ?? "";
}
