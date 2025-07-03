import PDFDocument from 'pdfkit';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache for downloaded fonts
let fontsCache = {};

// Download and cache Google Noto Sans font
async function downloadNotoFont() {
  return new Promise((resolve) => {
    const fontUrl = 'https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNjXhFVZNyB.woff2';
    const fontPath = path.join(__dirname, 'fonts', 'NotoSans-Regular.woff2');
    
    // Check if font already exists
    if (fs.existsSync(fontPath)) {
      resolve(fontPath);
      return;
    }
    
    // Create fonts directory if it doesn't exist
    if (!fs.existsSync(path.dirname(fontPath))) {
      fs.mkdirSync(path.dirname(fontPath), { recursive: true });
    }
    
    const file = fs.createWriteStream(fontPath);
    https.get(fontUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(fontPath);
      });
    }).on('error', () => {
      // If download fails, return null to use fallback
      resolve(null);
    });
  });
}

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
      
      // For non-English languages, try different approaches
      if (language !== 'en') {
        const downloadAndRegisterFont = async (url, name) => {
          try {
            console.log(`Downloading font: ${name}`);
            const res = await fetch(url);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            doc.registerFont(name, buffer);
            console.log(`Successfully registered font: ${name}`);
            return name;
          } catch (error) {
            console.error('Error downloading font:', error);
            return null;
          }
        };

        // Try to download NotoSans font for better Unicode support
        const notoSans = await downloadAndRegisterFont(
          'https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf',
          'NotoSans'
        );

        if (notoSans) {
          textFont = notoSans;
          boldFont = notoSans;
          titleFont = notoSans;
          console.log('Using NotoSans font for Unicode support');
        } else {
          console.warn('Failed to download NotoSans, using default Helvetica');
        }
      } catch (err) {
        console.warn('Font registration failed:', err.message);
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
      doc.moveDown(1.5);

      // Parse the complaintText into sections if possible
      // Try to extract Subject, Salutation, Description, Location, Impact, Action, Closing, Signature
      // Otherwise, just print the text
      const lines = complaintText.split('\n');
      let currentSection = '';
      let sectionContent = '';
      const sections = {};
      const sectionOrder = ['Subject', 'Salutation', 'Description', 'Location', 'Impact', 'Requested Action', 'Closing', 'Signature'];
      lines.forEach(line => {
        const match = line.match(/^(Subject|Salutation|Description|Location|Impact|Requested Action|Closing|Signature)[:：]?/i);
        if (match) {
          if (currentSection) {
            sections[currentSection] = sectionContent.trim();
          }
          currentSection = match[1];
          sectionContent = line.replace(/^(Subject|Salutation|Description|Location|Impact|Requested Action|Closing|Signature)[:：]?/i, '').trim();
        } else {
          sectionContent += (sectionContent ? '\n' : '') + line.trim();
        }
      });
      if (currentSection) {
        sections[currentSection] = sectionContent.trim();
      }

      // Subject
      if (sections.Subject) {
        doc.fontSize(14).font(boldFont).text('Subject:', { continued: true }).font(textFont).text(' ' + sections.Subject);
        doc.moveDown();
      }
      // Salutation
      if (sections.Salutation) {
        doc.fontSize(12).font(textFont).text(sections.Salutation);
        doc.moveDown();
      }
      // Description
      if (sections.Description) {
        doc.fontSize(12).font(boldFont).text('Description:', { underline: true });
        doc.font(textFont).text(sections.Description);
        doc.moveDown();
      }
      // Add image if provided
      if (imageBase64) {
        const imgBuffer = Buffer.from(imageBase64, 'base64');
        try {
          // Calculate image size to fit within 400px width, keep aspect ratio
          const img = doc.openImage(imgBuffer);
          let imgWidth = img.width;
          let imgHeight = img.height;
          const maxWidth = 400;
          if (imgWidth > maxWidth) {
            const scale = maxWidth / imgWidth;
            imgWidth = maxWidth;
            imgHeight = imgHeight * scale;
          }
          const x = (doc.page.width - imgWidth) / 2;
          doc.moveDown(0.5);
          doc.rect(x - 2, doc.y - 2, imgWidth + 4, imgHeight + 4).stroke('#888'); // border
          doc.image(img, x, doc.y, { width: imgWidth, height: imgHeight });
          doc.moveDown(1.5);
        } catch (e) {
          // If image fails, continue
        }
      }
      // Location
      if (sections.Location) {
        doc.fontSize(12).font(boldFont).text('Location:', { underline: true });
        doc.font(textFont).text(sections.Location);
        doc.moveDown();
      }
      // Impact
      if (sections.Impact) {
        doc.fontSize(12).font(boldFont).text('Impact/Urgency:', { underline: true });
        doc.font(textFont).text(sections.Impact);
        doc.moveDown();
      }
      // Requested Action
      if (sections['Requested Action']) {
        doc.fontSize(12).font(boldFont).text('Requested Action:', { underline: true });
        doc.font(textFont).text(sections['Requested Action']);
        doc.moveDown();
      }
      // Closing
      if (sections.Closing) {
        doc.fontSize(12).font(textFont).text(sections.Closing);
        doc.moveDown();
      }
      // Signature
      if (sections.Signature) {
        doc.fontSize(12).font(textFont).text(sections.Signature);
        doc.moveDown();
      }

      // If no sections detected, just print the complaintText
      if (Object.keys(sections).length === 0) {
        doc.fontSize(12).font(textFont).text(complaintText);
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export default { generateComplaintPDF }; 