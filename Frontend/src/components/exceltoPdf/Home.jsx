import React, { useState } from "react";
import { FaFileExcel, FaDownload } from "react-icons/fa";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("converted");
  const [isConverting, setIsConverting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validExtensions = ["xls", "xlsx", "csv"];
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      setStatusMessage("❌ Only .xls, .xlsx or .csv files are supported.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    setStatusMessage("");
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setStatusMessage("❌ Please upload a valid file.");
      return;
    }

    const fileExt = selectedFile.name.split(".").pop().toLowerCase();
    const fromFormat = fileExt === "csv" ? "csv" : "xls";

    setIsConverting(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("File", selectedFile);

      const response = await fetch(
        `https://v2.convertapi.com/convert/${fromFormat}/to/pdf?Secret=secret_UEV86zGLRq6eufAd`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data?.Files?.[0]?.FileData) {
        throw new Error("Conversion failed.");
      }

      const base64Data = data.Files[0].FileData;
      const byteCharacters = atob(base64Data);
      const byteArray = new Uint8Array([...byteCharacters].map((c) => c.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}_converted.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatusMessage("✅ File converted and downloaded successfully!");
    } catch (err) {
      console.error(err);
      setStatusMessage("❌ Conversion failed. Please try again.");
    }

    setIsConverting(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-6 md:px-8 md:py-6 border-blue-500 rounded-lg shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            Excel/CSV to PDF Converter
          </h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Upload an Excel or CSV file (.xls, .xlsx, .csv) and convert it to PDF easily.
          </p>

          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            id="excelInput"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="excelInput"
            className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-800 hover:text-white duration-300"
          >
            <FaFileExcel className="text-2xl mr-2" />
            <span className="text-lg">
              {selectedFile ? selectedFile.name : "Choose Excel/CSV File"}
            </span>
          </label>

          <button
            onClick={handleConvert}
            disabled={!selectedFile || isConverting}
            className="mt-6 w-full py-2 bg-blue-800 hover:bg-blue-800 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:pointer-events-none duration-300 flex items-center justify-center space-x-2"
          >
            <FaDownload />
            <span>{isConverting ? "Converting..." : "Convert to PDF"}</span>
          </button>

          {statusMessage && (
            <p className="mt-4 text-center text-sm text-blue-600">{statusMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
