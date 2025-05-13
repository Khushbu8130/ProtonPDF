import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/allinone/Navbar";
import Home from "./components/allinone/Home";
import Footer from "./components/allinone/Footer";
import Wpdf from "./components/wordtoPDF/wpdf";
import Ipdf from "./components/imagetopdf/ipdf";
import Tpdf from "./components/textToPdf/tpdf";
import PCom from "./components/pdfCompression/pCom";
import Contact from "./components/allinone/Contact";
import PDocs from "./components/pdftoWord/pDocs";
import Epdf from "./components/exceltoPdf/ePdf";
import HPdf from "./components/htmltoPdf/hPdf";
import PJpg from "./components/pdftoJpg/pJpg";
import PPPtx from "./components/pdftoppt/pPpt";
import PExcel from "./components/pdftoExcel/pExcel";
import MImg from "./components/mergeImg/mImg";
import MPdf from "./components/mergePdf/mPdf";
import CImg from "./components/compressImg/cImg";
import PPdf from "./components/ppttoPDF/Ppdf";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import UpdatePassword from './components/auth/UpdatePassword';
// import Super from './components/Super';
import About from "./components/allinone/About";
import CSVPdf from "./components/csvtoPDF/csvPdf";

function LayoutWrapper() {
  const location = useLocation();

  // Define tool routes to hide Navbar & Footer
  const toolPaths = [
    "/word-to-pdf",
    "/convert-image",
    "/tpdf",
    "/compress-pdf",
    "/pdf-to-docx",
    "/excel-to-pdf",
    "/html-to-pdf",
    "/pdf-to-jpg",
    "/pdf-to-pptx",
    "/pdf-to-excel",
    "/merge-images",
    "/merge-pdf",
    "/csv-to-pdf",
    "/image-compressor",
    "/ppt-to-pdf"

  ];

  const hideLayout = toolPaths.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word-to-pdf" element={<Wpdf />} />
        <Route path="/convert-image" element={<Ipdf />} />
        <Route path="/tpdf" element={<Tpdf />} />
        <Route path="/compress-pdf" element={<PCom />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pdf-to-docx" element={<PDocs />} />
        <Route path="/excel-to-pdf" element={<Epdf />} />
        <Route path="/html-to-pdf" element={<HPdf />} />
        <Route path="/pdf-to-jpg" element={<PJpg />} />
        <Route path="/pdf-to-pptx" element={<PPPtx />} />
        <Route path="/pdf-to-excel" element={<PExcel />} />
        <Route path="/merge-images" element={<MImg />} />
        <Route path="/merge-pdf" element={<MPdf />} />
        <Route path="/image-compressor" element={<CImg />} />
        <Route path="/csv-to-pdf" element={<CSVPdf />} />
        <Route path="/ppt-to-pdf" element={<PPdf />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/forget/password" element={<ForgetPassword />} />
        {/* <Route element={<Super />}> */}
          <Route path="/otp/verify" element={<VerifyOtp />} />
          <Route path="/password/update" element={<UpdatePassword />} />
        {/* </Route> */}
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default LayoutWrapper;