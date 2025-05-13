import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { FaImage, FaDownload } from 'react-icons/fa';

const compressionOptions = {
  low: { maxSizeMB: 1, maxWidthOrHeight: 1024 },
  medium: { maxSizeMB: 0.5, maxWidthOrHeight: 800 },
  high: { maxSizeMB: 0.2, maxWidthOrHeight: 600 },
};

const Home = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [error, setError] = useState('');
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setOriginalImage(imageFile);
      setOriginalSize((imageFile.size / 1024 / 1024).toFixed(2));
      setCompressedImage(null);
      setCompressedSize(null);
      setError('');
    }
  };

  const compressImage = async () => {
    if (!originalImage) {
      setError('Please upload an image before compressing.');
      return;
    }

    const options = {
      ...compressionOptions[compressionLevel],
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(originalImage, options);
      const compressedUrl = URL.createObjectURL(compressedFile);
      setCompressedImage({ url: compressedUrl, file: compressedFile });
      setCompressedSize((compressedFile.size / 1024 / 1024).toFixed(2));
      setError('');
    } catch (error) {
      console.error('Compression error:', error);
      setError('Something went wrong during compression.');
    }
  };

  const getDownloadFileName = () => {
    if (!originalImage) return 'compressed.jpg';
    const nameParts = originalImage.name.split('.');
    const extension = nameParts.pop();
    const baseName = nameParts.join('.');
    return `${baseName}_compressed.${extension}`;
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-6 md:px-8 md:py-6 border-blue-500 rounded-lg shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            Image Compressor
          </h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Upload an image and compress it to reduce its size easily.
          </p>

          <input
            type="file"
            accept="image/*"
            id="imageInput"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="imageInput"
            className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-800 hover:text-white duration-300"
          >
            <FaImage className="text-2xl mr-2" />
            <span className="text-lg">
              {originalImage ? originalImage.name : 'Choose Image File'}
            </span>
          </label>

          <div className="mt-4 mb-6 text-center">
            <label className="mr-2 font-medium text-gray-700">
              Compression Level:
            </label>
            <select
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="low">Low (High Quality)</option>
              <option value="medium">Medium</option>
              <option value="high">High (More Compression)</option>
            </select>
          </div>

          <button
            onClick={compressImage}
            className="w-full py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg duration-300 flex items-center justify-center space-x-2"
          >
            <FaDownload />
            <span>Compress Image</span>
          </button>

          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

          {compressedImage && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Compressed Image:</h3>
              <img
                src={compressedImage.url}
                alt="Compressed"
                className="max-w-full mx-auto mb-4 rounded-lg shadow"
              />
              <p className="mb-2 text-gray-700 font-medium">
                Original Size: {originalSize} MB
              </p>
              <p className="mb-2 text-gray-700 font-medium">
                Compressed Size: {compressedSize} MB
              </p>
              <p className="mb-4 text-green-700 font-semibold">
                Compression:{' '}
                {originalSize && compressedSize
                  ? `${((1 - compressedSize / originalSize) * 100).toFixed(2)}%`
                  : 'N/A'}
              </p>
              <a
                href={compressedImage.url}
                download={getDownloadFileName()}
                className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Download Compressed Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
