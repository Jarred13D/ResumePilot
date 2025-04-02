import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
});

// Generate a resume based on a job description
export async function generateResume(jobDescription: string): Promise<string> {
    const prompt = `You are a professional resume writer. Rewrite the following resume to better match the job description.\n\nJob description: "${jobDescription}"`;
  
    try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 150,
    });
  
    return completion.choices[0].message.content?.trim() ?? '';
  } catch (error) {
    console.error('OpenAI API error:', error);
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
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });
  
    return completion.choices[0].message.content?.trim() ?? '';
  };
