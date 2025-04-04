import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
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
  CssBaseline
} from '@mui/material';
import AppAppBar from './Marketing-Page/components/AppAppBar';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
  
const ResumeDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate('/sign-in');
    }
  }
  , []);

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [education, setEducation] = useState('');
  const [degree, setDegree] = useState('');
  const [skills, setSkills] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [aiSuggestions, _setAiSuggestions] = useState<string[]>([]);
  const [coverLetter, _setCoverLetter] = useState('');

  const generateResume = () => {
    const resumeString = `
      Resume for: ${name}

      Professional Summary:
      ${summary}

      Job Title: ${jobTitle}
      Company: ${company}
      Responsibilities:
      ${description}

      Education:
      ${education} - ${degree}

      Skills:
      ${skills}

    `;

    const jobDescriptionString = `
    ${jobDescription}`;

    console.log(resumeString); 
    console.log(jobDescriptionString)
  };

  return (
    <AppTheme>
    <AppAppBar />
    <CssBaseline enableColorScheme/>
    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
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

      <Button variant="contained" color="success" sx={{ my: 2 }}
      onClick={generateResume} >
        Enhance My Resume
      </Button>

      {aiSuggestions.length > 0 && (
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
    </AppTheme>
  );
};

export default ResumeDashboard;