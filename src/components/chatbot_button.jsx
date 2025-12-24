import { useState } from 'react';
import ChatWindow from './chat_window.jsx';
import '../styles/chatbot.css';

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="chatbot-floating-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}