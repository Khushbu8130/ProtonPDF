import React from "react";
import { Link } from "react-router-dom";

// Conversion Tools
const conversionTools = [
  { title: "Text to PDF", desc: "Combine PDFs in the order you want with the easiest PDF merger available.", icon: "\u2194", color: "bg-orange-100", link: "/tpdf" },
  { title: "Image to PDF", desc: "Separate one page or a whole set for easy conversion into independent PDF files.", icon: "\u21C6", color: "bg-orange-100", link: "/convert-image" },
  { title: "Word to PDF", desc: "Convert Word documents into high-quality PDF files.", icon: "W", color: "bg-blue-100", link: "/word-to-pdf" },
  { title: "PowerPoint to PDF", desc: "Convert PPT presentations to PDF.", icon: "P", color: "bg-orange-100", link: "/ppt-to-pdf" },
  { title: "Excel to PDF", desc: "Convert Excel sheets to PDFs.", icon: "X", color: "bg-green-100", link: "/excel-to-pdf" },
  { title: "HTML to PDF", desc: "Edit text, images, and more in your PDF files.", icon: "✎", color: "bg-pink-100", link: "/html-to-pdf" },
  {  title: "CSV to PDF", desc: "Convert CSV files into PDF documents easily.", icon: "📄", color: "bg-blue-100", link: "/csv-to-pdf" },
  { title: "PDF to Word", desc: "Easily convert your PDF files into easy to edit DOC and DOCX documents.", icon: "W", color: "bg-blue-100", link: "/pdf-to-docx" },
  { title: "PDF to PowerPoint", desc: "Turn your PDF files into easy to edit PPT and PPTX slideshows.", icon: "P", color: "bg-orange-100", link: "/pdf-to-pptx" },
  { title: "PDF to Excel", desc: "Convert your PDF files into editable Excel spreadsheets.", icon: "X", color: "bg-green-100", link: "/pdf-to-excel" },
  { title: "PDF to JPG", desc: "Convert your PDF files into high-quality JPG images.", icon: "🖼️", color: "bg-yellow-100", link: "/pdf-to-jpg" },
 
];

// Merge Tools
const mergeTools = [
  { title: "Merge PDF", desc: "Combine multiple PDF files into one document.", icon: "📎", color: "bg-purple-100", link: "/merge-pdf" },
  { title: "Merge Images", desc: "Join multiple images into a single image file.", icon: "🧩", color: "bg-pink-100", link: "/merge-images" },
];
const compressTools = [
  { title: "Compress PDF", desc: "Reduce file size while optimizing for maximal PDF quality.", icon: "\u21C5", color: "bg-green-100", link: "/compress-pdf" },
  { title: "Image Compressor", desc: "Reduce image file size while preserving quality.", icon: "📷", color: "bg-green-100", link: "/image-compressor" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ backgroundColor: 'aliceblue' }}>
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
        All-in-one file toolkit for your everyday needs
        </h1>
        <p className="text-gray-600 md:text-lg">
        All tools are FREE and simple to use! Convert, compress, merge, split, and organize your files in seconds.
        </p>
      </header>

      {/* === Conversion Tools Section === */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Conversion Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {conversionTools.map((tool, index) => (
            <div key={index} className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
              <Link to={tool.link} className="block cursor-pointer">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 text-2xl ${tool.color}`}>
                  {tool.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* === Merge Tools Section === */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Merge Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mergeTools.map((tool, index) => (
            <div key={index} className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
              <Link to={tool.link} className="block cursor-pointer">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 text-2xl ${tool.color}`}>
                  {tool.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* === Compress Tools Section === */}

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Compression Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {compressTools.map((tool, index) => (
            <div key={index} className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
              <Link to={tool.link} className="block cursor-pointer">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 text-2xl ${tool.color}`}>
                  {tool.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
