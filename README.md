# InfraVision - AI-Powered Infrastructure Monitoring & Complaint Generation System

**Live Website:** [https://infravison.onrender.com/](https://infravison.onrender.com/)

InfraVision is a comprehensive full-stack MERN application that revolutionizes infrastructure monitoring by using AI to detect and classify infrastructure issues from images, automatically generating professional complaint letters in multiple languages for municipal authorities. The system combines local TensorFlow.js models for real-time image classification with Google's Gemini AI for intelligent, context-aware complaint generation.

## 🚀 Key Features

### 🔍 **AI-Powered Analysis**
- **Advanced Image Classification**: Custom-trained TensorFlow.js model for real-time infrastructure issue detection
- **Four Detection Categories**: Garbage, Damaged Road, Electric Pole, Manhole
- **Real-time Confidence Scores**: Displays prediction confidence for all categories
- **Intelligent Feedback System**: Users can correct predictions to improve model accuracy

### 📝 **Smart Complaint Generation**
- **Multi-Language Support**: Generate complaints in Telugu, Tamil, Hindi, Kannada, Malayalam, and English
- **Context-Aware AI**: Uses Google Gemini to create professional, location-specific complaint letters
- **Automatic Location Detection**: GPS-based location detection with manual editing capability
- **Professional Formatting**: Government-ready complaint letters with proper structure

### 💬 **Interactive AI Assistant**
- **Multi-Language Chat**: Get help and guidance in your preferred language
- **Voice Input Support**: Speech-to-text functionality for hands-free interaction
- **Text-to-Speech**: Listen to generated complaints and AI responses
- **Contextual Help**: AI assistant understands your uploaded image and location

### 🎨 **Modern User Experience**
- **Beautiful UI/UX**: Responsive design with gradient themes and smooth animations
- **Drag-and-Drop Upload**: Intuitive image upload with preview
- **Real-time Processing**: Instant feedback and loading states
- **Mobile-First Design**: Optimized for all devices and screen sizes

### 📄 **Export & Sharing**
- **PDF Generation**: Download professional complaint letters as PDFs
- **Multi-Language PDF Support**: Proper handling of Unicode text with user guidance
- **Copy to Clipboard**: Easy sharing of complaint text
- **Clear All Functionality**: Reset all data without page refresh

## 🏗️ Technical Architecture

### **Frontend Stack**
- **React.js**: Modern component-based UI framework
- **TensorFlow.js**: Client-side machine learning for real-time image classification
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Vite**: Fast build tool and development server
- **Web APIs**: Geolocation, Speech Recognition, Speech Synthesis

### **Backend Stack**
- **Node.js + Express**: RESTful API server
- **Google Gemini AI**: Advanced language model for complaint generation
- **PDFKit**: PDF generation with Unicode support
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

### **AI & Machine Learning**
- **Custom TensorFlow.js Model**: Trained on infrastructure images
- **Teachable Machine Format**: Easy model deployment and updates
- **Google Gemini**: Context-aware text generation
- **Multi-language Processing**: Support for 6 languages

## 📁 Project Structure

```
InfraVision/
├── client/                     # React frontend application
│   ├── public/
│   │   ├── model/             # TensorFlow.js model files
│   │   │   ├── model.json     # Model architecture
│   │   │   ├── metadata.json  # Model metadata
│   │   │   └── weights.bin    # Model weights
│   │   ├── assets/            # Static assets
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/        # React components
│   │   │   └── ComplaintCard.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Main dashboard
│   │   │   └── LandingPage.jsx # Landing page
│   │   ├── assets/            # Images and media
│   │   ├── App.jsx            # Main app component
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # App entry point
│   ├── package.json
│   ├── tailwind.config.js     # TailwindCSS configuration
│   └── vite.config.js         # Vite configuration
├── server/                     # Node.js backend
│   ├── controllers/           # Request handlers
│   │   └── complaintController.js
│   ├── routes/               # API routes
│   │   └── complaintRoutes.js
│   ├── services/             # Business logic
│   │   ├── geminiService.js  # Gemini AI integration
│   │   └── pdfService.js     # PDF generation
│   ├── uploads/              # User uploaded images
│   ├── feedback_uploads/     # Feedback images
│   ├── fonts/                # Font files for PDF
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env                  # Environment variables
├── README.md
└── DOCUMENTATION.md           # Detailed documentation
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Backend Setup

1. Navigate to the server directory:
```bash
cd InfraVision/server
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note**: Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```
The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd InfraVision/client
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## 🚀 Usage Guide

### **Getting Started**
1. **Open the Application**: Navigate to `http://localhost:5173`
2. **Model Loading**: The AI model loads automatically (wait for success message)
3. **Enter Your Information**: Fill in your name and contact details

### **Analyzing Infrastructure Issues**
1. **Upload Image**: Drag and drop or click to select an infrastructure image
2. **Location Detection**: Allow location access for automatic GPS detection
3. **AI Analysis**: Click "Analyze Image" to detect infrastructure issues
4. **Review Prediction**: Check the detected category and confidence score
5. **Provide Feedback**: Mark predictions as correct/incorrect to improve accuracy

### **Generating Complaints**
1. **Language Selection**: Choose your preferred language (Telugu, Tamil, Hindi, etc.)
2. **Automatic Generation**: AI creates professional complaint letters based on the detected issue
3. **Review Content**: Check the generated complaint in both English and your selected language
4. **AI Assistant**: Use the chat feature for help and modifications

### **Export Options**
- **Copy Text**: Copy complaint to clipboard for pasting elsewhere
- **Download PDF**: Generate professional PDF (with instructions for non-English languages)
- **Voice Features**: Listen to complaints using text-to-speech
- **Voice Input**: Use speech-to-text for chatting with AI assistant

## 🌐 Deployment

### Backend Deployment (Render.com)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `PORT`: 5000
   - `NODE_ENV`: production

### Frontend Deployment (Vercel/Netlify)

1. **Vercel**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `build`
   - Deploy

2. **Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy

### Environment Configuration

**Frontend Environment Variables:**
Create a `.env` file in the client directory:
```env
VITE_BACKEND_URL=https://your-backend-url.com
```

**Backend Environment Variables:**
```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key
```

## 🤖 AI & Technology Details

### **Image Classification Model**
- **Model Type**: TensorFlow.js (Teachable Machine format)
- **Input Size**: 224x224 pixels RGB images
- **Classes**: 4 categories (Garbage, Damaged Road, Electric Pole, Manhole)
- **Architecture**: MobileNet-based CNN
- **Inference**: Real-time client-side processing
- **Accuracy**: Optimized for mobile and web deployment

### **Language Model Integration**
- **Provider**: Google Gemini AI
- **Capabilities**: Multi-language text generation, context understanding
- **Supported Languages**: English, Telugu, Tamil, Hindi, Kannada, Malayalam
- **Features**: Location-aware complaint generation, professional formatting

### **Technical Features**
- **PDF Generation**: Custom Unicode support with fallback instructions
- **Real-time Processing**: Instant image analysis and text generation
- **Responsive Design**: Optimized for all device types
- **Voice Integration**: Speech recognition and synthesis

## 📱 Device Compatibility

### **Fully Responsive Design**
- **Desktop**: Full feature support with optimized layout
- **Tablets**: Touch-optimized interface with gesture support
- **Mobile Phones**: Mobile-first design with simplified navigation
- **Touch Devices**: Drag-and-drop, touch gestures, voice input

### **Browser Support**
- **Chrome**: Full feature support including voice recognition
- **Firefox**: Complete functionality with PDF generation
- **Safari**: iOS/macOS optimized with location services
- **Edge**: Windows integration with voice features

## 🔧 Customization

### **Adding New Categories**
1. Retrain the TensorFlow.js model with new image categories
2. Update the model files in `client/public/model/`
3. Modify complaint generation prompts in `geminiService.js`
4. Add new category handling in the frontend components

### **Adding New Languages**
1. Update language options in `Home.jsx`
2. Add language-specific prompts in `geminiService.js`
3. Test complaint generation in the new language
4. Update PDF generation font support if needed

### **Styling & Theming**
- **Framework**: TailwindCSS with custom configurations
- **Color Scheme**: Blue-purple gradient theme with modern aesthetics
- **Components**: Modular, reusable design system
- **Animations**: Smooth transitions and loading states

## 🐛 Troubleshooting

### **Common Issues & Solutions**

1. **Model Loading Failed**:
   - Verify all model files exist: `model.json`, `metadata.json`, `weights.bin`
   - Check browser console for loading errors
   - Ensure stable internet connection for initial load

2. **Gemini API Issues**:
   - Verify `GEMINI_API_KEY` is set in server `.env` file
   - Check API key validity and quota limits
   - Review server logs for detailed error messages

3. **PDF Generation Problems**:
   - Non-English text may show as boxes (expected behavior)
   - Follow in-PDF instructions for proper Unicode display
   - Use web interface copy function for accurate text

4. **Location Services**:
   - Enable location permissions in browser
   - Manual location editing available if GPS fails
   - Check HTTPS requirement for location API

5. **Voice Features Not Working**:
   - Ensure HTTPS connection (required for microphone access)
   - Check browser permissions for microphone
   - Verify browser supports Web Speech API

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 InfraVision Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 📞 Contact

For questions, suggestions, or support, please contact:

- InfraVision Team
- Email: s.shanmukhasaireddy@gmail.com
- Live Website: [https://infravison.onrender.com/](https://infravison.onrender.com/)

---

**InfraVision** - Making infrastructure monitoring smarter with AI! 🚀
