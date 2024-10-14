import React, { useState } from 'react';

const ChatInput = ({ sendMessage, setUsername }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="نام کاربری خود را وارد کنید"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="پیام خود را وارد کنید"
      />
      <button onClick={handleSend}>ارسال</button>
    </div>
  );
};

export default ChatInput;
