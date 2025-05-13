import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FaFileImage } from "react-icons/fa";

const Home = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("merged");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];

    if (files.length === 0) {
      setError("Please upload at least one image file.");
      return;
    }

    const allImages = files.every((file) => file.type.startsWith("image/"));
    if (!allImages) {
      setError("Only image files are allowed.");
      return;
    }

    setError("");
    setFileName(files[0].name.split(".")[0]);

    files.forEach((file) => {
      validImages.push(URL.createObjectURL(file));
    });

    setImages(validImages);
  };

  const handleMergeToPDF = () => {
    if (images.length === 0) {
      alert("Please upload images to merge.");
      return;
    }

    const doc = new jsPDF();

    images.forEach((image, index) => {
      if (index > 0) doc.addPage();
      doc.addImage(image, "JPEG", 10, 10, 180, 250);
    });

    doc.save(`${fileName}_merge.pdf`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-6 md:px-8 md:py-10 border-indigo-400 rounded-lg shadow-xl w-full max-w-2xl bg-white">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Merge Images into PDF
          </h1>
          <p className="text-sm text-center mb-5 text-gray-600">
            Convert multiple images into a single PDF file without any software.
          </p>

          <div className="flex flex-col items-center space-y-5">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-md cursor-pointer border border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFileImage className="text-3xl mr-3" />
              <span className="text-lg md:text-2xl">
                {images.length > 0
                  ? `${images.length} Image${images.length > 1 ? "s" : ""} Selected`
                  : "Choose Images"}
              </span>
            </label>

            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            <button
              onClick={handleMergeToPDF}
              disabled={images.length === 0}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-6 py-2 rounded-lg"
            >
              Merge to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
