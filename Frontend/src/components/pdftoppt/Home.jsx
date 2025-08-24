import React, { useState } from 'react';
import { FaFilePdf } from "react-icons/fa";
import config from "../../config";

const PdfToPptxConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert('Please upload a PDF file.');
      return;
    }

    setIsConverting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('File', selectedFile);

      const response = await fetch(
        `${config.BASE_URL}/convert/pdf/to/pptx?auth=${config.API_KEY}`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();

      if (result.Files && result.Files.length > 0) {
        const base64Data = result.Files[0].FileData;
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        });

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
        link.href = downloadUrl;
        link.download = `${baseName}_converted.pptx`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        setSuccessMsg("File converted and downloaded successfully!");
      } else {
        setErrorMsg("Conversion failed. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg("An error occurred during conversion.");
    }

    setIsConverting(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-6 md:px-8 md:py-6 border-blue-600 rounded-lg shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            PDF to PPTX Converter
          </h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Upload your PDF and download it as a PowerPoint presentation (.pptx)
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pptInput"
          />

          <label
            htmlFor="pptInput"
            className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-700 hover:text-white duration-300"
          >
            <FaFilePdf className="text-2xl mr-2" />
            <span className="text-lg">
              {selectedFile ? selectedFile.name : "Choose PDF File"}
            </span>
          </label>

          <button
            onClick={handleConvert}
            disabled={!selectedFile || isConverting}
            className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:pointer-events-none duration-300"
          >
            {isConverting ? "Converting..." : "Convert & Download"}
          </button>

          {successMsg && (
            <p className="mt-4 text-green-600 text-center">{successMsg}</p>
          )}
          {errorMsg && (
            <p className="mt-4 text-red-600 text-center">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfToPptxConverter;
