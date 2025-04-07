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
import AppAppBar from './Home-Page/components/NavBar';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import { marked } from 'marked';
  
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
  const [enhancedResume, setEnhancedResume] = useState<string>('');
  const [coverLetter, _setCoverLetter] = useState('');

  const generateResume = async () => {
    const resumeString = `
      ## ${name}

### **Professional Summary**
${summary}

### **Skills**
${skills}

### **Education**
**${degree}** | ${education}  

### **Professional Experience**
**${jobTitle}**  
${company}  
${description}
    `;
  
    const jobDescriptionString = jobDescription;
  
    try {
      const response = await fetch('/api/ai/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeString,
          jobDescription: jobDescriptionString,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate enhanced resume');
      }
  
      const data = await response.json();
      setEnhancedResume(data.resume);
    } catch (error) {
      console.error('Error enhancing resume:', error);
      alert('There was an error enhancing your resume. Please try again.');
    }
  };
  const downloadPdf = () => {
    if (!enhancedResume) return;
  
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxLineWidth = pageWidth - margin * 2;
  
    let y = margin;
    doc.setFont('helvetica');

    const tokens = marked.lexer(enhancedResume);

    const addLine = (text: string) => {
      const segments = text.split(/(\*\*.*?\*\*)/); // Split by bold segments
      const lines: string[] = [];
    
      segments.forEach(segment => {
        if (!segment) return;
    
        if (/^\*\*(.*?)\*\*$/.test(segment)) {
          const boldText = segment.replace(/\*\*/g, '');
          doc.setFont('helvetica', 'bold');
          const wrapped = doc.splitTextToSize(boldText, maxLineWidth);
          lines.push(...wrapped);
        } else {
          doc.setFont('helvetica', 'normal');
          const wrapped = doc.splitTextToSize(segment, maxLineWidth);
          lines.push(...wrapped);
        }
      });

      for (const line of lines) {
        if (y > pageHeight - margin) return false;
        doc.text(line, margin, y);
        y += 7;
      }
      return true;
    };
  
    for (const token of tokens) {
      if (y > pageHeight - margin) break;
  
      switch (token.type) {
        case 'heading':
          doc.setFontSize(token.depth === 1 ? 18 : token.depth === 2 ? 16 : 14);
          addLine(token.text);
          y += 3;
          break;
  
        case 'paragraph':
          doc.setFontSize(12);
          addLine(token.text);
          y += 2;
          break;
  
        case 'list':
          doc.setFontSize(12);
          for (const item of token.items) {
            if (!addLine(`• ${item.text}`)) break;
          }
          y += 2;
          break;
  
        case 'text':
          doc.setFontSize(12);
          addLine(token.text);
          break;
  
        default:
          break;
      }
  
      if (y > pageHeight - margin) {
        break;
      }
    }
  
    doc.save('enhanced_resume.pdf');
  };

  return (
    <AppTheme>
    <AppAppBar />
    <CssBaseline enableColorScheme/>
    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
    <section id="dashboard">
    <Container maxWidth="lg" sx={{ mt: 4, color: 'text.primary' }}>
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

  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={4}
    alignItems="flex-start"
  >
    {/* LEFT: FORM */}
    <Box sx={{ flex: 1, minWidth: '300px' }}>
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

      <Button variant="contained" color="success" sx={{ my: 2 }} onClick={generateResume}>
        Enhance My Resume
      </Button>
    </Box>

    {/* RIGHT: AI-ENHANCED RESUME */}
    {enhancedResume && (
      <Box sx={{ flex: 1, minWidth: '300px' }}>
        <Typography variant="h6" gutterBottom color="primary">
          Enhanced Resume
        </Typography>
        <Box id="resume-preview"
        sx={{
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          maxHeight: '800px', 
          overflowY: 'auto',
          lineHeight: 1.5,
          whitespace: 'pre-wrap',
        }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {enhancedResume}
          </ReactMarkdown>
        </Box>
        <Box mt={3}>
    <Button variant="outlined" color="primary">Preview PDF</Button>
    <Button variant="contained" sx={{ ml: 2, backgroundColor: 'primary.dark' }} onClick={downloadPdf}>
      Download PDF
    </Button>
  </Box>
      </Box>
      
    )}
  </Stack>

  {/* COVER LETTER SECTION */}
  <Divider sx={{ my: 4 }} />
  <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
    AI-Generated Cover Letter
  </Typography>

  <TextField
    multiline
    rows={8}
    value={coverLetter}
    placeholder="Generated cover letter will appear here..."
    fullWidth
    InputProps={{ readOnly: true }}
  />
  <Button variant="contained" sx={{ backgroundColor: 'primary.main', mb: 2 }} >
    Generate Cover Letter
  </Button>
</Container>
    </section>
    </AppTheme>
  );
};

export default ResumeDashboard;