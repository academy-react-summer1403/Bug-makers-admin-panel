import React, { useEffect, useRef, useState } from 'react';
import { MessageBox, Button, Input } from 'react-chat-elements';
import { Menu, Send } from 'react-feather';
import 'react-chat-elements/dist/main.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import logo from '../../assets/images/logo/bahr.png'
import avatar1 from '../../assets/images/avatars/1-small.png'
import avatar2 from '../../assets/images/avatars/2.png'
import avatar3 from '../../assets/images/avatars/3.png'
import noImg from '../../assets/images/avatars/3.png'
import support from '../../assets/images/iconDash/support.png'
import audioSound from '../../assets/sound/sendMessage.mp3'
import { createChat } from '../../@core/api/chat/createChat';
import toast from 'react-hot-toast';
import { setNormalizing } from 'slate';
const SupportChat = () => {
  const [messages, setMessages] = useState({}); 
  const [inputMessage, setInputMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState("673a3479c6d919eac0cdd963"); 
  const [userList, setUserList] = useState([]);
  const [combinedData, setCombinedData] = useState([]); 
  const [chatId, setChatId] = useState([])
  const UserId = useSelector((state) => state.userId.userId)
  const [userStateId, setUserStateId] = useState()
  const [imageUser, setImageUser] = useState([])

console.log(userStateId);

  const roleAccess = useSelector((state) => state.role.rolePage)
  const isAdmin = roleAccess?.roles?.some(role => role.roleName === "Administrator");

  const queryClinet = useQueryClient()
  const scrollRef = useRef()
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
  console.log(data);


  const { data: userById } = useQuery({
    queryKey: ['getUserById', selectedUser],
    queryFn: () => getChatById(selectedUser),
    enabled: !!selectedUser
  });

  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
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
  
      const filteredUsers = combinedData.filter((user) => 
        user.fname.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.lname.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      setCombinedData(filteredUsers); 
      setUserList(filteredUsers); 
    }
  }, [user, userAll, searchQuery]);

  console.log(userById?.data?.dataText);
  const filterImage = userById?.data?.dataText.filter((el) => el.SenderId === UserId)
  console.log(filterImage);
  useEffect(() => {
    if (userById?.data?.dataText) {
      const formattedMessages = userById.data.dataText.map((message) => {
        const isSender = message.SenderId === UserId; 
        const avatar = isSender
          ? data?.currentPictureAddress 
          : imageUser; 
  
        return {
          position: isSender ? 'right' : 'left', 
          type: 'text',
          text: message.text,
          avatar: avatar, 
          time: new Date(message.time).toLocaleTimeString(), 
        };
      });
  
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: formattedMessages,
      }));
    }
  }, [userById, selectedUser, data]); 
  

  const SendMessage = useMutation({
    mutationKey:['sendMessage'],
    mutationFn:(chatMessage) => createChat(chatMessage),
    onSuccess: () => {
      queryClinet.invalidateQueries('getUserById')
    }
  })
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        position: 'right', 
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
      const audio = new Audio(audioSound);
      audio.play();
      window.scrollTo({bottom: 0 , behavior:'smooth'})

      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight, 
          behavior: 'smooth', 
        });
      }
      
      const messageData = {
        ReciveId: userStateId,  
        yourId: UserId,  
        text: inputMessage,  
        GroupId: selectedUser,  
      };
      SendMessage.mutate(messageData)
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId.id);
    setUserStateId(userId.Peaple1)
    setChatId(userId)
    setImageUser(userId.pictureAddress)
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

const convertToCSV = (data) => {
  const header = Object.keys(data[0]).join(","); 
  const rows = data.map(row => Object.values(row).join(",")); 
  return [header, ...rows].join("\n"); 
};

const handleExportUsers = () => {
  const usersData = userList

  const csvContent = convertToCSV(usersData); 

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob); 
  const a = document.createElement("a");
  a.href = url;
  a.download = "users_list.csv"; 
  a.click(); 
  URL.revokeObjectURL(url); 
};


  const waitinigCount = user?.data?.filter((el) => el.Peaple2 == null)
  return (
    <div dir='ltr' style={styles.container}>
      {/* لیست کاربران */}
      <div style={styles.usersList}>
        <div className='d-flex p-1 position-relative justify-content-center align-items-center ' style={{flexFlow:'row wrap' , height:'120px' }}>
          <Dropdown
          style={{position:'absolute' , left:'0' , top:'5px'}}
          >
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
              {isAdmin ? (
              <Dropdown.Item onClick={handleExportUsers}>
                <span>اکسپورت لیست کاربران</span>
              </Dropdown.Item>
              ) : null}

            </DropdownButton>
          </Dropdown>

          <h3 className='mb-5' >کاربران</h3>
          <img style={{top:'19px', width:'25px' , height:'30px' , position:'absolute' , right:'5px'}} src={logo} />
          <div className='d-flex p-1 position-absolute  justify-content-center align-items-center ' style={{flexFlow:'row nowrap' }}>
                <img style={{width:'20px', height:'20px'}} className='rounded-circle' onError={(e) => {e.target.src = noImg}} src={avatar1} />
                <img style={{width:'20px', height:'20px'}} className='rounded-circle' onError={(e) => {e.target.src = noImg}} src={avatar2} />
                <img style={{width:'20px', height:'20px'}} className='rounded-circle' onError={(e) => {e.target.src = noImg}}  src={avatar3} />
                <span>{waitinigCount?.length} کاربر در حال</span>
              </div>

          <input 
            className="mt-1" 
            type="search" 
            placeholder="...نام کاربر" 
            value={searchQuery} 
            onChange={handleSearchChange}  
            style={{
              backgroundColor: '#EAEAEC',
              borderRadius: '10px',
              outline:'none',
              border:'none',
              width:'90%',
              padding:'5px',
              position:'absolute',
              bottom:0,
              textAlign:'center',
              textIndent:'20px'
            }} 
          />
        </div>
        {userList?.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserSelect(user)}
            style={selectedUser === user.id ? styles.selectedUser : styles.userItem}
          >
            <div  className='d-flex position-relative w-100 justify-content-start align-items-start ' style={styles.userInfo}>
            <div className='d-flex w-100 justify-content-start position-relative align-items-center gap-1'>
              <img 
                onError={(e) => {e.target.src = noImg}}
                src={user.pictureAddress ? user.pictureAddress : noImg} 
                style={{
                    borderRadius: '50%',   
                    width: '40px',         
                    height: '40px',
                    objectFit: 'cover',
                }} 
              />
              <Tooltip title={user.fname ? user.fname + ' ' + user.lname  : 'نام وجود ندارد'}  placement='top'>
                <span style={{width:'150px' , overflow:'hidden', textOverflow:'ellipsis' , whiteSpace:'nowrap'}}>{user.fname ? user.fname + ' ' + user.lname  : 'نام وجود ندارد'}</span>
              </Tooltip>
              <Badge color='info' className='position-absolute' style={{right:'5px'}} > 1</Badge>
              </div>
                <Active 
                    isActive={user.Peaple2} 
                    HelpId={user.id}
                    id={UserId} 
                    api="https://tahacode.ir/help/AcceptHelpForAdmin" 
                    method="post"
                    styled={{ minWidth: '50px' , cursor: 'pointer', padding: '5px', margin: '5px 0 0 55px' }} 
                    text2={user.Peaple2 !== null ? 'تایید شده' :  'در حال آپلود'}
                    text={user.Peaple2  == null ? 'در انتظار' :  'در حال آپلود'}
                />
          <hr className="position-absolute" style={{ bottom: '-25px', left: 0, right: 0 }} />            </div>
          </div>
        ))}
      </div>

      <div style={styles.chatArea}>
  <div style={styles.header}>
    {userById && userById.data ? (
      <div style={styles.headerContent}>
        <img 
          src={chatId?.pictureAddress || avatarUser} 
          alt="User Avatar" 
          onError={(e) => {e.target.src = noImg}}
          style={styles.avatar}
        />
        <div style={styles.userInfo}>
          <h5>{chatId?.fname} {chatId?.lname}</h5>
        </div>
      </div>
    ) : (
      <p>اطلاعات کاربر در حال بارگذاری است...</p>
    )}
  </div>

  {/* پنجره چت */}
  <div ref={scrollRef} style={styles.chatWindow}>
  {userById ? (
    selectedUser && messages[selectedUser] && messages[selectedUser].length > 0 ? (
      messages[selectedUser].map((message, index) => (
        <div dir='rtl' key={index} style={message.position === 'right' ? styles.rightMessage : styles.leftMessage}>
          <MessageBox
            position={message.position}
            type={message.type}
            text={message.text}
            avatar={message.avatar}
            date={message.time}
            onError={(e) => {e.target.src = noImg}}
          />
          <div style={styles.messageTime}>{message.time}</div> 
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
          className="btn btn-primary mr-5 rounded-circle "
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    width: '90%',
    height: '80vh',
    margin: ' auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  usersList: {
    width: '35%',
    backgroundColor: '#FBFBFD',
    borderRight: '1px solid #ccc',
    padding: '10px',
    height: '100%',
    borderRadius: '10px',
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
    height: 'fit-content',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  chatArea: {
    width: '75%',
    marginBottom:'50px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  chatWindow: {
    flex: 1,
    maxHeight: 'calc(100vh - 160px)', 
    overflowY: 'scroll',
    marginBottom: '10px',
    margin:'10px'
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
    right: '0',
    bottom: '0',
    width: '68.1%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: '#fff',
    boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
  },
  input: {
    width: '80%',
    position:'absolute',
    right:'0',
    padding: '10px',
    marginLeft: '10px',
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
