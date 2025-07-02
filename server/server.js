import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import complaintRoutes from './routes/complaintRoutes.js';
import dotenv from 'dotenv';
import pdfService from './services/pdfService.js';
import { generateComplaintText, chatHelp } from './controllers/complaintController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Feedback storage setup
const feedbackUploadsDir = path.join(__dirname, 'feedback_uploads');
if (!fs.existsSync(feedbackUploadsDir)) {
  fs.mkdirSync(feedbackUploadsDir, { recursive: true });
}
const feedbackStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, feedbackUploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const feedbackUpload = multer({ storage: feedbackStorage });

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'InfraVision Backend Server',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.post('/api/predict', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
});

// Complaint routes
app.use('/api/complaint', complaintRoutes);

// Direct Gemini complaint generation endpoint
app.post('/api/generate-complaint', generateComplaintText);
app.post('/api/chat-help', chatHelp);

app.post('/api/complaint-pdf', async (req, res) => {
  const { complaintText, imageBase64 } = req.body;
  if (!complaintText) {
    return res.status(400).json({ error: 'complaintText is required' });
  }
  try {
    const pdfBuffer = await pdfService.generateComplaintPDF(complaintText, imageBase64);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="complaint.pdf"',
      'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Feedback endpoint
app.post('/api/feedback', feedbackUpload.single('correctionImage'), (req, res) => {
  const feedbackFile = path.join(__dirname, 'feedback.json');
  const feedbackEntry = {
    timestamp: new Date().toISOString(),
    originalLabel: req.body.originalLabel,
    confidence: req.body.confidence,
    userCorrection: req.body.userCorrection,
    userName: req.body.userName,
    location: req.body.location,
    correctionImage: req.file ? req.file.filename : null
  };
  let feedbackData = [];
  if (fs.existsSync(feedbackFile)) {
    try {
      feedbackData = JSON.parse(fs.readFileSync(feedbackFile, 'utf-8'));
    } catch {}
  }
  feedbackData.push(feedbackEntry);
  fs.writeFileSync(feedbackFile, JSON.stringify(feedbackData, null, 2));
  res.json({ success: true });
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`🚀 InfraVision Server running on port ${PORT}`);
});
