import React from 'react';
import jsPDF from 'jspdf';

export default function ComplaintCard({ label, latitude, longitude, complaintText, userName, userDetails }) {
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
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-blue-700">AI-Generated Complaint</h2>
      <div className="mb-2 text-gray-700">
        <span className="font-semibold">Name:</span> {userName}
      </div>
      {userDetails && (
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Contact:</span> {userDetails}
        </div>
      )}
      <div className="mb-2 text-gray-700">
        <span className="font-semibold">Detected Issue:</span> {label}
      </div>
      <div className="mb-2 text-gray-700">
        <span className="font-semibold">Location:</span> {latitude}, {longitude}
      </div>
      <textarea
        className="w-full h-48 p-3 border border-gray-300 rounded bg-gray-50 text-gray-800"
        value={complaintText}
        readOnly
      />
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={copyToClipboard}
          disabled={!complaintText}
        >
          Copy to Clipboard
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={downloadPDF}
          disabled={!complaintText}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
} 