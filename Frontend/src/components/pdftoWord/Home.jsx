import React, { useState } from 'react';
import { FaFilePdf } from "react-icons/fa";
import config from "../../config";

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const convertAndDownload = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file.');
      return;
    }

    setIsConverting(true);
    setSuccessMsg('');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      const response = await fetch(
        `${config.BASE_URL}/convert/pdf/to/docx?Secret=${config.API_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (!result || !result.Files || result.Files.length === 0) {
        throw new Error("No converted files returned. Please try again.");
      }

      const { FileData, FileName } = result.Files[0];

      const byteCharacters = atob(FileData);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = FileName || 'converted.docx';
      link.click();

      setSuccessMsg("File converted and downloaded successfully!");

    } catch (error) {
      console.error('Conversion failed:', error);
      setErrorMsg("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-6 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-indigo-700">
            PDF to DOCX Converter
          </h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Upload your PDF and download it as a Word document (.docx)
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdfInput"
          />

          <label
            htmlFor="pdfInput"
            className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-600 hover:text-white duration-300"
          >
            <FaFilePdf className="text-2xl mr-2" />
            <span className="text-lg">
              {pdfFile ? pdfFile.name : "Choose PDF File"}
            </span>
          </label>

          <button
            onClick={convertAndDownload}
            disabled={!pdfFile || isConverting}
            className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:pointer-events-none duration-300"
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

export default Home;
