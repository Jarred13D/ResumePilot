import React, { useState } from 'react';
const NewResume = () => {
    const [file, setFile] = useState(null);
    const handleFileUpload = (e) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        }
        else {
            alert('Please upload a PDF file');
        }
    };
    const handleDownload = () => {
        if (file) {
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else {
            alert('No file uploaded to download.');
        }
    };
    return (<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload and Download Resume</h2>

      <div className="flex flex-col items-center">
        {/* Upload Button */}
        <input type="file" accept="application/pdf" onChange={handleFileUpload} className="file:border-gray-300 file:border file:rounded-md file:px-4 file:py-2 file:bg-blue-100 file:text-blue-700 mb-4"/>
        
        {/* File Information */}
        {file && (<div className="text-center text-gray-700 mb-4">
            <p><strong>File Name:</strong> {file.name}</p>
            <p><strong>File Size:</strong> {Math.round(file.size / 1024)} KB</p>
          </div>)}

        {/* Download Button */}
        <button onClick={handleDownload} className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200">
          Download Resume
        </button>
      </div>
    </div>);
};
export default NewResume;
