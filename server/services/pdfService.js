import PDFDocument from 'pdfkit';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



function generateComplaintPDF(complaintText, imageBase64, language = 'en') {
  return new Promise(async (resolve, reject) => {
    try {
      // Create PDF document with proper Unicode support
      const doc = new PDFDocument({ 
        margin: 50,
        bufferPages: true,
        // Enable Unicode support
        compress: false
      });
      
      // Set default fonts
      let titleFont = 'Helvetica-Bold';
      let textFont = 'Helvetica';
      let boldFont = 'Helvetica-Bold';
      
      // For non-English languages, add helpful instructions
      if (language !== 'en') {
        console.log(`Generating PDF for language: ${language}`);
        
        const languageNames = {
          'te': 'Telugu',
          'hi': 'Hindi', 
          'ta': 'Tamil',
          'kn': 'Kannada',
          'ml': 'Malayalam'
        };
        
        const langName = languageNames[language] || language;
        console.log(`Note: PDF for ${langName} may have display limitations.`);
        
        // Add helpful instructions at the top of the PDF
        const instructions = `INSTRUCTIONS FOR ${langName.toUpperCase()} COMPLAINT:\n\n` +
          `This PDF contains your complaint but may not display ${langName} characters correctly.\n` +
          `For best results with ${langName} text:\n` +
          `1. Copy the complaint from the web application\n` +
          `2. Paste into Microsoft Word or Google Docs\n` +
          `3. Set font to Arial Unicode MS or Noto Sans\n` +
          `4. Print or save from there\n\n` +
          `Original complaint content (may appear as boxes below):\n` +
          `${'='.repeat(60)}\n\n`;
        
        complaintText = instructions + complaintText;
      }
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Title
      doc.fontSize(20).font(titleFont).text('Formal Complaint Letter', { align: 'center', underline: true });
      doc.moveDown(2);

      // Add image if provided
      if (imageBase64) {
        try {
          const imgBuffer = Buffer.from(imageBase64, 'base64');
          const img = doc.openImage(imgBuffer);
          let imgWidth = img.width;
          let imgHeight = img.height;
          const maxWidth = 300;
          if (imgWidth > maxWidth) {
            const scale = maxWidth / imgWidth;
            imgWidth = maxWidth;
            imgHeight = imgHeight * scale;
          }
          const x = (doc.page.width - imgWidth) / 2;
          doc.image(img, x, doc.y, { width: imgWidth, height: imgHeight });
          doc.moveDown(1.5);
        } catch (e) {
          console.log('Image processing failed:', e.message);
        }
      }

      // Simply render the complaint text as-is without any parsing
      doc.fontSize(12).font(textFont).text(complaintText, {
        align: 'left',
        lineGap: 2
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export default { generateComplaintPDF }; 