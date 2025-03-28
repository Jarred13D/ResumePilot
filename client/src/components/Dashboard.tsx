import React, { useState } from "react";

const ResumeBuilder: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    jobTitle: "",
    companyName: "",
    responsibilities: "",
    schoolName: "",
    fieldOfStudy: "",
    skills: "",
    jobDescription: "",
    coverLetter: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resumepilot Mockup</h1>
      <nav className="mb-4">
        <a href="#" className="text-blue-500 mr-4">Dashboard</a>
        <a href="#" className="text-red-500">Logout</a>
      </nav>

      <section className="mb-6">
        <h2 className="text-xl font-bold">My Resumes</h2>
        <button className="bg-blue-500 text-white px-2 py-1 mb-2">+ New Resume</button>
        <ul>
          <li>Resume #1 
            <button className="border px-2">Edit</button> 
            <button className="border px-2">Delete</button>
            <button className="border px-2">Upload</button>
            <button className="border px-2">Upload</button>
          </li>
          <li>Resume #2 
            <button className="border px-2">Edit</button> 
            <button className="border px-2">Delete</button>
            <button className="border px-2">Upload</button>
            <button className="border px-2">Upload</button>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold">Resume Builder</h2>
        <form className="space-y-2">
          <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="summary" placeholder="Write a brief summary..." value={formData.summary} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="border p-2 w-full" />
          <textarea name="responsibilities" placeholder="Description / Responsibilities" value={formData.responsibilities} onChange={handleChange} className="border p-2 w-full"></textarea>
          <input type="text" name="schoolName" placeholder="School Name" value={formData.schoolName} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="fieldOfStudy" placeholder="Degree / Field of Study" value={formData.fieldOfStudy} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="skills" placeholder="Comma-separated skills" value={formData.skills} onChange={handleChange} className="border p-2 w-full" />
        </form>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold">AI Resume Enhancer</h2>
        <textarea name="jobDescription" placeholder="Paste the job description here..." value={formData.jobDescription} onChange={handleChange} className="border p-2 w-full"></textarea>
        <button className="bg-blue-500 text-white px-4 py-2">Enhance My Resume</button>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold">AI Suggestions</h2>
        <ul className="list-disc pl-5">
          <li>Rewritten bullet: "Increased ticket response time by 40%..."</li>
          <li>Suggested skill: "Cross-functional communication"</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">AI-Generated Cover Letter</h2>
        <textarea name="coverLetter" placeholder="Generated cover letter will appear here..." value={formData.coverLetter} onChange={handleChange} className="border p-2 w-full"></textarea>
        <div className="mt-2">
          <button className="bg-blue-500 text-white px-4 py-2 mr-2">Generate Cover Letter</button>
          <button className="border px-4 py-2 mr-2">Preview PDF</button>
          <button className="border px-4 py-2">Download PDF</button>
        </div>
      </section>
    </div>
  );
};

export default ResumeBuilder;
