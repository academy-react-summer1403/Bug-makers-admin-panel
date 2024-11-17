import React, { useEffect, useState } from 'react';
import { MessageBox, Button, Input } from 'react-chat-elements';
import { Menu, Send } from 'react-feather';
import 'react-chat-elements/dist/main.css';
import { useQuery } from '@tanstack/react-query';
import { getAllChat, getChatById } from '../../@core/api/chat/getAllChat';
import { Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import { Badge } from 'reactstrap';
import { getUser } from '../../@core/api/user/getUserById';
import avatarUser from '../../assets/images/avatars/1.png';
import { ThreeDots } from 'react-loader-spinner';
import Active from '../common/active/active';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import { getProfileInfo } from '../../@core/api/getProfile/getProfile';
import support from '../../assets/images/iconDash/support.png'
const SupportChat = () => {
  const [messages, setMessages] = useState({}); 
  const [inputMessage, setInputMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState("673a3479c6d919eac0cdd963"); 
  const [userList, setUserList] = useState([]);
  const [combinedData, setCombinedData] = useState([]); 

  const UserId = useSelector((state) => state.userId.userId)

  const { data: user } = useQuery({
    queryKey: ['getAllUser'],
    queryFn: getAllChat
  });
  const { data: userAll } = useQuery({
    queryKey: ['getAllUserList'],
    queryFn: getUser
  });
  const {data} = useQuery({
    queryKey:['getProfileInfo'],
    queryFn: getProfileInfo,
  })


  const { data: userById } = useQuery({
    queryKey: ['getUserById', selectedUser],
    queryFn: () => getChatById(selectedUser),
    enabled: !!selectedUser
  });

  useEffect(() => {
    if (user?.data && userAll?.listUser) {
      const combinedData = user?.data?.map((userItem) => {
        const matchingUser = userAll?.listUser.find(
          (listUserItem) => listUserItem.id === userItem.Peaple1
        );
        
        if (matchingUser) {
          return {
            ...matchingUser, 
            ...userItem,
          };
        }

        return null; 
      }).filter((item) => item !== null);

      setCombinedData(combinedData); 
      setUserList(combinedData); 
    }
  }, [user, userAll]);

  useEffect(() => {
    if (userById?.data?.dataText) {
      const formattedMessages = userById.data.dataText.map((message) => ({
        position: message.SenderId === selectedUser ? 'right' : 'left',
        type: 'text',
        text: message.text,
        avatar: `https://randomuser.me/api/portraits/men/${message.SenderId}.jpg`,
      }));
      
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: formattedMessages,
      }));
    }
  }, [userById, selectedUser]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        position: 'left', 
        type: 'text',
        text: inputMessage,
        avatar: data ? data.currentPictureAddress : support, 
      };

      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        if (!newMessages[selectedUser]) {
          newMessages[selectedUser] = [];
        }
        newMessages[selectedUser].push(newMessage); 
        return newMessages;
      });

      setInputMessage(''); 
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleUserFilter = (filterType) => {
    let filteredUsers = [...combinedData]; 

    if (filterType === 'waiting') {
      filteredUsers = filteredUsers.filter((el) => el.Peaple2 == null); 
    } else if (filterType === 'confirmed') {
      filteredUsers = filteredUsers.filter((el) => el.Peaple2 !== null); 
    }

    setUserList(filteredUsers); 
  };

  return (
    <div style={styles.container}>
      {/* لیست کاربران */}
      <div style={styles.usersList}>
        <div className='d-flex position-relative justify-content-center align-items-center ' style={{gap:'110px'}}>
          <Dropdown>
            <DropdownButton
              title={<Menu />}
              variant="transparent"
              style={{
                boxShadow: 'none',
                backgroundColor: 'transparent',
                border: '1px solid #fff',
                outline: '1px solid #fff',
              }}
            >
              <Dropdown.Item onClick={() => handleUserFilter('all')}>
                <span >همه پیام‌ها</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleUserFilter('waiting')}>
                <span >در انتظار پشتیبان</span>
              </Dropdown.Item>
              <Dropdown.Item  onClick={() => handleUserFilter('confirmed')}>
                <span>تاییده شده</span>
              </Dropdown.Item>
            </DropdownButton>
          </Dropdown>

          <h3>کاربران</h3>
        </div>
        {userList?.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserSelect(user.id)}
            style={selectedUser === user.id ? styles.selectedUser : styles.userItem}
          >
            <div className='d-flex justify-content-center align-items-center gap-1' style={styles.userInfo}>
              <img 
                src={user.pictureAddress} 
                onError={(e) => {e.target.src = avatarUser}}
                style={{
                    borderRadius: '50%',   // این خاصیت تصویر را دایره‌ای می‌کند
                    width: '40px',         // اندازه تصویر (می‌توانید این مقدار را کم یا زیاد کنید)
                    height: '40px',        // اندازه تصویر (می‌توانید این مقدار را کم یا زیاد کنید)
                    objectFit: 'cover',    // این خاصیت به تصویر کمک می‌کند که کاملاً در داخل دایره جا شود
                }} 
              />
              <Tooltip title={user.fname ? user.fname + ' ' + user.lname  : 'نام وجود ندارد'}  placement='top'>
                <span style={{width:'150px' , overflow:'hidden', textOverflow:'ellipsis' , whiteSpace:'nowrap'}}>{user.fname ? user.fname + ' ' + user.lname  : 'نام وجود ندارد'}</span>
              </Tooltip>
                <Active 
                    isActive={user.Peaple2} 
                    HelpId={user.id}
                    id={UserId} 
                    api="https://tahacode.ir/help/AcceptHelpForAdmin" 
                    method="post"
                    styled={{ minWidth: '50px' , cursor: 'pointer', padding: '10px', marginRight: '10px' }} 
                    text2={user.Peaple2 !== null ? 'تایید شده' :  'در حال آپلود'}
                    text={user.Peaple2  == null ? 'در انتظار' :  'در حال آپلود'}
                />
              <p>کلیک کنید تا جزییات را ببینید</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.chatArea}>
      <div style={styles.chatWindow}>
      <div style={styles.chatWindow}>
  {userById ? (
    selectedUser && messages[selectedUser] && messages[selectedUser].length > 0 ? (
      messages[selectedUser].map((message, index) => (
        <div key={index} style={message.position === 'right' ? styles.rightMessage : styles.leftMessage}>
          <MessageBox
            position={message.position}
            type={message.type}
            text={message.text}
            avatar={message.avatar}
          />
        </div>
      ))
    ) : (
      <div style={styles.loading}>پیامی وجود ندارد...</div> 
    )
  ) : (
    <ThreeDots /> 
  )}
</div>

</div>

      </div>

      <div style={styles.inputContainer}>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }} 
          style={styles.input}
        />
        <Button
          onClick={handleSendMessage}
          text={<Send />}
          className="btn btn-primary h-100 position-absolute end-0 ml-1"
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    width: '80%',
    height: '80vh',
    margin: ' auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  usersList: {
    width: '25%',
    backgroundColor: '#fff',
    borderRight: '1px solid #ccc',
    padding: '10px',
    height: '100%',
    overflowY: 'scroll',
  },
  userItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  selectedUser: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#e0f7fa',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  userInfo: {
    marginLeft: '10px',
    flexFlow: 'row wrap',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  chatArea: {
    width: '75%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  chatWindow: {
    flex: 1,
    maxHeight: 'calc(100vh - 160px)', // فضای قابل نمایش پیام‌ها
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  rightMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '15px',
    paddingRight: '10px',
  },
  leftMessage: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    paddingLeft: '10px',
  },
  inputContainer: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
  },
  input: {
    width: '80%',
    padding: '10px',
    marginRight: '10px',
    borderRadius: '30px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  sendButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '20px',
    padding: '10px',
  },
};

export default SupportChat;
