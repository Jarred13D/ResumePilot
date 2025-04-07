import React, { useState } from 'react';
import axios from 'axios';

const ResumeUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [_evaluatedText, setEvaluatedText] = useState("");
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleUpload = async () => {
        if (!file) return;
            const formData = new FormData();
            formData.append('resume', file); 
        
        try {
          const response = await axios.post(upload(file), formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setEvaluatedText(response.data.evaluated);
        } catch (error) {
            setMessage("Error uploading file");
        }
    };
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Your Resume</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResumeUploader;

function upload(_file: File): string {
    throw new Error('Function not implemented.');
}
