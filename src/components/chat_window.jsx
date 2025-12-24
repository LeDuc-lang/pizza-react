// src/components/chatWindow.jsx
import { useState, useRef, useEffect, useContext } from 'react';
import { sendMessageWithContext } from '../services/chat_service.js';
import { StoreContext } from '../store/store_panier.jsx';
import '../styles/chatbot.css';

export default function ChatWindow({ onClose }) {
  const { state } = useContext(StoreContext);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Bonjour! Je peux vous aider à choisir une pizza!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Passer le contexte des pizzas disponibles
      const response = await sendMessageWithContext(userMessage, state.pizzas);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Désolé, une erreur est survenue.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>🍕 Assistant Pizza</h3>
        <button onClick={onClose} className="close-button">✕</button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
}