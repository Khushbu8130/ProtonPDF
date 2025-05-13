import React, { useState } from "react";
import axios from "axios";
import { FaFileWord } from "react-icons/fa";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setError("Please upload a .docx file.");
      return;
    }

    if (selectedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setError("Only .docx files are allowed.");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a .docx file first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("StoreFile", "false");

    try {
      const response = await axios.post(
        "https://v2.convertapi.com/convert/docx/to/pdf?Secret=secret_UEV86zGLRq6eufAd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const base64Data = response.data.Files[0].FileData;
      const originalName = file.name.replace(/\.[^/.]+$/, "");
      const newFilename = `${originalName}_converted.pdf`;

      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${base64Data}`;
      link.download = newFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Conversion failed", error);
      alert("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Convert Word to PDF
          </h1>
          <p className="text-sm text-center mb-5">
            Upload your .docx file and get a converted PDF file instantly.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
              id="WordInput"
            />
            <label
              htmlFor="WordInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFileWord className="text-3xl mr-3" />
              <span className="text-2xl mr-2">
                {file ? file.name : "Choose Word File"}
              </span>
            </label>

            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            <button
              onClick={handleConvert}
              disabled={loading || !file}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              {loading ? "Converting..." : "Convert to PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
