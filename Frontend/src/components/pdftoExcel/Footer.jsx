import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-3 text-center mt-6">
            &copy; {new Date().getFullYear()} PDF to EXCEL Converter App
        </footer>
    );
}
