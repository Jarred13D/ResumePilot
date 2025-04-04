// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import auth from '../utils/auth';
// import { jsPDF } from 'jspdf';

// const CoverLetterGenerator = () => {
//   const [coverLetter, setCoverLetter] = useState('');

//   // Generate the cover letter (you can replace this with an actual API call)
//   const generateCoverLetter = () => {
//     setCoverLetter(`
//       Dear Hiring Manager,

//       I am writing to express my interest in the position at your company. With my background in software development and passion for technology, I am confident I would be an excellent fit for your team.

//       I look forward to the opportunity to discuss my application further.

//       Sincerely,
//       [Your Name]
//     `);
//   };

//   // Download the cover letter as a PDF
//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text(coverLetter, 10, 10); // Text from textarea is added to PDF
//     doc.save('cover-letter.pdf');
//   };

//   return (
//     <section className="mt-6">
//       <h2 className="text-xl font-semibold">AI-Generated Cover Letter</h2>
//       <textarea
//         placeholder="Generated cover letter will appear here..."
//         className="border p-2 w-full mt-2"
//         value={coverLetter}
//         onChange={(e) => setCoverLetter(e.target.value)}
//       ></textarea>
//       <div className="mt-2">
//         <button
//           className="bg-blue-500 text-white px-3 py-1"
//           onClick={generateCoverLetter}
//         >
//           Generate Cover Letter
//         </button>
//         <button
//           className="bg-green-500 text-white px-3 py-1 ml-2"
//           onClick={downloadPDF}
//         >
//           Download PDF
//         </button>
//       </div>
//     </section>
//   );
// };

// export default CoverLetterGenerator;
