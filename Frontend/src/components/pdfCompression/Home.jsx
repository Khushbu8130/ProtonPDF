
import React, { useState } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";

const Home = () => {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [converting, setConverting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMsg("");
    setErrorMsg("");
  };

  const getCompressionSettings = () => {
    switch (compressionLevel) {
      case "low":
        return { ImageResolution: 300, ImageQuality: 90 };
      case "medium":
        return { ImageResolution: 150, ImageQuality: 60 };
      case "high":
        return { ImageResolution: 72, ImageQuality: 30 };
      default:
        return { ImageResolution: 150, ImageQuality: 60 };
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setErrorMsg("Please upload a PDF file.");
      return;
    }

    setConverting(true);
    setSuccessMsg("");
    setErrorMsg("");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64File = reader.result.split(",")[1];
      const { ImageResolution, ImageQuality } = getCompressionSettings();

      try {
        const response = await axios.post(
          "https://v2.convertapi.com/convert/pdf/to/compress?auth=secret_UEV86zGLRq6eufAd",
          {
            Parameters: [
              {
                Name: "File",
                FileValue: {
                  Name: file.name,
                  Data: base64File,
                },
              },
              {
                Name: "ImageResolution",
                Value: ImageResolution.toString(),
              },
              {
                Name: "ImageQuality",
                Value: ImageQuality.toString(),
              },
            ],
          }
        );

        const base64Data = response.data.Files[0].FileData;
        const blob = b64toBlob(base64Data, "application/pdf");
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        link.href = url;
        link.download = `${fileNameWithoutExt}_compressed.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setSuccessMsg("File compressed and downloaded successfully!");
      } catch (error) {
        console.error(error);
        setErrorMsg("Compression failed. Please try again.");
      } finally {
        setConverting(false);
      }
    };
  };

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-6 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-indigo-700">
            PDF Compressor
          </h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Reduce your PDF file size with configurable compression quality.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />

          <label
            htmlFor="fileInput"
            className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-600 hover:text-white duration-300"
          >
            <FaFilePdf className="text-2xl mr-2" />
            <span className="text-lg">
              {file ? file.name : "Choose PDF File"}
            </span>
          </label>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium">Compression Level:</p>
            <div className="flex space-x-4 text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="low"
                  checked={compressionLevel === "low"}
                  onChange={() => setCompressionLevel("low")}
                />
                <span>Low (High Quality)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="medium"
                  checked={compressionLevel === "medium"}
                  onChange={() => setCompressionLevel("medium")}
                />
                <span>Medium</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="high"
                  checked={compressionLevel === "high"}
                  onChange={() => setCompressionLevel("high")}
                />
                <span>High (Max Compression)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!file || converting}
            className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:pointer-events-none duration-300"
          >
            {converting ? "Compressing..." : "Compress & Download"}
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
