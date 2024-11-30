import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot, FaClipboard, FaDownload } from 'react-icons/fa'; 
import { saveAs } from 'file-saver'; 
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';  
import { Button } from 'reactstrap';
import { getRandom, courseData } from '../../../@core/layouts/utils';
import { useMutation } from '@tanstack/react-query';
import { updateCourse } from '../../../@core/api/course/updateCourse';
import AddCategory from './addCategory';
import { Link } from 'react-router-dom';

const LoadingMessage = () => {
  return <div>🤖 در حال تایپ...</div>;
};

const AiChatBot = () => {
  const [isResponse, setIsResponse] = useState(false)
  const [isOpen, setIsOpen] = useState(false); 
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [handleCat, setHandleCat] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (userMessage) => {
    setLoading(true); 

    try {
      const response = await axios.get(
        `https://storegraphic.ir/wp-content/themes/Megawp-Theme/proxy.php?text=${encodeURIComponent(userMessage)}`
      );
      const botMessage = response.data.result.answer;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: 'user' },
        { text: botMessage, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'متاسفانه ربات قادر به پاسخگویی نیست.', sender: 'bot' },
      ]);
    } finally {
      setLoading(false); 
    }
  };

  const handleCopyMessage = (message) => {
    navigator.clipboard.writeText(message)
      .then(() => {
        toast.success('کپی شد');
      })
      .catch((err) => {
        toast.error('خطا در کپی کردن پیام');
        console.error('Error copying message: ', err);
      });
  };

  const handleDownloadChat = () => {
    const chatText = messages
      .map((msg) => `${msg.sender === 'user' ? 'شما' : 'ربات'}: ${msg.text}`)
      .join('\n');

    const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'chat.txt'); 
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'chat-container') {
      setIsOpen(false);
    }
  };

  const createCourse = useMutation({
    mutationKey:['createCourse'],
    mutationFn: (formData) => updateCourse(formData),
    onSuccess: (data) => {
      setHandleCat(true);
      toast((t) => (
        <div>
          <p>
            دوره ساخته شد!{' '}
            <Link to={'/apps/Detail/' + data?.id} >
              مشاهده
            </Link>
          </p>
        </div>
      ), {
        duration: 15000, 
        position: 'top-center', 
        style: {
          background: '#fff',
          color: '#000',
          borderRadius: '8px',
          padding: '16px',
        },
      });
    }
  })
  // create Course 
  const handleCreateCourse =() => {
    const randomCouse = getRandom(courseData)
    console.log(randomCouse);
    const formData = new FormData()
    
    formData.append('Title', randomCouse.Title || '');
    formData.append('Describe', randomCouse.Describe || '');
    formData.append('MiniDescribe', randomCouse.MiniDescribe || '');
    formData.append('Capacity', Number(randomCouse.Capacity) || 0);
    formData.append('CourseTypeId', randomCouse.CourseTypeId || 0);
    formData.append('SessionNumber', randomCouse.SessionNumber || '');
    formData.append('CurrentCoursePaymentNumber', 0);
    formData.append('TremId', randomCouse.TremId || 0);
    formData.append('ClassId', randomCouse.ClassId || 0);
    formData.append('CourseLvlId', randomCouse.CourseLvlId || 0);
    formData.append('TeacherId', Number(randomCouse.TeacherId.value) || 0);
    formData.append('Cost', Number(randomCouse.Cost) || 0);
    formData.append('UniqeUrlString', randomCouse.UniqeUrlString || '');
    formData.append('Image', randomCouse?.imageUrl instanceof File ? URL.createObjectURL(randomCouse?.imageUrl) : randomCouse?.imageUrl);
    formData.append('StartTime', new Date(randomCouse.StartTime).toISOString());
    formData.append('EndTime', new Date(randomCouse.StartTime).toISOString());
    formData.append('GoogleSchema', null);
    formData.append('GoogleTitle', randomCouse.GoogleTitle || '');
    formData.append('ShortLink', null);
    formData.append('TumbImageAddress', randomCouse?.imageUrl instanceof File ?URL.createObjectURL(randomCouse?.imageUrl) :randomCouse?.imageUrl);
    formData.append('ImageAddress', randomCouse?.imageUrl instanceof File ? URL.createObjectURL(randomCouse?.imageUrl) : randomCouse?.imageUrl);
    createCourse.mutate(formData)
  }
  // talking Ai 
  const talkWithAi = () => {
    setIsResponse(true)
  }

  return (
    <div onClick={handleOutsideClick}>
      <div
        onClick={toggleChat}
        style={styles.chatIconContainer}
      >
        <FaRobot size={40} color="#fff" />
      </div>

      {isOpen && (
        <motion.div
          id="chat-container"
          style={styles.chatContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div style={styles.chatHeader}>
            <span>چت با ربات</span>
            <button onClick={toggleChat} style={styles.closeButton}>X</button>
          </div>
          {isResponse === false ? (
            <div className='d-flex justify-content-center align-items-center gap-1 ' style={{flexFlow:'row wrap'}}>
              {handleCat ? null : <Button onClick={handleCreateCourse}  color='primary' outline >ساخت دوره</Button>}
              <Button  color='primary' outline>ساخت مقاله</Button>
              <Button  onClick={talkWithAi} color='primary' outline>ارتباط با AI</Button>
              {handleCat ? <AddCategory uuid={createCourse?.data?.id} /> : null}
            </div>
          ) : null}

          <div style={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    background: msg.sender === 'user' ? '#3b82f6' : '#e2e8f0',
                    color: msg.sender === 'user' ? '#fff' : '#000',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    maxWidth: '80%',
                  }}
                >
                  {msg.text}
                </div>
                {msg.sender === 'bot' && (
                  <button
                    onClick={() => handleCopyMessage(msg.text)}
                    style={styles.copyButton}
                  >
                    <FaClipboard />
                  </button>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  style={{
                    background: '#e2e8f0',
                    color: '#000',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    maxWidth: '80%',
                  }}
                >
                  🤖 در حال تایپ...
                </div>
              </div>
            )}
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              disabled={isResponse ? false : true}
              placeholder="پیام خود را وارد کنید..."
              style={styles.input}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const userMessage = e.target.value;
                  if (userMessage.trim()) {
                    handleSendMessage(userMessage);
                    e.target.value = ''; 
                  }
                }
              }}
            />
          </div>

          <div style={styles.buttonsContainer}>
            <button onClick={handleDownloadChat} style={styles.downloadButton}>
              <FaDownload /> دانلود چت
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  chatIconContainer: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#3b82f6',
    padding: '15px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1000,
  },
  chatContainer: {
    position: 'fixed',
    bottom: '100px',
    left: '40px',
    width: '350px',
    height: '500px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
  },
  messagesContainer: {
    flexGrow: 1,
    padding: '10px',
    overflowY: 'auto',
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  copyButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
    color: '#3b82f6',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  downloadButton: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default AiChatBot;
