import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.username}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
