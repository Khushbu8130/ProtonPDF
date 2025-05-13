import React, { useState } from 'react';
import { FaFilePdf } from "react-icons/fa";

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
    formData.append('File', pdfFile);

    try {
      const response = await fetch(
        'https://v2.convertapi.com/convert/pdf/to/jpg?Secret=secret_UEV86zGLRq6eufAd',
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (result.Files && result.Files.length > 0) {
        for (let i = 0; i < result.Files.length; i++) {
          const base64Data = result.Files[i].FileData;
          const byteCharacters = atob(base64Data);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let j = 0; j < slice.length; j++) {
              byteNumbers[j] = slice.charCodeAt(j);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }

          const blob = new Blob(byteArrays, { type: 'image/jpeg' });
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const baseName = pdfFile.name.replace(/\.[^/.]+$/, '');
          link.href = downloadUrl;
          link.download = `${baseName}_converted_${i + 1}.jpg`;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }

        setSuccessMsg("File(s) converted and downloaded successfully!");
      } else {
        throw new Error("No converted files returned. Please try again.");
      }
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
            PDF to JPG Converter
          </h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Upload your PDF and download it as image file(s) (.jpg)
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
