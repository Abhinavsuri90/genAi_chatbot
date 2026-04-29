import React, { useState, useRef, useEffect } from 'react';

const PERSONAS = {
  anshuman: {
    id: 'anshuman',
    name: 'Anshuman Singh',
    title: 'CEO, Scaler Academy',
    description: 'Direct, data-driven, practical builder',
    suggestions: [
      'How do I learn coding fast?',
      'What should I build to get a job?',
      'How do I stay motivated?',
    ],
  },
  abhimanyu: {
    id: 'abhimanyu',
    name: 'Abhimanyu Saxena',
    title: 'Co-founder, InterviewBit',
    description: 'Strategic thinker, career focused',
    suggestions: [
      'What skills matter most for jobs?',
      'Frontend or backend - which should I pick?',
      'How do I prepare for system design?',
    ],
  },
  kshitij: {
    id: 'kshitij',
    name: 'Kshitij Mishra',
    title: 'Co-founder, Scaler',
    description: 'Pedagogical expert, learning architect',
    suggestions: [
      'I struggle with algorithms, help me?',
      'How do I retain what I learn?',
      'I have 3 months to prepare for interviews',
    ],
  },
};

export default function App() {
  const [currentPersona, setCurrentPersona] = useState('anshuman');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const persona = PERSONAS[currentPersona];

  useEffect(() => {
    // Reset conversation when switching personas
    setMessages([]);
    setInput('');
    setError('');
  }, [currentPersona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          persona: currentPersona,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const botMessage = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Choose Persona</h2>
        <div className="persona-buttons">
          {Object.values(PERSONAS).map(p => (
            <button
              key={p.id}
              className={`persona-btn ${currentPersona === p.id ? 'active' : ''}`}
              onClick={() => setCurrentPersona(p.id)}
            >
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>{p.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <h1>{persona.name}</h1>
          <p>{persona.description}</p>
        </div>

        {/* Messages */}
        <div className="messages">
          {messages.length === 0 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#999',
              textAlign: 'center',
            }}>
              <div>
                <h2 style={{ marginBottom: '10px', color: '#667eea' }}>
                  Chat with {persona.name}
                </h2>
                <p>Ask any question and get insights from their perspective</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
                <div className="message-bubble">{msg.content}</div>
              </div>
            ))
          )}

          {loading && (
            <div className="message bot">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div style={{ flex: 1 }}>
            {messages.length === 0 && (
              <div className="suggestions">
                {persona.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="suggestion-chip"
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Ask a question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage(input)}
                disabled={loading}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
