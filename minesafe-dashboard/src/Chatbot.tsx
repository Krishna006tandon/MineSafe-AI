import { useState } from 'react';
import './Chatbot.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const featureButtons = [
  { icon: '🔧', text: 'Equipment Queries', response: 'What equipment would you like to know about?' },
  { icon: '📋', text: 'Safety Checklists', response: 'Here are the safety checklists for today.' },
  { icon: '📊', text: 'Production Reports', response: 'Generating production reports for the last 24 hours.' },
  { icon: '🆘', text: 'Emergency Help', response: 'Contacting emergency services. Please provide details of the emergency.' },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simple echo bot for demonstration
    setTimeout(() => {
      const botMessage: Message = { text: `You said: ${inputValue}`, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFeatureClick = (feature: typeof featureButtons[0]) => {
    const userMessage: Message = { text: feature.text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = { text: feature.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <span>⛏️</span>
      </div>
      {isOpen && (
        <div id="chatbot" className={`chatbot-fullscreen ${isOpen ? 'open' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="online-indicator"></div>
              <h2>Mining Assistant</h2>
            </div>
            <button className="close-chatbot" onClick={toggleChatbot}>X</button>
          </div>
          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="feature-buttons">
                {featureButtons.map((feature, index) => (
                  <button key={index} className="feature-btn" onClick={() => handleFeatureClick(feature)}>
                    <span className="icon">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="avatar">{msg.sender === 'user' ? 'U' : 'B'}</div>
                <p>{msg.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing-indicator">
                <div className="avatar">B</div>
                <p>Typing...</p>
              </div>
            )}
            {messages.length > 0 && messages.length === 0 && (
              <div className="placeholder-text">
                <p>Ask me anything about mining operations.</p>
              </div>
            )}
          </div>
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chatbot-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button type="submit" className="chatbot-send-btn">Send</button>
          </form>
        </div>
      )}
    </>
  );
}
