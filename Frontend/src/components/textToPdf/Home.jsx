import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FaFileAlt } from "react-icons/fa";

function Home() {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("converted");
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      setFileName(file.name.replace(".txt", ""));
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        setConvert("");
        setDownloadError("");
      };
      reader.readAsText(file, "UTF-8");
    } else {
      setFileContent("");
      setDownloadError("Please upload a valid .txt file");
    }
  };

  const generatePDF = () => {
    if (!fileContent) {
      setDownloadError("No file content to convert");
      return;
    }

    const doc = new jsPDF();
    const lines = doc.splitTextToSize(fileContent, 180);
    doc.text(lines, 10, 10);
    doc.save(`${fileName}_converted.pdf`);
    setConvert("File Converted Successfully");
    setDownloadError("");
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Convert .txt to PDF Online
          </h1>
          <p className="text-sm text-center mb-5">
            Easily convert text (.txt) files to PDF format online, without
            installing any software.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
              id="FileInput"
            />
            <label
              htmlFor="FileInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFileAlt className="text-3xl mr-3" />
              <span className="text-2xl mr-2 ">
                {fileName ? fileName + ".txt" : "Choose File"}
              </span>
            </label>

            {fileContent && (
              <textarea
                readOnly
                value={fileContent}
                rows="8"
                className="w-full p-3 border rounded-lg resize-none shadow-sm"
              ></textarea>
            )}

            <button
              onClick={generatePDF}
              disabled={!fileContent}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              Convert File
            </button>

            {convert && (
              <div className="text-green-500 text-center">{convert}</div>
            )}
            {downloadError && (
              <div className="text-red-500 text-center">{downloadError}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
