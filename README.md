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
- **Backend**: Node.js + Express for image upload handling and AI-powered complaint generation
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
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── feedback_uploads/
│   ├── server.js
│   └── package.json
├── tm-my-image-model/      # Custom AI model files
├── AI_SETUP.md             # AI setup instructions
├── DEPLOYMENT.md           # Deployment guide
├── README.md               # Project documentation
└── InfraVision_Project_Submission.docx # Project report
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
# WatsonX.ai Configuration (Primary AI Service)
WATSONX_API_KEY=your_watsonx_api_key_here
WATSONX_PROJECT_ID=your_watsonx_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
# OpenAI Configuration (Fallback AI Service)
OPENAI_API_KEY=your_openai_api_key_here
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
npm run dev
```
The frontend will run on `http://localhost:5173`

## 🚀 Usage

1. **Open the Application**: Navigate to `http://localhost:5173`
2. **Wait for Model Loading**: The AI model will load automatically (you'll see a success message)
3. **Upload an Image**: Drag and drop or click to select an infrastructure image
4. **Analyze**: Click "Analyze Image" to run the AI classification
5. **Review Results**: View the detected category, confidence scores, and generated complaint
6. **Export**: Copy the message or print as PDF

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions, including environment variables, production build steps, and hosting recommendations.

## 🤖 AI Model Details

- **Model Type**: TensorFlow.js (Teachable Machine format)
- **Input Size**: 224x224 pixels
- **Classes**: 4 (Garbage, Damaged Road, Electric Pole, Manhole)
- **Framework**: MobileNet-based architecture
- **Inference**: Client-side using TensorFlow.js
- **Model Files**: Located in `client/public/model/` and `tm-my-image-model/`
- **Setup**: See [AI_SETUP.md](./AI_SETUP.md) for details on model usage and integration, including WatsonX.ai and OpenAI configuration.

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
- Email: s.shanmukhasaireddy13@gmail.com


---

**InfraVision** - Making infrastructure monitoring smarter with AI! 🚀
