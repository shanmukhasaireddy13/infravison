import React, { useState, useRef, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import handWave from '../assets/hand_wave.png';
import headerImg from '../assets/header_img.png';

const MODEL_URL = '/model/model.json';
const METADATA_URL = '/model/metadata.json';
const API_URL = '/api/ai-chat';
const COMPLAINT_API_URL = '/api/generate-complaint';
const CHAT_HELP_API_URL = '/api/chat-help';

function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow p-4 border border-gray-200 ${className}`}>
      {title && <h2 className="text-lg font-bold mb-3 text-blue-700 flex items-center gap-2">
        {title}
      </h2>}
      {children}
    </div>
  );
}

async function getAddressFromCoords(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    if (data.address) {
      const { road, suburb, city, town, village, state, country } = data.address;
      const parts = [road, suburb, city || town || village, state, country].filter(Boolean);
      if (parts.length > 0) {
        return `${parts.join(', ')} (${lat}, ${lon})`;
      }
    }
    return (data.display_name ? `${data.display_name} (${lat}, ${lon})` : `${lat}, ${lon}`);
  } catch {
    return `${lat}, ${lon}`;
  }
}

function renderMarkdown(text) {
  if (!text) return '';
  let html = text.replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\n- (.*?)(?=\n|$)/g, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
  html = html.replace(/\n/g, '<br/>');
  return html;
}

const Home = () => {
  // State
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [location, setLocation] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const [englishComplaint, setEnglishComplaint] = useState('');
  const [localComplaint, setLocalComplaint] = useState('');
  const [localLang, setLocalLang] = useState('te');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [userName, setUserName] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef();
  const [locationLoading, setLocationLoading] = useState(false);
  const suggestionChips = [
    'Request urgent action for this issue',
    'Ask for a follow-up or status update',
    'Request a summary of the complaint',
    'Ask for the next steps after submitting the complaint'
  ];
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [geoPrompt, setGeoPrompt] = useState(false);
  const [geoDenied, setGeoDenied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [correctionText, setCorrectionText] = useState('');
  const [correctionImage, setCorrectionImage] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    tmImage.load(MODEL_URL, METADATA_URL).then(setModel);
  }, []);

  // Prompt for geolocation on mount if not already granted
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'prompt') setGeoPrompt(true);
        if (result.state === 'denied') setGeoDenied(true);
      });
    }
  }, []);

  // Drag-and-drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelect({ target: { files: [e.dataTransfer.files[0]] } });
    }
  };

  // Image select/upload
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setPrediction(null);
      setComplaint('');
      setError('');
      setMessages([]);
      setLocation('');
      setLocationLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
          const address = await getAddressFromCoords(pos.coords.latitude, pos.coords.longitude);
          setLocation(address);
          let place = '';
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
            const data = await res.json();
            place = data.address?.city || data.address?.town || data.address?.village || data.address?.road || data.address?.suburb || '';
          } catch {}
          setPlaceName(place);
          setLocationLoading(false);
        }, () => {
          setLocation('');
          setPlaceName('');
          setLocationLoading(false);
        });
      } else {
        setLocationLoading(false);
        setPlaceName('');
      }
    }
  };

  // Predict
  const handlePredict = async () => {
    if (!model || !selectedImage) return;
    setIsPredicting(true);
    setPrediction(null);
    setComplaint('');
    setEnglishComplaint('');
    setLocalComplaint('');
    setError('');
    setMessages([]);
    const img = new window.Image();
    img.src = selectedImage;
    img.onload = async () => {
      try {
        const results = await model.predict(img);
        const best = results.reduce((a, b) => (a.probability > b.probability ? a : b));
        const pred = { label: best.className, confidence: (best.probability * 100).toFixed(2) };
        setPrediction(pred);
        setIsGenerating(true);
        const res = await fetch(COMPLAINT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            label: pred.label,
            latitude: latitude,
            longitude: longitude,
            userName,
            userDetails,
            imageBase64,
            localLang
          })
        });
        const data = await res.json();
        console.log('Complaint API response:', data);
        setEnglishComplaint(data.englishComplaint || '');
        setLocalComplaint(data.localComplaint || '');
        setComplaint(data.englishComplaint || data.complaint || data.complaintText || 'No complaint generated.');
      } catch (err) {
        setPrediction({ label: 'Unknown' });
        setError('Failed to analyze image or generate complaint.');
      }
      setIsPredicting(false);
      setIsGenerating(false);
    };
  };

  // Chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const getComplaintPrompt = (prediction, location) => {
    return `Write a formal complaint about a [${prediction.label}] in a residential area. Include the problem, impact on citizens, and a polite request to resolve the issue. Return the complaint in plain text. Location: ${location || '[Not provided]'}`;
  };
  function speakText(text, lang) {
    if (!window.speechSynthesis) return;
    const utterance = new window.SpeechSynthesisUtterance(text);
    const langMap = {
      te: 'te-IN', ta: 'ta-IN', hi: 'hi-IN', kn: 'kn-IN', ml: 'ml-IN', en: 'en-US'
    };
    utterance.lang = langMap[lang] || 'en-US';
    window.speechSynthesis.speak(utterance);
  }
  const handleSend = async () => {
    if (!input.trim()) return;
    if (!selectedImage || !prediction || !location) {
      setMessages([...messages, { role: 'ai', content: 'Please upload an image and provide the necessary details before asking a question.' }]);
      setInput('');
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        const address = await getAddressFromCoords(pos.coords.latitude, pos.coords.longitude);
        setLocation(address);
        await sendChatWithLocation(address);
      }, async () => {
        await sendChatWithLocation(location);
      });
    } else {
      await sendChatWithLocation(location);
    }
  };
  async function sendChatWithLocation(currentLocation) {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(CHAT_HELP_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          imageBase64,
          prediction,
          location: currentLocation,
          complaintPrompt: prediction ? getComplaintPrompt(prediction, currentLocation) : '',
          localLang,
          userName,
          placeName
        })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'ai', content: data.aiText || 'Sorry, I could not generate a response.' }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'ai', content: 'Error: Could not reach the AI service.' }]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }
  const handleInputChange = (e) => setInput(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleImageRemove = () => {
    setSelectedImage(null);
    setPrediction(null);
    setImageBase64(null);
    setComplaint('');
    setMessages([]);
    setLocation('');
    fileInputRef.current.value = '';
  };
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const langMap = {
      te: 'te-IN', ta: 'ta-IN', hi: 'hi-IN', kn: 'kn-IN', ml: 'ml-IN', en: 'en-US'
    };
    recognition.lang = langMap[localLang] || 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center py-8">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl p-2">
        {/* Left Panel */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <Card title={<><span role="img" aria-label="Upload">📷</span> Upload Image & Issue</>}>
            {/* Drag-and-drop area */}
            {!selectedImage && (
              <>
                {geoPrompt && (
                  <div className="mb-2 text-yellow-700 bg-yellow-100 p-2 rounded">
                    Please allow location access for more accurate complaint letters and suggestions.
                  </div>
                )}
                {geoDenied && (
                  <div className="mb-2 text-red-700 bg-red-100 p-2 rounded">
                    Location access denied. Please enable location in your browser for best results.
                  </div>
                )}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="text-4xl mb-2">📤</div>
                  <div className="font-semibold mb-1">Drag & drop an image here, or click to select</div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                    ref={fileInputRef}
                  />
                  <div className="mt-2 text-sm text-gray-500">If you have a geotagged image, please upload it for more accurate location detection.</div>
                </div>
              </>
            )}
            {selectedImage && !prediction && (
              <>
                <div className="flex flex-col items-center gap-2">
                  <img src={selectedImage} alt="Preview" className="w-40 h-40 object-cover rounded border mb-2" />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
                    onClick={handlePredict}
                    disabled={
                      isPredicting ||
                      !location ||
                      locationLoading ||
                      !userName ||
                      !latitude ||
                      !longitude
                    }
                  >
                    {isPredicting ? 'Analyzing...' : 'Analyze Image'}
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={handleImageRemove}
                  >Remove Image</button>
                </div>
              </>
            )}
            {prediction && (
              <>
                <div className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-center">
                  <span role="img" aria-label="Prediction">🔎</span> {prediction.label} ({prediction.confidence}%)
                </div>
                {/* Feedback UI inside image card */}
                {!feedbackGiven && !feedbackSubmitted && (
                  <div className="mt-3">
                    <div className="mb-2">Is the detected issue correct?</div>
                    <div className="flex gap-2 mb-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => { setFeedback('correct'); setFeedbackGiven(true); }}
                      >Correct</button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => { setFeedback('wrong'); setFeedbackGiven(true); }}
                      >Wrong</button>
                    </div>
                    <div className="text-xs text-gray-500">Your feedback helps us improve the local model.</div>
                  </div>
                )}
                {feedbackGiven && feedback === 'wrong' && !feedbackSubmitted && (
                  <div className="mt-3">
                    <div className="mb-2">Please describe the correct issue or upload a better image (optional):</div>
                    <textarea
                      className="w-full border rounded p-2 mb-2"
                      rows={2}
                      placeholder="Describe the correct issue..."
                      value={correctionText}
                      onChange={e => setCorrectionText(e.target.value)}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="mb-2"
                      onChange={e => setCorrectionImage(e.target.files[0])}
                    />
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={async () => {
                        // Submit feedback to backend
                        const formData = new FormData();
                        formData.append('originalLabel', prediction.label);
                        formData.append('confidence', prediction.confidence);
                        formData.append('userCorrection', correctionText);
                        formData.append('userName', userName);
                        formData.append('location', location);
                        if (correctionImage) formData.append('correctionImage', correctionImage);
                        await fetch('/api/feedback', {
                          method: 'POST',
                          body: formData
                        });
                        setFeedbackSubmitted(true);
                      }}
                    >Submit Feedback</button>
                  </div>
                )}
                {feedbackSubmitted && (
                  <div className="mt-3 text-green-600">Thank you for your feedback! It will help us improve the local model.</div>
                )}
              </>
            )}
            {isPredicting && <div className="text-blue-600 font-semibold mt-2">Analyzing image...</div>}
          </Card>
          <Card title={<><span role="img" aria-label="User">👤</span> Your Information</>}>
            <label className="block font-semibold mb-1">Your Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <label className="block font-semibold mb-1">Contact Details (optional)</label>
            <input
              type="text"
              value={userDetails}
              onChange={e => setUserDetails(e.target.value)}
              placeholder="Contact Details (optional)"
              className="w-full p-2 border rounded mb-2"
            />
          </Card>
          <Card title={<><span role="img" aria-label="Location">📍</span> Location</>}>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Location (edit if incorrect)"
            />
            {locationLoading && <div className="text-blue-500 text-sm">Detecting your location...</div>}
          </Card>
          {/* Complaint Letter Card */}
          {prediction && (englishComplaint || localComplaint) && (
            <Card title={<><span role="img" aria-label="Letter">📄</span> Complaint Letter</>}>
              <div className="font-semibold mb-1">
                AI-Generated Complaint ({localLang === 'en' ? 'English' : localLang === 'te' ? 'Telugu' : localLang === 'ta' ? 'Tamil' : localLang === 'hi' ? 'Hindi' : localLang === 'kn' ? 'Kannada' : localLang === 'ml' ? 'Malayalam' : 'Local Language'}):
              </div>
              <textarea
                className="w-full border rounded-lg px-3 py-2 mb-2 bg-gray-50"
                value={localLang === 'en' ? englishComplaint : localComplaint}
                readOnly
                rows={8}
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
                  onClick={() => navigator.clipboard.writeText(localLang === 'en' ? englishComplaint : localComplaint)}
                  disabled={!(localLang === 'en' ? englishComplaint : localComplaint)}
                >Copy</button>
                <button
                  className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500"
                  onClick={() => speakText(localLang === 'en' ? englishComplaint : localComplaint, localLang)}
                  disabled={!(localLang === 'en' ? englishComplaint : localComplaint)}
                >🔊 Speak</button>
                <button
                  className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/complaint-pdf', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          complaintText: localLang === 'en' ? englishComplaint : localComplaint,
                          imageBase64
                        })
                      });
                      if (!res.ok) throw new Error('Failed to generate PDF');
                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'complaint.pdf';
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      alert('Failed to download PDF.');
                    }
                  }}
                  disabled={!(localLang === 'en' ? englishComplaint : localComplaint)}
                >Download PDF</button>
              </div>
            </Card>
          )}
        </div>
        {/* Right Panel: Chat */}
        <div className="md:w-1/2 flex flex-col h-[70vh]">
          <Card title={<><span role="img" aria-label="Chat">💬</span> Assistant Chat</>} className="flex-1 flex flex-col">
            {/* Language selector always visible in chat */}
            <div className="mb-2">
              <label className="block font-semibold mb-1">Select Chat Language</label>
              <select
                className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={localLang}
                onChange={e => setLocalLang(e.target.value)}
              >
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
                <option value="ml">Malayalam</option>
                <option value="en">English Only</option>
              </select>
            </div>
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto mb-2 px-1" style={{ maxHeight: '40vh', scrollbarWidth: 'thin' }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-lg shadow ${msg.role === 'user' ? 'bg-blue-100 text-right' : msg.role === 'system' ? 'bg-yellow-100 text-left' : 'bg-gray-100 text-left'}`}
                  >
                    <div className="flex items-center gap-2">
                      {msg.role === 'user' ? (
                        <span className="inline-block w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">U</span>
                      ) : (
                        <span className="inline-block w-6 h-6 rounded-full bg-green-400 text-white flex items-center justify-center font-bold">A</span>
                      )}
                      <span dangerouslySetInnerHTML={msg.role === 'ai' ? { __html: renderMarkdown(msg.content) } : { __html: msg.content.replace(/\n/g, '<br/>') }} />
                    </div>
                  </div>
                  {msg.role === 'ai' && (
                    <button
                      className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-blue-200 text-sm"
                      onClick={() => speakText(msg.content, localLang)}
                      title="Speak"
                      type="button"
                    >🔊</button>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex mb-3 justify-start">
                  <div className="max-w-[75%] px-4 py-2 rounded-lg shadow bg-gray-100 text-left flex items-center">
                    <img src={handWave} alt="AI typing" className="h-5 w-5 mr-2 animate-bounce" />
                    <span className="italic text-gray-500">AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* Chat input */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={
                  locationLoading
                    ? "Detecting your location..."
                    : listening
                    ? "Listening... Speak now."
                    : "Ask a question or request a complaint letter..."
                }
                value={input}
                onChange={handleInputChange}
                onKeyDown={e => e.key === 'Enter' && !loading && !locationLoading && selectedImage && prediction && location && handleSend()}
                disabled={loading || locationLoading || !selectedImage || !prediction || !location}
              />
              <button
                onClick={listening ? stopListening : startListening}
                className={`px-3 py-2 rounded-lg ${listening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} font-semibold`}
                disabled={loading || locationLoading || !selectedImage || !prediction || !location}
                title={listening ? 'Stop Listening' : 'Start Voice Input'}
                type="button"
              >
                {listening ? '⏹️' : '🎤'}
              </button>
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                disabled={loading || locationLoading || !selectedImage || !prediction || !location || !input.trim()}
              >
                Send
              </button>
            </div>
            <div className="flex flex-wrap gap-2 my-2">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  className="bg-gray-200 hover:bg-blue-200 text-gray-800 px-3 py-1 rounded-full text-sm transition"
                  onClick={() => setInput(chip)}
                  type="button"
                >
                  {chip}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default Home;