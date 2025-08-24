import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import config from "../../config";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertMessage, setConvertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setConvertMessage("");
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please upload a valid .pdf file");
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setErrorMessage("Please upload a file");
      return;
    }

    setIsConverting(true);
    setErrorMessage("");
    setConvertMessage("");

    try {
      const formData = new FormData();
      formData.append("File", selectedFile);

      const response = await fetch(
        `${config.BASE_URL}/pdf/to/xlsx?auth=${config.API_KEY}`,
        {
          method: "POST",
          body: formData,
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
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const baseName = selectedFile.name.replace(/\.[^/.]+$/, "");
        link.href = downloadUrl;
        link.download = `${baseName}_converted.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        setConvertMessage("File Converted Successfully");
      } else {
        setErrorMessage("Conversion failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred during conversion.");
    }

    setIsConverting(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Convert PDF to Excel Online
          </h1>
          <p className="text-sm text-center mb-5">
            Easily convert PDF files to Excel format (.xlsx) online, without
            installing any software.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="FileInput"
            />
            <label
              htmlFor="FileInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFileAlt className="text-3xl mr-3" />
              <span className="text-2xl mr-2">
                {selectedFile ? selectedFile.name : "Choose PDF File"}
              </span>
            </label>

            <button
              onClick={handleConvert}
              disabled={isConverting || !selectedFile}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              {isConverting ? "Converting..." : "Convert File"}
            </button>

            {convertMessage && (
              <div className="text-green-500 text-center">{convertMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
