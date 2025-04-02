import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
});

// Generate a resume based on a job description
export async function generateResume(resumeString: string, jobDescriptionString: string): Promise<string> {
  const prompt = `You are a professional resume writer. Rewrite the following resume: "${resumeString}" to better match the job description.\n\nJob description: "${jobDescriptionString}"`;
  
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 150,
    });
  
    return completion.choices[0].message.content?.trim() ?? '';
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
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });
  
    return completion.choices[0].message.content?.trim() ?? '';
  };
