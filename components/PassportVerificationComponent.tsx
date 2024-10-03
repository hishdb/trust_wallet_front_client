// components/PassportVerificationComponent.tsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';

interface PassportVerificationProps {
  onSelfieCapture: (file: File) => void;
}

const PassportVerificationComponent: React.FC<PassportVerificationProps> = ({ onSelfieCapture }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSelfieTaken, setIsSelfieTaken] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);

  const captureSelfie = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
          onSelfieCapture(file);
          setIsSelfieTaken(true);
          setIsModalOpen(false);
        });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Take Selfie Button or Done Icon */}
      {!isSelfieTaken ? (
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
           1. Passport Verification*
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
           Retake Selfie!
        </button>
          <svg
            className="w-6 h-6 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-600 font-semibold">Done</span>
        </div>
      )}

      {/* Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <h2 className="text-xl font-semibold mb-4 text-center">Please take a selfie with your passport</h2>
              <div className="flex justify-center mb-4">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  height={1080}
                  width={1920}
                  imageSmoothing
                  screenshotFormat="image/jpeg"
                  className="rounded-lg shadow-md"
                  videoConstraints={{
                    facingMode: 'user',
                  }}
                  screenshotQuality = {1}
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={captureSelfie}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Take Selfie
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PassportVerificationComponent;
