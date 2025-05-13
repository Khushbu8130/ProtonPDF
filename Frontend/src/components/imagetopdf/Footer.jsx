import React from "react";

function Footer() {
  return (
    <>
      <div className="item-center justify-center">
        <hr className=" border-black" />
        <h1 className="text-center py-3 text-sm">
        &copy; {new Date().getFullYear()} IMAGE to PDF Converter App
        </h1>
      </div>
    </>
  );
}

export default Footer;