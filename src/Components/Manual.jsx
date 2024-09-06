import React, { useState } from 'react';
import mammoth from 'mammoth';

// Assuming the .docx file is placed in the public directory
const docxFileUrl = '/manual.docx';

const Manual = () => {
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.docx')) {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;

          // Extract the text from the DOCX file using mammoth
          const result = await mammoth.extractRawText({ arrayBuffer });
          const fullText = result.value;

          // Split the text into sections
          const parsedSections = parseSections(fullText);
          setSections(parsedSections);
          setCurrentSection(parsedSections[0]);
          setErrorMessage(null);
        } catch (error) {
          setErrorMessage('Error parsing the document.');
          console.error('Error:', error);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      setErrorMessage('Please upload a valid .docx file.');
    }
  };

  // Function to split content into sections
  const parseSections = (text) => {
    const chapterRegex = /(Chapter \d+: .+)/g;
    const rawSections = text.split(chapterRegex).filter(Boolean); // Split text by chapter titles

    const parsedSections = [];
    for (let i = 0; i < rawSections.length; i += 2) {
      parsedSections.push({
        title: rawSections[i].trim(),
        content: rawSections[i + 1]?.trim() || '',
      });
    }
    return parsedSections;
  };

  // Handle section navigation
  const handleNavigation = (sectionIndex) => {
    setCurrentSection(sections[sectionIndex]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <h1>Upload the Manual</h1>
      <input type="file" accept=".docx" onChange={handleFileUpload} />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Download Button */}
      <div style={{ margin: '20px 0' }}>
        <a href={docxFileUrl} download="manual.docx">
          <button>Download Manual</button>
        </a>
      </div>

      {/* Navigation */}
      {sections.length > 0 && (
        <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          {sections.map((section, index) => (
            <button key={index} onClick={() => handleNavigation(index)}>
              {section.title}
            </button>
          ))}
        </nav>
      )}

      {/* Current Section */}
      {currentSection && (
        <div>
          <h2>{currentSection.title}</h2>
          <p>{currentSection.content}</p>
        </div>
      )}
    </div>
  );
};

export default Manual;