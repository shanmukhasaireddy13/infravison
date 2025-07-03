import React from 'react';
import { useNavigate } from 'react-router-dom';
import headerImg from '../assets/header_img.png';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-lg">
            <span className="text-3xl text-white">🏗️</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-700 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight">
            InfraVision
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Transform infrastructure complaints with AI-powered analysis and professional letter generation
          </p>
        </div>

        {/* Main Content Card */}
        <section className="w-full max-w-7xl">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Content */}
              <div className="flex-1 p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">🤖</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">AI-Powered Analysis</h3>
                        <p className="text-gray-600">Advanced image recognition instantly identifies infrastructure issues</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">🌍</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Multi-Language Support</h3>
                        <p className="text-gray-600">Generate complaints in Telugu, Tamil, Hindi, and more</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">📱</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Mobile-Friendly</h3>
                        <p className="text-gray-600">Report issues on-the-go with our responsive design</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">📄</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Export Options</h3>
                        <p className="text-gray-600">Download PDF, copy text, or print professional letters</p>
                      </div>
                    </div>
                  </div>

                  {/* How it Works */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="mr-3">⚡</span> How It Works
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <span className="font-semibold text-gray-800">Upload Image:</span>
                          <span className="text-gray-600"> Drag & drop or click to upload a photo of the infrastructure issue</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <span className="font-semibold text-gray-800">Enable Location:</span>
                          <span className="text-gray-600"> Allow location access for precise complaint details</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <span className="font-semibold text-gray-800">AI Analysis:</span>
                          <span className="text-gray-600"> Our AI identifies the issue and generates a professional complaint</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <span className="font-semibold text-gray-800">Export & Submit:</span>
                          <span className="text-gray-600"> Download, copy, or chat with AI to refine your complaint</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center pt-4">
                    <button
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => navigate('/app')}
                    >
                      <span className="mr-2">🚀</span>
                      Start Reporting Issues
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="flex-1 relative lg:min-h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-8">
                <div className="relative">
                  <img 
                    src={headerImg} 
                    alt="InfraVision Platform" 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                  />
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="text-white text-2xl">⚡</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-xl">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
