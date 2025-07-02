import PDFDocument from 'pdfkit';

function generateComplaintPDF(complaintText, imageBase64) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Title
      doc.fontSize(20).font('Times-Bold').text('Formal Complaint Letter', { align: 'center', underline: true });
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
        doc.fontSize(14).font('Times-Bold').text('Subject:', { continued: true }).font('Times-Roman').text(' ' + sections.Subject);
        doc.moveDown();
      }
      // Salutation
      if (sections.Salutation) {
        doc.fontSize(12).font('Times-Roman').text(sections.Salutation);
        doc.moveDown();
      }
      // Description
      if (sections.Description) {
        doc.fontSize(12).font('Times-Bold').text('Description:', { underline: true });
        doc.font('Times-Roman').text(sections.Description);
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
        doc.fontSize(12).font('Times-Bold').text('Location:', { underline: true });
        doc.font('Times-Roman').text(sections.Location);
        doc.moveDown();
      }
      // Impact
      if (sections.Impact) {
        doc.fontSize(12).font('Times-Bold').text('Impact/Urgency:', { underline: true });
        doc.font('Times-Roman').text(sections.Impact);
        doc.moveDown();
      }
      // Requested Action
      if (sections['Requested Action']) {
        doc.fontSize(12).font('Times-Bold').text('Requested Action:', { underline: true });
        doc.font('Times-Roman').text(sections['Requested Action']);
        doc.moveDown();
      }
      // Closing
      if (sections.Closing) {
        doc.fontSize(12).font('Times-Roman').text(sections.Closing);
        doc.moveDown();
      }
      // Signature
      if (sections.Signature) {
        doc.fontSize(12).font('Times-Roman').text(sections.Signature);
        doc.moveDown();
      }

      // If no sections detected, just print the complaintText
      if (Object.keys(sections).length === 0) {
        doc.fontSize(12).font('Times-Roman').text(complaintText);
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export default { generateComplaintPDF }; 