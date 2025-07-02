import geminiService from '../services/geminiService.js';

const generateComplaintText = async (req, res) => {
  const { label, latitude, longitude, userName, userDetails, imageBase64, localLang, placeName } = req.body;
  if (!label || !latitude || !longitude || !userName) {
    return res.status(400).json({ error: 'label, latitude, longitude, and userName are required' });
  }

  const prompt = `\nYou are a concerned citizen writing a formal complaint letter to the local municipal authority regarding an infrastructure issue. Please generate a well-structured, polite, and professional letter suitable for submission to a government office. The letter should include:\n\n- A formal salutation (e.g., To The Municipal Commissioner)\n- The sender's name and contact details\n- A clear subject line mentioning the detected issue\n- A detailed description of the issue (Detected issue: ${label})\n- The exact location (GPS Coordinates: ${latitude}, ${longitude})\n- The impact on the public and urgency\n- A specific, actionable request for resolution\n- Guidance on where and how to submit this complaint (e.g., "This letter can be submitted to the local municipal office, online grievance portal, or via email as per the city's complaint process.")\n- A formal closing and signature\n\nSender's Name: ${userName}\nSender's Contact: ${userDetails || '[Not provided]'}\n\nLimit: 180 words. Use clear, formal, and respectful language. Format the letter for official government correspondence.`.trim();

  try {
    const { englishComplaint, localComplaint } = await geminiService.generateComplaint(prompt, imageBase64, { label }, `${latitude}, ${longitude}`, localLang, placeName);
    res.json({ englishComplaint, localComplaint, label });
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate complaint' });
  }
};

const chatHelp = async (req, res) => {
  const { messages, imageBase64, prediction, location, complaintPrompt, localLang, userName, placeName } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Compose a prompt for Gemini
  let contextMsg = `You are a friendly and helpful assistant. Answer the user's last question in a user-friendly, informative, and supportive way. If helpful, provide links to relevant places, resources, or government portals. Use the image, prediction, and location if they are relevant to the user's question. Do NOT generate a complaint letter unless the user specifically asks for one.\n`;
  if (userName) contextMsg += `The user's name is ${userName}.\n`;
  if (placeName) contextMsg += `The detected place name is ${placeName}.\n`;
  messages.forEach(msg => {
    contextMsg += `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}\n`;
  });

  try {
    const { aiText } = await geminiService.generateChatResponse(contextMsg, imageBase64, prediction, location, localLang);
    res.json({ aiText });
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI help response' });
  }
};

export { generateComplaintText, chatHelp }; 