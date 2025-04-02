import { useState } from 'react';

const ResumeEnhancer = () => {
  // State for holding resume information
  const [resume, setResume] = useState({
    name: '',
    contactInfo: '',
    skills: '',
    experience: '',
    education: '',
    certifications: '',
    projects: '',
  });

  const [chatGptInput, setChatGptInput] = useState('');
  const [enhancedResume, setEnhancedResume] = useState('');

  // Function to handle changes to resume fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResume((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  // Function to handle the submission of resume enhancement request to ChatGPT
  const handleEnhanceResume = async () => {
    // Assuming you have an API key for OpenAI and a server-side function to handle the API request
    const response = await fetch('/api/enhance-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData: resume,
        chatGptInput,
      }),
    });

    const data = await response.json();
    setEnhancedResume(data.enhancedResume);
  };

  return (
    <div className="resume-enhancer">
      <h1>Resume Enhancer</h1>

      <div className="resume-inputs">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={resume.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact Info:
          <input
            type="text"
            name="contactInfo"
            value={resume.contactInfo}
            onChange={handleChange}
          />
        </label>
        <label>
          Skills:
          <textarea
            name="skills"
            value={resume.skills}
            onChange={handleChange}
          />
        </label>
        <label>
          Experience:
          <textarea
            name="experience"
            value={resume.experience}
            onChange={handleChange}
          />
        </label>
        <label>
          Education:
          <textarea
            name="education"
            value={resume.education}
            onChange={handleChange}
          />
        </label>
        <label>
          Certifications:
          <textarea
            name="certifications"
            value={resume.certifications}
            onChange={handleChange}
          />
        </label>
        <label>
          Projects:
          <textarea
            name="projects"
            value={resume.projects}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="chat-gpt-enhancement">
        <label>
          Ask ChatGPT to enhance your Resume:
          <textarea
            value={chatGptInput}
            onChange={(e) => setChatGptInput(e.target.value)}
            placeholder="For example: 'Improve my experience section' or 'Suggest more impactful skills to add.'"
          />
        </label>
        <button onClick={handleEnhanceResume}>Enhance Resume</button>
      </div>

      {enhancedResume && (
        <div className="enhanced-resume">
          <h2>Enhanced Resume</h2>
          <pre>{enhancedResume}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeEnhancer;


