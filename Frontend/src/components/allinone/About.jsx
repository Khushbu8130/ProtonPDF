import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">About ProtonPDF</h1>

      <p className="mb-6 text-lg">
        <strong>ProtonPDF</strong> is your all-in-one online toolkit for working with PDF files. Whether you need to merge, split, compress, convert, or edit PDFs, ProtonPDF makes it effortless, fast, and secure — right from your browser.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Mission</h2>
      <p className="mb-6">
        Our mission is to simplify how people work with digital documents. In a world where PDFs are the standard for sharing important files, FlexiPDF empowers individuals, students, and businesses with smart, reliable tools that streamline their workflow without the need to install any software.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Why ProtonPDF?</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Easy to Use:</strong> Designed with a clean, intuitive interface for all skill levels.</li>
        <li><strong>Fast & Reliable:</strong> Get high-quality results in seconds, with minimal effort.</li>
        <li><strong>Secure:</strong> We respect your privacy. Your files are processed with care and never stored permanently.</li>
        <li><strong>Free & Accessible:</strong> Many tools are completely free, with no sign-up required.</li>
        <li><strong>Cross-Platform:</strong> Works seamlessly on any device with a browser — desktop, tablet, or mobile.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">What You Can Do with FlexiPDF</h2>
      <p className="mb-6">
        ProtonPDF offers a growing collection of tools, including:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Convert PDF to Word, Excel, PPT, JPG and vice versa</li>
        <li>Merge and split PDFs</li>
        <li>Compress large PDF files</li>
        <li>Reorder, rotate, or delete PDF pages</li>
        <li>Protect and unlock PDF files</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Join Our Journey</h2>
      <p>
        ProtonPDF is constantly evolving. We’re committed to expanding our tools, improving performance, and delivering the best user experience. Thank you for trusting us to be part of your digital document journey.
      </p>

      <p className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} ProtonPDF. All rights reserved.</p>
    </div>
  );
};

export default About;
