import React from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 pb-8 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* ProtonPDF Section */}
        <div>
          <h2 className="font-bold text-blue-800 mb-3">ProtonPDF</h2>
          <ul className="space-y-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Tools</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Product Section */}
        <div>
          <h2 className="font-bold text-blue-800 mb-3">PRODUCT</h2>
          <ul className="space-y-2">
            <li><a href="#">Protonpdf Desktop</a></li>
            <li><a href="#">Protonpdf Mobile</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">flexiimg.com</a></li>
          </ul>
        </div>

        {/* Solutions Section */}
        <div>
          <h2 className="font-bold text-blue-800 mb-3">SOLUTIONS</h2>
          <ul className="space-y-2">
            <li><a href="#">Business</a></li>
            <li><a href="#">Education</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h2 className="font-bold text-blue-800 mb-3">COMPANY</h2>
          <ul className="space-y-2">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Legal & Privacy</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* App download buttons */}
{/*       <div className="flex justify-center mt-8 gap-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12" />
      </div> */}

      {/* Socials and copyright */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-6 mb-4">
          <FaXTwitter className="text-xl hover:text-gray-800 cursor-pointer" />
          <FaFacebookF className="text-xl hover:text-gray-800 cursor-pointer" />
          <FaLinkedinIn className="text-xl hover:text-gray-800 cursor-pointer" />
          <FaInstagram className="text-xl hover:text-gray-800 cursor-pointer" />
          <FaTiktok className="text-xl hover:text-gray-800 cursor-pointer" />
        </div>
        <p>© Protonpdf 2025 ® – Your File Editor</p>
      </div>
    </footer>
  );
};

export default Footer;
