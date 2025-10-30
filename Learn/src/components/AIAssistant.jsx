import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Minimize2, 
  Maximize2, 
  X, 
  Sparkles,
  Bot,
  User,
  Code,
  Lightbulb,
  BookOpen,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi! I\'m your AI learning assistant. I can help you with IoT concepts, code debugging, course explanations, and workspace tasks. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Explain IoT sensors',
        'Help me debug my code',
        'Suggest learning path',
        'Explain MQTT protocol'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userPlan, setUserPlan] = useState('premium'); // 'free', 'pro', 'premium'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = async (userMessage) => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = {
      'sensor': 'IoT sensors are devices that detect and measure physical properties from the environment and convert them into signals that can be read by humans or instruments. Common types include temperature sensors (like DHT22), motion sensors (PIR), light sensors (LDR), and humidity sensors. They typically work by converting physical phenomena into electrical signals that microcontrollers can process.',
      'debug': 'I\'d be happy to help you debug your code! Could you share the specific error message or describe what\'s not working as expected? Common IoT issues include: 1) Wiring problems - check connections, 2) Power supply issues - ensure adequate voltage, 3) Code syntax errors - review your syntax, 4) Library conflicts - verify compatible libraries. Share your code snippet and I\'ll provide specific guidance.',
      'learning': 'Based on your current progress, I recommend this learning path: 1) Start with "IoT Fundamentals" to understand core concepts, 2) Move to "Arduino Programming" for hands-on skills, 3) Take "Sensor Integration" for practical applications, 4) Progress to "IoT Security" for advanced topics. Each course builds on the previous one and includes practical projects.',
      'mqtt': 'MQTT (Message Queuing Telemetry Transport) is a lightweight messaging protocol designed for IoT devices. It works on a publish-subscribe model where devices (clients) publish messages to topics, and other clients subscribe to those topics. Key components: 1) Broker - manages message distribution, 2) Topics - hierarchical message channels, 3) QoS levels - message delivery guarantees. It\'s ideal for IoT because it\'s bandwidth-efficient and works well on unreliable networks.',
      'default': 'I can help you with various IoT and EcoSwarm topics including: sensor integration, programming Arduino, IoT protocols (MQTT, HTTP), cloud connectivity, device simulation, security best practices, and course guidance. What specific area would you like to explore?'
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('sensor')) {
      return responses.sensor;
    } else if (lowerMessage.includes('debug') || lowerMessage.includes('error') || lowerMessage.includes('problem')) {
      return responses.debug;
    } else if (lowerMessage.includes('learn') || lowerMessage.includes('course') || lowerMessage.includes('path')) {
      return responses.learning;
    } else if (lowerMessage.includes('mqtt')) {
      return responses.mqtt;
    } else {
      return responses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Generate AI response
    const aiResponse = await generateAIResponse(message);
    
    const assistantMessage = {
      id: messages.length + 2,
      type: 'assistant',
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Tell me more',
        'Show me an example',
        'Help me practice',
        'Explain in simpler terms'
      ]
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const handleFeedback = (messageId, isPositive) => {
    // In a real app, this would send feedback to improve the AI
    console.log(`Feedback: ${isPositive ? 'positive' : 'negative'} for message ${messageId}`);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group z-50"
      >
        <Bot className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="font-semibold mb-1">AI Learning Assistant</div>
          <div className="text-xs text-gray-300">
            Get help with courses, code, and IoT concepts
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-emerald-200 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold">AI Assistant</div>
            <div className="text-xs opacity-90">
              {userPlan === 'premium' ? 'Advanced AI' : userPlan === 'pro' ? 'Standard AI' : 'Basic AI'}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="h-[440px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center mb-1">
                    {msg.type === 'assistant' && <Bot className="w-3 h-3 text-emerald-600 mr-1" />}
                    {msg.type === 'user' && <User className="w-3 h-3 text-blue-600 mr-1" />}
                    <span className="text-xs text-emerald-600">{msg.timestamp}</span>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                    
                    {msg.type === 'assistant' && (
                      <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => copyToClipboard(msg.content)}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, true)}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, false)}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <ThumbsDown className="w-3 h h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Suggestions */}
                  {msg.type === 'assistant' && msg.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs hover:bg-emerald-200 transition-colors duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 p-3 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-emerald-200 p-4">
            {userPlan === 'free' && (
              <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                <AlertCircle className="w-3 h-3 inline mr-1" />
                Upgrade to Pro or Premium for unlimited AI assistance
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about IoT or your courses..."
                className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
                className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-xs text-emerald-600">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Usually responds instantly
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {userPlan !== 'free' ? 'Unlimited questions' : '5 questions remaining'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
