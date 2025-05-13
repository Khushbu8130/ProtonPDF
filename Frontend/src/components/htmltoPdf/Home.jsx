import React, { useState } from "react";
import { FaHtml5, FaDownload } from "react-icons/fa";

const Home = () => {
  const [htmlFile, setHtmlFile] = useState(null);
  const [error, setError] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".html")) {
      setHtmlFile(file);
      setError("");
      setSuccessMsg("");
    } else {
      setError("Please upload a valid .html file.");
      setHtmlFile(null);
      setSuccessMsg("");
    }
  };

  const handleConvert = async () => {
    if (!htmlFile) {
      setError("No file selected.");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("File", htmlFile);

      const response = await fetch(
        "https://v2.convertapi.com/convert/html/to/pdf?Secret=secret_UEV86zGLRq6eufAd",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result?.Files?.[0]?.FileData) {
        const base64Data = result.Files[0].FileData;
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length)
          .fill()
          .map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        const link = document.createElement("a");
        const fileNameOnly = htmlFile.name.split(".")[0];
        link.href = URL.createObjectURL(blob);
        link.download = `${fileNameOnly}_converted.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setSuccessMsg("File converted and downloaded successfully!");
      } else {
        throw new Error("Conversion failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-6 md:px-8 md:py-6 border-blue-500 rounded-lg shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            HTML to PDF Converter
          </h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Upload an HTML file (.html) and convert it to PDF easily.
          </p>

          <input
            type="file"
            accept=".html"
            id="htmlInput"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="htmlInput"
            className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-800 hover:text-white duration-300"
          >
            <FaHtml5 className="text-2xl mr-2" />
            <span className="text-lg">
              {htmlFile ? htmlFile.name : "Choose HTML File"}
            </span>
          </label>

          <button
            onClick={handleConvert}
            disabled={!htmlFile || isConverting}
            className="mt-6 w-full py-2 bg-blue-800 hover:bg-blue-800 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:pointer-events-none duration-300 flex items-center justify-center space-x-2"
          >
            <FaDownload />
            <span>{isConverting ? "Converting..." : "Convert to PDF"}</span>
          </button>

          {successMsg && (
            <p className="mt-4 text-green-600 text-center">{successMsg}</p>
          )}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
