import React, { useState, useRef, useEffect } from 'react';
import { BsChatDotsFill, BsX, BsSendFill } from 'react-icons/bs';
import './chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your AI assistant. Ask me anything about this website.", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const userMessage = { text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setLoading(true);

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text })
            });
            const data = await response.json();

            // Add bot response
            setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server.", sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <span>AI Assistant</span>
                        <BsX size={24} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="message bot">Thinking...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chatbot-input-area" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Type a message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <button type="submit" className="chatbot-send">
                            <BsSendFill size={14} />
                        </button>
                    </form>
                </div>
            )}

            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <BsX size={30} color="#fff" /> : <BsChatDotsFill size={25} color="#fff" />}
            </button>
        </div>
    );
};

export default Chatbot;
