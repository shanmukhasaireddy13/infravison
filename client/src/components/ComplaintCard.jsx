import React, { useEffect } from 'react';
import jsPDF from 'jspdf';

export default function ComplaintCard({ label, latitude, longitude, complaintText, userName, userDetails }) {
  useEffect(() => {
    console.log('[ComplaintCard] Rendered with props:', { label, latitude, longitude, complaintText, userName, userDetails });
  }, [label, latitude, longitude, complaintText, userName, userDetails]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(complaintText);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Formal Infrastructure Complaint', 10, 15);
    doc.setFontSize(11);
    doc.text(`Name: ${userName || ''}`, 10, 30);
    doc.text(`Contact: ${userDetails || ''}`, 10, 38);
    doc.text(`Detected Issue: ${label}`, 10, 46);
    doc.text(`Location: ${latitude}, ${longitude}`, 10, 54);
    doc.text('Complaint:', 10, 66);
    doc.setFontSize(10);
    doc.text(complaintText, 10, 74, { maxWidth: 190 });
    doc.save('complaint.pdf');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl transform rotate-1 opacity-10"></div>
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI-Generated Complaint</h2>
                <p className="text-blue-100 font-medium">Professional Infrastructure Report</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Generated on</div>
              <div className="font-semibold">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">👤</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Complainant</div>
                  <div className="font-bold text-gray-800">{userName}</div>
                </div>
              </div>
              {userDetails && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Contact:</span> {userDetails}
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 border border-green-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🔍</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Detected Issue</div>
                  <div className="font-bold text-gray-800">{label}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100 md:col-span-2">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📍</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 font-medium mb-1">Location Coordinates</div>
                  <div className="font-bold text-gray-800">{latitude}, {longitude}</div>
                  <div className="text-sm text-gray-600 mt-1">Latitude: {latitude} | Longitude: {longitude}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Complaint Text */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📝</span>
              <h3 className="text-xl font-bold text-gray-800">Formal Complaint Letter</h3>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-64 p-6 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white text-gray-800 resize-none focus:outline-none focus:border-blue-300 transition-colors shadow-inner"
                value={complaintText}
                readOnly
                style={{
                  fontFamily: 'Georgia, serif',
                  lineHeight: '1.6',
                  fontSize: '15px'
                }}
              />
              <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                AI Generated
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg"
              onClick={copyToClipboard}
              disabled={!complaintText}
            >
              <span className="text-lg">📋</span>
              <span className="font-semibold">Copy to Clipboard</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg"
              onClick={downloadPDF}
              disabled={!complaintText}
            >
              <span className="text-lg">📄</span>
              <span className="font-semibold">Download PDF</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p className="flex items-center justify-center space-x-2">
                <span>✨</span>
                <span>Generated by InfraVision AI</span>
                <span>•</span>
                <span>Professional Infrastructure Complaint System</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
