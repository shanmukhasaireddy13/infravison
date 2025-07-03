# InfraVision - Technical Documentation

## Overview
InfraVision is an AI-powered infrastructure monitoring system that automatically detects issues from uploaded images and generates professional complaint letters in multiple languages for municipal authorities.

## System Architecture

### Frontend (React + TensorFlow.js)
- **React 18** with modern hooks and components
- **TensorFlow.js** for client-side image classification
- **TailwindCSS** for responsive styling
- **Vite** for fast development and building

### Backend (Node.js + Express)
- **Express.js** server with RESTful APIs
- **Google Gemini AI** for complaint text generation
- **PDFKit** for PDF document creation
- **Multer** for file upload handling

### AI Components
- **Custom TensorFlow.js Model**: Detects 4 infrastructure categories
- **Google Gemini**: Generates context-aware complaints in 6 languages
- **Voice Integration**: Speech-to-text and text-to-speech features

## Key Features

### Multi-Language Support
- **Supported Languages**: Telugu, Tamil, Hindi, Kannada, Malayalam, English
- **AI Translation**: Contextual complaint generation in user's preferred language
- **Voice Features**: Speech input/output in multiple languages

### Infrastructure Detection
- **Categories**: Garbage, Damaged Road, Electric Pole, Manhole
- **Real-time Analysis**: Instant classification with confidence scores
- **Feedback System**: Users can correct predictions to improve accuracy

### Professional Output
- **Standardized Complaints**: Government-ready formal letters
- **PDF Generation**: Professional documents with proper formatting
- **Location Integration**: GPS coordinates and address detection

## Technical Implementation

### Model Details
- **Format**: Teachable Machine TensorFlow.js model
- **Input**: 224x224 RGB images
- **Deployment**: Client-side inference for real-time results
- **Size**: ~2.5MB total model files

### File Structure
```
InfraVision/
├── client/                 # React frontend
│   ├── src/components/     # UI components
│   ├── src/pages/         # Page components
│   └── public/model/      # AI model files
├── server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── services/         # Business logic
│   └── uploads/          # File storage
└── README.md
```

### Environment Configuration
**Backend (.env):**
```env
PORT=5000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_BACKEND_URL=http://localhost:5000
```

## Development Setup

### Quick Start
```bash
# Backend setup
cd server
npm install
npm run dev

# Frontend setup  
cd client
npm install
npm run dev
```

### Production Deployment
- **Backend**: Render.com or similar Node.js hosting
- **Frontend**: Vercel, Netlify, or similar static hosting
- **Environment**: Update URLs and API keys for production

## User Workflow

1. **Upload Image**: Drag-and-drop infrastructure issue photo
2. **AI Analysis**: Automatic detection and classification
3. **Location**: GPS detection with manual editing option
4. **Language Selection**: Choose preferred complaint language
5. **AI Generation**: Professional complaint letter creation
6. **Export Options**: Copy text, download PDF, or use voice features
7. **Feedback**: Mark predictions as correct/incorrect

## PDF Generation Notes
- **English**: Displays properly in PDF format
- **Non-English Languages**: May show as boxes due to font limitations
- **Solution**: PDF includes instructions for users to copy text to Word/Google Docs for proper display
- **Best Practice**: Use web interface copy function for accurate Unicode text

## Browser Compatibility
- **Chrome**: Full feature support including voice recognition
- **Firefox**: Complete functionality with PDF generation
- **Safari**: Optimized for iOS/macOS with location services
- **Edge**: Windows integration with voice features

## Performance Considerations
- **Model Loading**: ~2-3 seconds initial load time
- **Image Processing**: Real-time classification (<1 second)
- **API Responses**: Typically 2-5 seconds for complaint generation
- **File Uploads**: 10MB maximum size limit

## Security Features
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Type and size restrictions
- **CORS Configuration**: Proper cross-origin settings
- **Error Handling**: Secure error messages without sensitive data exposure

## Future Enhancements
- **Database Integration**: Replace file-based storage
- **User Authentication**: Account system with complaint history
- **More Languages**: Additional regional language support
- **Mobile App**: Native iOS/Android applications
- **Government Portal**: Municipal authority interface

## Troubleshooting

### Common Issues
1. **Model Loading Failed**: Check internet connection and model files
2. **API Errors**: Verify GEMINI_API_KEY in server environment
3. **PDF Unicode Issues**: Expected behavior - follow in-PDF instructions
4. **Location Not Working**: Enable browser location permissions
5. **Voice Features Failed**: Ensure HTTPS and microphone permissions

### Support
- **GitHub**: [Repository issues and discussions](https://github.com/shanmukhasaireddy13/infravison)
- **Email**: s.shanmukhasaireddy@gmail.com
- **Live Demo**: [https://infravison.onrender.com/](https://infravison.onrender.com/)

---

**Version**: 1.0  
**Last Updated**: june 2025 
**Maintained by**: InfraVision Development Team
