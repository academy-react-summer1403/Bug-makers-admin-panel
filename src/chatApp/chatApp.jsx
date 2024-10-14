import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const socket = io('http://localhost:3000'); // آدرس سرور

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (message) => {
    const msg = { username, text: message };
    socket.emit('sendMessage', msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  return (
    <div className="chat-app">
      <ChatWindow messages={messages} />
      <ChatInput sendMessage={sendMessage} setUsername={setUsername} />
    </div>
  );
};

export default ChatApp;
