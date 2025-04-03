import { useState, useMemo } from "react";
import { Stack, TextField, Button } from "@mui/material";

function ResumeBuilder() {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [education, setEducation] = useState("");
  const [degree, setDegree] = useState("");
  const [skills, setSkills] = useState("");

  // Dynamically generate resume string
  const resumeString = useMemo(() => `
    Name: ${name}
    Professional Summary: ${summary}
    
    Experience:
    Job Title: ${jobTitle}
    Company Name: ${company}
    Description / Responsibilities:
    ${description}

    Education:
    School Name: ${education}
    Degree / Field of Study: ${degree}

    Skills:
    ${skills}
  `, [name, summary, jobTitle, company, description, education, degree, skills]);

  const jobDescription

  return (
    <div>
      <Stack spacing={2}>
        <TextField label="Your full name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Professional Summary" multiline rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} fullWidth />
        <TextField label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} fullWidth />
        <TextField label="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} fullWidth />
        <TextField label="Description / Responsibilities" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <TextField label="School Name" value={education} onChange={(e) => setEducation(e.target.value)} fullWidth />
        <TextField label="Degree / Field of Study" value={degree} onChange={(e) => setDegree(e.target.value)} fullWidth />
        <TextField label="Skills (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} fullWidth />
      </Stack>

      {/* Button to log or display the resume */}
      <Button variant="contained" color="primary" onClick={() => console.log(resumeString)}>
        Generate Resume
      </Button>

<TextField
        label="Paste job description here"
        multiline
        rows={4}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        fullWidth
      />
      
      {/* Optionally display resume text on screen */}
      <pre>{resumeString}</pre>
    </div>
  );
}

export default ResumeBuilder;