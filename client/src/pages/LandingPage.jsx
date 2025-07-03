import React from 'react';
import { useNavigate } from 'react-router-dom';
import headerImg from '../assets/header_img.png';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center py-12">
      <section className="w-full max-w-5xl mb-8 p-6 bg-white/80 rounded-2xl shadow-lg flex flex-col md:flex-row gap-8 items-center border border-blue-200">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2">Welcome to InfraVision</h1>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold text-blue-600">InfraVision</span> is an AI-powered platform for smart infrastructure complaint management. Effortlessly report issues like garbage, damaged roads, electric poles, and manholes using just an image and a few details. Our system uses a local AI model for instant image classification and <span className="font-semibold">Gemini</span> for generating professional complaint letters.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-2">
            <li>AI-powered image analysis and complaint generation</li>
            <li>Real-time feedback and multi-language support</li>
            <li>Easy-to-use, mobile-friendly interface</li>
            <li>Download, copy, or print your complaint letter</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-2">
            <h2 className="text-xl font-bold text-blue-700 mb-1">How to Use InfraVision</h2>
            <ol className="list-decimal pl-6 text-gray-800 space-y-1">
              <li><span className="font-semibold">Upload an Image:</span> Click or drag-and-drop a photo of the issue (e.g., pothole, garbage, etc.).</li>
              <li><span className="font-semibold">Allow Location Access:</span> For more accurate complaints, enable location when prompted.</li>
              <li><span className="font-semibold">Enter Your Details:</span> Fill in your name and (optionally) contact info.</li>
              <li><span className="font-semibold">Analyze & Generate:</span> Let the AI classify the issue and generate a complaint letter for you.</li>
              <li><span className="font-semibold">Export or Copy:</span> Download, print, or copy the complaint letter to submit to authorities.</li>
              <li><span className="font-semibold">Use the Assistant:</span> Chat with the AI for help, translations, or to refine your complaint.</li>
            </ol>
          </div>
          <button
            className="inline-block mt-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition w-fit"
            onClick={() => navigate('/app')}
          >
            Get Started
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={headerImg} alt="InfraVision" className="w-80 max-w-full rounded-xl shadow-lg border border-blue-100" />
        </div>
      </section>
    </div>
  );
} 