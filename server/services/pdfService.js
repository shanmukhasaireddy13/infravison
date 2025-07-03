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
      
      // For non-English languages, try to use a simpler font approach
      if (language !== 'en') {
        console.log(`Generating PDF for language: ${language}`);
        
        // Try to use system fonts that might support Unicode better
        try {
          // Check if Arial Unicode MS is available (common on Windows)
          const systemFontPaths = [
            'C:/Windows/Fonts/arial.ttf',
            'C:/Windows/Fonts/calibri.ttf',
            '/System/Library/Fonts/Arial.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
          ];
          
          let fontRegistered = false;
          for (const fontPath of systemFontPaths) {
            if (fs.existsSync(fontPath)) {
              try {
                doc.registerFont('SystemUnicodeFont', fontPath);
                textFont = 'SystemUnicodeFont';
                boldFont = 'SystemUnicodeFont';
                titleFont = 'SystemUnicodeFont';
                fontRegistered = true;
                console.log(`Successfully registered system font: ${fontPath}`);
                break;
              } catch (fontErr) {
                console.warn(`Failed to register font ${fontPath}:`, fontErr.message);
              }
            }
          }
          
          if (!fontRegistered) {
            console.log('No system Unicode font found, using Helvetica with text as-is');
            // Just use Helvetica and render the text as-is
            // PDFKit might handle some Unicode characters even with basic fonts
          }
        } catch (err) {
          console.warn('Font registration failed:', err.message);
          console.log('Using default Helvetica font');
        }
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