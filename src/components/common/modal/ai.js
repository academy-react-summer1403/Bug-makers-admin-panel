import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot, FaClipboard, FaDownload } from 'react-icons/fa'; 
import { saveAs } from 'file-saver'; 
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';  
import { getRandom, courseData , blogData } from '../../../@core/layouts/utils';
import { useMutation } from '@tanstack/react-query';
import { updateCourse } from '../../../@core/api/course/updateCourse';
import AddCategory from './addCategory';
import { Link } from 'react-router-dom';
import img2 from '../../../assets/images/icons/image.jpg'
import { Modal, ModalHeader, ModalBody, Button, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { updateBlog } from '../../../@core/api/blog/updateCourse';
import { AddBlog } from '../../../@core/api/blog/addBlog';
import {Input} from 'reactstrap';
const LoadingMessage = () => {
  return <div>🤖 در حال تایپ...</div>;
};

const AiChatBot = () => {
  const [isResponse, setIsResponse] = useState(false)
  const [isOpen, setIsOpen] = useState(false); 
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [handleCat, setHandleCat] = useState(false)
  const [courseDataState, setCourseDataState] = useState()
  const [preview, setPreview] = useState(false)
  const [previewBlog, setPreviewBlog] = useState(false)
  const toggle = () => setPreview(!preview);
  const toggleBlog = () => setPreviewBlog(!previewBlog);
  const [about, setAbout] = useState('')

  // handle path 
  const courseBlog = 
  (window.location.pathname === '/apps/Course/AddCourse' || window.location.pathname === '/apps/Course/editCourse') 
    ? 'دوره' 
    : (window.location.pathname === '/apps/blog/editBlog' || window.location.pathname === '/apps/blog/AddBlog') 
      ? 'مقاله' 
      : '';


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
      setPreview(false)
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
    setPreview(true);
    setCourseDataState(randomCouse);
  }
  // submit course 
  const handleSubmiteCourse = () => {
    const formData = new FormData()
    
    formData.append('Title', courseDataState.Title || '');
    formData.append('Describe', courseDataState.Describe || '');
    formData.append('MiniDescribe', courseDataState.MiniDescribe || '');
    formData.append('Capacity', Number(courseDataState.Capacity) || 0);
    formData.append('CourseTypeId', courseDataState.CourseTypeId || 0);
    formData.append('SessionNumber', courseDataState.SessionNumber || '');
    formData.append('CurrentCoursePaymentNumber', 0);
    formData.append('TremId', courseDataState.TremId || 0);
    formData.append('ClassId', courseDataState.ClassId || 0);
    formData.append('CourseLvlId', courseDataState.CourseLvlId || 0);
    formData.append('TeacherId', Number(courseDataState.TeacherId.value) || 0);
    formData.append('Cost', Number(courseDataState.Cost) || 0);
    formData.append('UniqeUrlString', courseDataState.UniqeUrlString || '');
    formData.append('Image', courseDataState?.imageUrl instanceof File ? URL.createObjectURL(courseDataState?.imageUrl) : courseDataState?.imageUrl);
    formData.append('StartTime', new Date(courseDataState.StartTime).toISOString());
    formData.append('EndTime', new Date(courseDataState.StartTime).toISOString());
    formData.append('GoogleSchema', null);
    formData.append('GoogleTitle', courseDataState.GoogleTitle || '');
    formData.append('ShortLink', null);
    formData.append('TumbImageAddress', courseDataState?.imageUrl instanceof File ?URL.createObjectURL(courseDataState?.imageUrl) :courseDataState?.imageUrl);
    formData.append('ImageAddress', courseDataState?.imageUrl instanceof File ? URL.createObjectURL(courseDataState?.imageUrl) : courseDataState?.imageUrl);
    createCourse.mutate(formData)
  }

  // api create blog 
  const createBlog = useMutation({
    mutationKey:['createBlogKey'],
    mutationFn: (formData) => AddBlog(formData),
    onSuccess: (data) => {
      setPreviewBlog(false)
      toast((t) => (
        <div>
          <p>
            مقاله ساخته شد آن را تایید کنید!{' '}
            <Link to={'/apps/blog'} >
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
  // create blog  
  const handleCreateBlog = () => {
    const randomCouse = getRandom(blogData)
    setPreviewBlog(true);
    setCourseDataState(randomCouse);
  }

  const handleSubmitBlog = () => {
    const formData = new FormData();
    
    formData.append('Title', courseDataState.Title || '');
    formData.append('GoogleTitle', courseDataState.GoogleTitle || '');
    formData.append('GoogleDescribe', courseDataState.GoogleDescribe || '');
    formData.append('MiniDescribe', courseDataState.MiniDescribe || '');
    formData.append('Describe', courseDataState.Describe || '');
    formData.append('Keyword', courseDataState.Keyword || '');
    formData.append('IsSlider', courseDataState.isSlider || true);
    formData.append('NewsCatregoryId', courseDataState.NewsCatregoryId || 1);
    formData.append('Image', courseDataState?.imageUrl);

    createBlog.mutate(formData)
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
          {isResponse === false  ? (
            <div className='d-flex justify-content-center align-items-center gap-1 m-1 ' style={{flexFlow:'row wrap'}}>
              {handleCat || courseBlog === 'دوره' || courseBlog === 'مقاله' ? null : <Button onClick={handleCreateCourse}  color='primary' outline >ساخت دوره</Button>}
              {courseBlog === 'دوره' || courseBlog === 'مقاله' ? null : <Button onClick={handleCreateBlog} color='primary' outline>ساخت مقاله</Button>}
              {courseBlog === 'دوره' || courseBlog === 'مقاله' ? null : <Button  onClick={talkWithAi} color='primary' outline>ارتباط با AI</Button>}
              {handleCat ? <AddCategory uuid={createCourse?.data?.id} /> : null}
            </div>
          ) : null}
          {courseBlog === 'دوره' || courseBlog === 'مقاله' ? (
          <div className='d-flex justify-content-center align-items-end m-1' style={{flexFlow: 'column wrap'}}>
            <Input 
              type="text"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              placeholder='نام دوره یا مقاله'
            />
            <Button  
              color='primary' 
              outline 
              size='sm'
              onClick={(e) => {
                  const message = 'میخوام یک' + ' ' + courseBlog + ' ' + 'بسازم' + ' ' + 'درباره' + ' ' + about + ' ' + 'توضیحات ساخت این' + ' ' + courseBlog + ' ' + 'رو بده'
                  console.log(message);
                  if (message) {
                    handleSendMessage(message);
                    setAbout('') 
                  }
              }}
            
            >ساخت توضیحات</Button>
          </div>
            ) : null}
          {preview ? (
             <Modal isOpen={preview} toggle={toggle} centered>
             <ModalHeader toggle={toggle}>{courseDataState?.Title}</ModalHeader>
             <ModalBody>
               <Card>
                 <CardImg top width="100%" onError={(e) => {e.target.src = img2}} style={{height:'300px' , objectFit: 'cover'}} src={courseDataState?.Image ? courseDataState?.Image : img2} />
                 <CardBody>
                   <CardTitle tag="h5">{courseDataState?.MiniDescribe}</CardTitle>
                   <CardText>{courseDataState?.Describe}</CardText>
                   <CardText><strong>تعداد جلسات:</strong> {courseDataState?.SessionNumber}</CardText>
                   <CardText><strong>ظرفیت:</strong> {courseDataState?.Capacity} نفر</CardText>
                   <CardText><strong>هزینه:</strong> {courseDataState?.Cost} تومان</CardText>
                   <CardText><strong>زمان شروع:</strong> {new Date(courseDataState?.StartTime).toLocaleString()}</CardText>
                   <CardText><strong>زمان پایان:</strong> {new Date(courseDataState?.EndTime).toLocaleString()}</CardText>
                   <Button onClick={handleSubmiteCourse} color='success' >تایید و ساخت دوره</Button>
                   <span style={{fontSize:'10px' , color:'red' , marginRight:'20px'}}>پس از تایید دوره حتما دسته بندی را انتخاب نمایید</span>
                 </CardBody>
               </Card>
             </ModalBody>
           </Modal>
          ) : null}
                    {previewBlog ? (
             <Modal isOpen={previewBlog} toggle={toggleBlog} centered>
             <ModalHeader toggle={toggleBlog}>{courseDataState?.Title}</ModalHeader>
             <ModalBody>
               <Card>
                 <CardImg top width="100%" onError={(e) => {e.target.src = img2}} style={{height:'300px' , objectFit: 'cover'}} src={courseDataState?.Image ? courseDataState?.Image : img2} />
                 <CardBody>
                   <CardTitle tag="h5">{courseDataState?.MiniDescribe}</CardTitle>
                   <CardText>{courseDataState?.Describe}</CardText>
                   <CardText><strong> تگ کلیدی:</strong> {courseDataState?.Keyword}</CardText>
                   <CardText><strong>  عنوان گوگل:</strong> {courseDataState?.GoogleTitle}</CardText>
                   <CardText><strong>  توضیحات گوگل:</strong> {courseDataState?.GoogleDescribe}</CardText>
                   <CardText><strong>IsSlider :</strong> {courseDataState?.IsSlider}</CardText>
                   <CardText><strong>آیدی دسته بندی:</strong> {courseDataState?.NewsCatregoryId}</CardText>
                   <CardText><strong>زمان شروع:</strong> {new Date(courseDataState?.StartTime).toLocaleString()}</CardText>
                   <CardText><strong>زمان پایان:</strong> {new Date(courseDataState?.EndTime).toLocaleString()}</CardText>
                   <Button onClick={handleSubmitBlog} color='success' >تایید و ساخت مقاله</Button>
                 </CardBody>
               </Card>
             </ModalBody>
           </Modal>
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

            {courseBlog === '' ? (
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
          ) : null}

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
