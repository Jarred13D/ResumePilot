import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import fs from 'fs';
import PDFDocument from 'pdfkit';

const app = express();
const port = 3000;

// Configure OpenAI
const openai = new OpenAI({ apiKey: 'your-openai-api-key' });

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// PDF upload and processing endpoint
app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);

    // Extract text from PDF
    const data = await pdfParse(dataBuffer);
    const pdfText = data.text;

    // Send extracted text to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an AI assistant.' },
        { role: 'user', content: `Analyze the following text:\n\n${pdfText}` }
      ]
    });

    const openAiResponse = completion.choices[0].message.content;

    // Write OpenAI response to a new PDF
    const outputPath = 'outputs/generated.pdf';
    const doc = new PDFDocument();
    fs.mkdirSync('outputs', { recursive: true });
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);
    doc.fontSize(12).text(openAiResponse);
    doc.end();

    writeStream.on('finish', () => {
      res.json({ message: 'PDF created successfully', outputPath });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});