
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessageData } from '../types';

const ChatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.68-3.091a4.501 4.501 0 00-3.429-1.33L12 14.306V9.511a4.501 4.501 0 00-3.43-1.33S7.843 8 7.5 8H4.5A2.25 2.25 0 002.25 10.25v3.5A2.25 2.25 0 004.5 16h1.028M16.5 9H20.25a2.25 2.25 0 012.25 2.25v3.5A2.25 2.25 0 0120.25 17h-3.75" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentMessage.trim() === '') return;

    const newMessage: ChatMessageData = {
      id: new Date().toISOString(),
      text: currentMessage.trim(),
      sender: 'Usuario',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setCurrentMessage('');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-slate-700 hover:bg-slate-800 text-white p-4 rounded-full shadow-lg transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Abrir chat"
        aria-expanded={isOpen}
      >
        <ChatIcon />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-slate-50 w-80 shadow-xl transition-transform duration-300 ease-in-out z-40 flex flex-col
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-popup-header"
      >
        {/* Header */}
        <header className="bg-slate-700 text-white p-4 flex justify-between items-center">
          <h2 id="chat-popup-header" className="text-lg font-semibold">Chat de Comentarios</h2>
          <button onClick={toggleChat} className="text-slate-300 hover:text-white" aria-label="Cerrar chat">
            <CloseIcon />
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-grow p-4 space-y-3 overflow-y-auto bg-white">
          {messages.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-4">No hay mensajes aún. ¡Sé el primero!</p>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`p-3 rounded-lg max-w-[85%] ${
              msg.sender === 'Usuario' ? 'bg-slate-200 ml-auto' : 'bg-slate-100'
            }`}>
              <p className="text-sm text-slate-800">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'Usuario' ? 'text-slate-500 text-right' : 'text-slate-400'
              }`}>
                {msg.sender} - {msg.timestamp}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-slate-100">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-grow p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
              aria-label="Nuevo mensaje"
            />
            <button
              type="submit"
              className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-md transition-colors"
              aria-label="Enviar mensaje"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      {/* Overlay for when chat is open, helps with accessibility */}
      {isOpen && (
         <div
           className="fixed inset-0 bg-black/30 z-30"
           onClick={toggleChat}
           aria-hidden="true"
         ></div>
      )}
    </>
  );
};

export default ChatPopup;
