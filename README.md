# InfraVision - AI-Powered Infrastructure Monitoring

InfraVision is a full-stack MERN application that uses AI to detect and classify infrastructure issues from images, automatically generating professional complaint messages for municipal authorities.

## 🚀 Features

- **AI-Powered Image Analysis**: Uses TensorFlow.js with a custom-trained model to classify infrastructure issues
- **Four Detection Categories**: Garbage, Damaged Road, Electric Pole, Manhole
- **Automatic Complaint Generation**: Creates professional complaint messages based on detected issues
- **Modern UI/UX**: Beautiful, responsive design with drag-and-drop image upload
- **Export Options**: Copy to clipboard or print as PDF
- **Real-time Confidence Scores**: Shows prediction confidence for all categories

## 🏗️ Architecture

- **Frontend**: React.js with TensorFlow.js for client-side AI inference
- **Backend**: Node.js + Express for image upload handling
- **AI Model**: TensorFlow.js model (Teachable Machine format) for image classification
- **Styling**: Modern CSS with responsive design

## 📁 Project Structure

```
InfraVision/
├── client/                 # React frontend
│   ├── public/
│   │   ├── model/         # TensorFlow.js model files
│   │   │   ├── model.json
│   │   │   ├── metadata.json
│   │   │   └── weights.bin
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── ComplaintCard.jsx
│   │   │   └── ComplaintCard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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
```bash
PORT=5000
NODE_ENV=development
```

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
npm start
```

The frontend will run on `http://localhost:3000`

## 🚀 Usage

1. **Open the Application**: Navigate to `http://localhost:3000`
2. **Wait for Model Loading**: The AI model will load automatically (you'll see a success message)
3. **Upload an Image**: Drag and drop or click to select an infrastructure image
4. **Analyze**: Click "Analyze Image" to run the AI classification
5. **Review Results**: View the detected category, confidence scores, and generated complaint
6. **Export**: Copy the message or print as PDF

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

For production, update the backend URL in the frontend:

```javascript
// In ComplaintCard.jsx, update the image URL
src={`https://your-backend-url.com${imageUrl}`}
```

## 🤖 AI Model Details

- **Model Type**: TensorFlow.js (Teachable Machine format)
- **Input Size**: 224x224 pixels
- **Classes**: 4 (Garbage, Damaged Road, Electric Pole, Manhole)
- **Framework**: MobileNet-based architecture
- **Inference**: Client-side using TensorFlow.js

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones
- Touch devices

## 🔧 Customization

### Adding New Categories

1. Retrain the model with new categories
2. Update the `classLabels` array in `Home.jsx`
3. Add corresponding complaint templates
4. Update category colors and icons in `ComplaintCard.jsx`

### Styling

- Main styles: `App.css`
- Home component: `Home.css`
- Complaint card: `ComplaintCard.css`
- Color scheme: Purple gradient theme

## 🐛 Troubleshooting

### Common Issues

1. **Model Loading Failed**:
   - Check if model files are in `client/public/model/`
   - Ensure all three files are present: `model.json`, `metadata.json`, `weights.bin`

2. **CORS Errors**:
   - Ensure backend CORS is configured correctly
   - Check if frontend proxy is set to backend URL

3. **Image Upload Issues**:
   - Check file size (max 10MB)
   - Ensure image format is JPG/PNG
   - Verify backend uploads directory exists

4. **Prediction Errors**:
   - Check browser console for TensorFlow.js errors
   - Ensure model is loaded before prediction
   - Verify image format and size

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**InfraVision** - Making infrastructure monitoring smarter with AI! 🚀 