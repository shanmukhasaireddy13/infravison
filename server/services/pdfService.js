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
      
      // For non-English languages, use script-specific Noto fonts
      if (language !== 'en') {
        const downloadAndRegisterFont = async (url, name) => {
          try {
            console.log(`Downloading font: ${name} from ${url}`);
            const res = await fetch(url);
            if (!res.ok) {
              throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            doc.registerFont(name, buffer);
            console.log(`Successfully registered font: ${name}`);
            return name;
          } catch (error) {
            console.error(`Error downloading font ${name}:`, error.message);
            return null;
          }
        };

        // Language-specific font URLs - using Google Fonts API for better reliability
        const fontUrls = {
          'te': 'https://fonts.gstatic.com/s/notosanstelugu/v26/6xK5dSxaJVCqxLHJG59xKr_YKMG5OjGsyp-W.ttf',
          'hi': 'https://fonts.gstatic.com/s/notosansdevanagari/v21/TuGJUVpzXI5FQtUF_LGzWI3f6r3OhiNq9xPiK6ZAKw.ttf',
          'ta': 'https://fonts.gstatic.com/s/notosanstamil/v27/E213_cG_VMAhpgdK_-0qYdNKt-0VCGZWF8.ttf',
          'kn': 'https://fonts.gstatic.com/s/notosanskannada/v26/3qTqojI1UB4OiuwjOPcZ5sJpVyxQw3M2X9U.ttf',
          'ml': 'https://fonts.gstatic.com/s/notosansmalayalam/v26/3qTjojK-UtU6pnYXP7QcAKONNtJTlYQHhRo.ttf'
        };

        const fontUrl = fontUrls[language];
        if (fontUrl) {
          const scriptFont = await downloadAndRegisterFont(fontUrl, `Noto${language.toUpperCase()}`);
          if (scriptFont) {
            textFont = scriptFont;
            boldFont = scriptFont;
            titleFont = scriptFont;
            console.log(`Using ${scriptFont} font for ${language} language support`);
          } else {
            console.warn(`Failed to download ${language} font, trying fallback`);
            // Try a fallback generic Noto Sans
            const fallbackFont = await downloadAndRegisterFont(
              'https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNjXhFVZNyB.ttf',
              'NotoSansFallback'
            );
            if (fallbackFont) {
              textFont = fallbackFont;
              boldFont = fallbackFont;
              titleFont = fallbackFont;
              console.log('Using fallback NotoSans font');
            }
          }
        } else {
          console.warn(`No specific font available for language: ${language}`);
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