# AI-Powered Complaint Generation Setup

InfraVision now includes smart complaint generation using WatsonX.ai (primary) and OpenAI (fallback) to create more detailed and context-aware complaint letters.

## Features

- **Smart Complaint Generation**: AI-powered complaints that are more detailed and context-aware
- **Location Integration**: Uses provided location data for more specific complaints
- **Confidence-Based Severity**: Adjusts urgency based on AI prediction confidence
- **Fallback System**: Falls back to template-based complaints if AI services are unavailable
- **Multiple AI Providers**: Supports both WatsonX.ai and OpenAI

## Setup Instructions

### 1. Backend Dependencies

The backend now includes additional dependencies for AI integration:
- `ibm-watson`: WatsonX.ai SDK
- `openai`: OpenAI API client
- `axios`: HTTP client for API calls

### 2. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000

# WatsonX.ai Configuration (Primary AI Service)
WATSONX_API_KEY=your_watsonx_api_key_here
WATSONX_PROJECT_ID=your_watsonx_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com

# OpenAI Configuration (Fallback AI Service)
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Custom WatsonX URL (if using different region)
# WATSONX_URL=https://eu-de.ml.cloud.ibm.com
```

### 3. Getting API Keys

#### WatsonX.ai Setup
1. Go to [IBM WatsonX.ai](https://www.ibm.com/products/watsonx-ai)
2. Create an account and set up a project
3. Generate an API key
4. Note your project ID
5. Add these to your `.env` file

#### OpenAI Setup (Fallback)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and generate an API key
3. Add the API key to your `.env` file

### 4. Running the Application

1. **Start the Backend Server**:
   ```bash
   cd InfraVision/server
   npm install
   npm start
   ```

2. **Start the Frontend**:
   ```bash
   cd InfraVision/client
   npm run dev
   ```

## How It Works

### 1. AI Pipeline
1. User uploads an image and provides location
2. TensorFlow.js model analyzes the image locally
3. Prediction results are sent to the backend
4. Backend generates a smart complaint using AI
5. Frontend displays the AI-generated complaint

### 2. Smart Features
- **Context-Aware**: Uses prediction confidence, location, and issue type
- **Severity Adjustment**: Higher confidence = higher urgency
- **Detailed Prompts**: Includes all prediction details for better AI responses
- **Professional Format**: Generates properly formatted complaint letters

### 3. Fallback System
If AI services are unavailable or fail:
1. Falls back to template-based complaints
2. Maintains all functionality
3. Shows user-friendly error messages

## API Endpoints

### POST `/api/generate-complaint`
Generates a smart complaint using AI.

**Request Body**:
```json
{
  "prediction": {
    "label": "Garbage",
    "confidence": "85.5",
    "allPredictions": [
      {"label": "Garbage", "confidence": "85.5"},
      {"label": "Damaged Road", "confidence": "10.2"},
      {"label": "Electric Pole", "confidence": "3.1"},
      {"label": "Manhole", "confidence": "1.2"}
    ]
  },
  "imageUrl": "/uploads/image-123.jpg",
  "location": "123 Main Street, City, State"
}
```

**Response**:
```json
{
  "success": true,
  "complaint": "Subject: URGENT - Garbage Accumulation Issue...",
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

## Customization

### Modifying AI Prompts
Edit the `buildPrompt()` method in `services/aiComplaintService.js` to customize:
- Prompt structure
- Context information
- Output format requirements

### Adding New AI Providers
1. Add new provider configuration to the constructor
2. Create a new generation method (e.g., `generateWithNewProvider()`)
3. Update the `generateSmartComplaint()` method to include the new provider

### Template Customization
Modify the `generateTemplateComplaint()` method to customize fallback templates.

## Troubleshooting

### Common Issues

1. **"No AI service configured"**
   - Check your `.env` file has the required API keys
   - Verify API keys are valid and have proper permissions

2. **"Error generating smart complaint"**
   - Check network connectivity
   - Verify API quotas and limits
   - Check server logs for detailed error messages

3. **WatsonX.ai API errors**
   - Verify project ID and API key
   - Check if the model is available in your region
   - Ensure proper authentication headers

### Debug Mode
Enable detailed logging by adding to your `.env`:
```env
DEBUG=ai-complaint-service
```

## Security Considerations

1. **API Key Protection**: Never commit API keys to version control
2. **Rate Limiting**: Implement rate limiting for the complaint generation endpoint
3. **Input Validation**: All inputs are validated before processing
4. **Error Handling**: Sensitive information is not exposed in error messages

## Performance Optimization

1. **Caching**: Consider implementing response caching for similar complaints
2. **Async Processing**: For high-volume usage, consider queue-based processing
3. **Connection Pooling**: Optimize database connections if adding persistence

## Future Enhancements

- **Multi-language Support**: Generate complaints in different languages
- **Custom Templates**: Allow users to create custom complaint templates
- **Historical Analysis**: Track complaint patterns and effectiveness
- **Integration**: Connect with municipal complaint systems 