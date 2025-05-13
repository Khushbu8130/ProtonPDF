import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FaFilePdf } from "react-icons/fa";

const Home = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("merged");

  const handlePDFUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      setError("Please upload at least one PDF file.");
      return;
    }

    const isAllPDFs = files.every((file) => file.type === "application/pdf");
    if (!isAllPDFs) {
      setError("All files must be PDF.");
      return;
    }

    setError("");
    setPdfFiles(files);
    setFileName(files[0].name.split(".")[0]);
  };

  const handleMergePDFs = async () => {
    if (pdfFiles.length === 0) {
      alert("Please upload PDF files to merge.");
      return;
    }

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of pdfFiles) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}_merged.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while merging the PDFs.");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Merge PDF Files Online
          </h1>
          <p className="text-sm text-center mb-5">
            Combine multiple PDF files into a single document easily without
            installing any software.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handlePDFUpload}
              className="hidden"
              id="PdfInput"
            />
            <label
              htmlFor="PdfInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFilePdf className="text-3xl mr-3" />
              <span className="text-2xl mr-2">
                {pdfFiles.length > 0
                  ? `${pdfFiles.length} PDF File(s) Selected`
                  : "Choose PDF Files"}
              </span>
            </label>

            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            <button
              onClick={handleMergePDFs}
              disabled={pdfFiles.length === 0}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              Merge PDFs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
