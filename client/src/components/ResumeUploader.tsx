import upload from './server/src/middleware/resumeUpload';
import React, { useState } from 'react';

const ResumeUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file");
            return;
        }
        try {
          const response = await upload(file);
          setMessage(response.message);
        } catch (error) {
            setMessage("Error uploading file");
        }
    };
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResumeUploader;