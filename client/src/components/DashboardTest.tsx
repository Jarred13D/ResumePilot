import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  CircularProgress, // added import
  Alert, // added import
} from '@mui/material';

const ResumeDashboard: React.FC = () => {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [education, setEducation] = useState('');
  const [degree, setDegree] = useState('');
  const [skills, setSkills] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [coverLetter] = useState('');
  // const [coverLetter, setCoverLetter] = useState('');

  // added state for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResume = async () => {
    // reset states
    setError(null);
    setIsLoading(true);
    setAiSuggestions([]);

  //   const resumeString = `
  //     Resume for: ${name}

  //     Professional Summary:
  //     ${summary}

  //     Job Title: ${jobTitle}
  //     Company: ${company}
  //     Responsibilities:
  //     ${description}

  //     Education:
  //     ${education} - ${degree}

  //     Skills:
  //     ${skills}
  //   `;

  //   const jobDescriptionString = `
  //   ${jobDescription}`;

  //   console.log(resumeString);
  //   console.log(jobDescriptionString)
  // };
  
    // Create resume data object
    const resumeData = {
      name,
      summary,
      jobTitle,
      company,
      description,
      education,
      degree,
      skills
    };

    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          jobDescription
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume suggestions');
      }

      const data = await response.json();
      
      if (data.success && data.suggestions) {
        setAiSuggestions(Array.isArray(data.suggestions) 
          ? data.suggestions 
          : [data.suggestions]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="dashboard">
    <Container maxWidth="md" sx={{ mt: 4, color: 'text.primary' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        My Resumes
      </Typography>

      <Button variant="contained" sx={{ backgroundColor: 'primary.main', mb: 2 }}>
        + New Resume
      </Button>

      <List>
        <ListItem>
          <ListItemText primary="Resume #1" />
          <Button color="primary">Edit</Button>
          <Button color="error">Delete</Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Resume #2" />
          <Button color="primary">Edit</Button>
          <Button color="error">Delete</Button>
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
        Resume Builder
      </Typography>

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

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
        AI Resume Enhancer
      </Typography>

      <TextField
        label="Paste job description here"
        multiline
        rows={4}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        fullWidth
      />

        {/* Error display */}
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="success"
          sx={{ my: 2 }}
          onClick={generateResume}
          disabled={isLoading || !jobDescription.trim}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
              Generating Suggestions...
            </>
          ) : (
            'Enhance My Resume'
          )}
        </Button> 

        {/* AI Suggestions section with loading state */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : aiSuggestions.length > 0 && (
          <Box>
            <Typography variant="h6" color="primary">AI Suggestions</Typography>
            <List>
              {aiSuggestions.map((suggestion, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`• ${suggestion}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

      {/* {aiSuggestions.length > 0 && (
        <Box>
          <Typography variant="h6" color="primary">AI Suggestions</Typography>
          <List>
            {aiSuggestions.map((suggestion, index) => (
              <ListItem key={index}>
                <ListItemText primary={`• ${suggestion}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )} */}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
        AI-Generated Cover Letter
      </Typography>

      <Button variant="contained" sx={{ backgroundColor: 'primary.main', mb: 2 }}>
        Generate Cover Letter
      </Button>

      <TextField
        multiline
        rows={8}
        value={coverLetter}
        placeholder="Generated cover letter will appear here..."
        fullWidth
        InputProps={{ readOnly: true }}
      />

      <Box mt={3}>
        <Button variant="outlined" color="primary">Preview PDF</Button>
        <Button variant="contained" sx={{ ml: 2, backgroundColor: 'primary.dark' }}>
          Download PDF
        </Button>
      </Box>
    </Container>
    </section>
  );
};

export default ResumeDashboard;