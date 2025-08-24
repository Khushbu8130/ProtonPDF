
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FaFileImage } from "react-icons/fa";


const ImageToPDF = () => {
  const [images, setImages] = useState([]);
  const [convertStatus, setConvertStatus] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file => file.type.startsWith("image/"));

    if (validImages.length === 0) {
      setImages([]);
      setError("Please upload valid image files");
      return;
    }

    setImages(validImages);
    setConvertStatus("");
    setError("");
  };

  const generatePDF = async () => {
    if (images.length === 0) {
      setError("No images selected");
      return;
    }

    const pdf = new jsPDF();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const reader = new FileReader();

      await new Promise((resolve) => {
        reader.onload = (e) => {
          const imgData = e.target.result;

          const img = new Image();
          img.src = imgData;
          img.onload = () => {
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
            const width = img.width * ratio;
            const height = img.height * ratio;
            const x = (pdfWidth - width) / 2;
            const y = (pdfHeight - height) / 2;

            if (i !== 0) pdf.addPage();
            pdf.addImage(imgData, "JPEG", x, y, width, height);
            resolve();
          };
        };
        reader.readAsDataURL(image);
      });
    }

    pdf.save("images_converted.pdf");
    setConvertStatus("PDF created successfully!");
    setError("");
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-4">
            Convert Images to PDF Online
          </h1>
          <p className="text-sm text-center mb-5">
            Select one or more image files (JPG, PNG, etc.) and convert them to a single PDF.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="ImageInput"
            />
            <label
              htmlFor="ImageInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFileImage className="text-3xl mr-3" />
              <span className="text-2xl">
                {images.length > 0 ? `${images.length} image(s) selected` : "Choose Images"}
              </span>
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    className="h-32 object-cover rounded border"
                  />
                ))}
              </div>
            )}

            <button
              onClick={generatePDF}
              disabled={images.length === 0}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              Convert to PDF
            </button>

            {convertStatus && (
              <div className="text-green-500 text-center">{convertStatus}</div>
            )}
            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToPDF;
