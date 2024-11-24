import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'react-feather';
import { FaStar } from 'react-icons/fa';
import { PiStarFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);  
  const [query, setQuery] = useState(""); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const navigate = useNavigate()
  const allItems = [
    { id: "home", title: "خانه", pageUrl: "/home" },
    { id: "user", title: "کاربران", pageUrl: "/apps/user/list" },
    { id: "Course", title: "دوره ها", pageUrl: "/apps/Course" },
    { id: "CourseList", title: "دوره ها", pageUrl: "/apps/Course" },
    { id: "addCourse", title: "ساخت دوره جدید", pageUrl: "/apps/Course/AddCourse" },
    { id: "groups", title: "مدیریت گروه ها", pageUrl: "/apps/groupsManagement" },
    { id: "courseReserve", title: "مدیریت رزرو ها", pageUrl: "/apps/Course/CourseReserve" },
    { id: "commentMng", title: "مدیریت کامنت (ادمین)", pageUrl: "/apps/Course/CommentMng" },
    { id: "commentMng", title: "دوره های من", pageUrl: "/apps/MyCourse" },
    { id: "CoursePaymentPage", title: "پرداختی ها", pageUrl: "/CoursePaymentPage" },
    { id: "Term", title: "ترم ها", pageUrl: "/apps/Course/Term" },
    { id: "Tech", title: "مدیریت دسته بندی", pageUrl: "/apps/Course/Tech" },
    { id: "ClassRome", title: "کلاس ها", pageUrl: "/ClassRome" },
    { id: "blog", title: "مقالات", pageUrl: "/apps/blog" },
    { id: "blogList", title: "مقاله ها", pageUrl: "/apps/blog" },
    { id: "addBlog", title: "ساخت مقاله جدید", pageUrl: "/apps/blog/AddBlog" },
    { id: "categories", title: "مدیریت دسته بندی", pageUrl: "/apps/CategoryNews" },
    { id: "commentbLOG", title: "مدیریت کامنت", pageUrl: "/apps/CommentMngForBlog" },
    { id: "commentMngPage", title: "مدیریت همه کامنت ها", pageUrl: "/apps/allCommentMng" },
    { id: "building", title: "ساختمان پژوهشگاه", pageUrl: "/building/list" },
    { id: "Department", title: "بخش های پژوهشگاه", pageUrl: "/Department/list" },
    { id: "AssCourse", title: "منتور ها", pageUrl: "/AssCourse/list" },
    { id: "AssWork", title: "تعیین تسک", pageUrl: "/AssWork/list" },
    { id: "SocialGroup", title: "گروه اجتماعی دوره", pageUrl: "/SocialGroup/list" },
    { id: "Schedual", title: "بازه زمانی", pageUrl: "/Schedual" },
    { id: "Tournament", title: "تورنومنت", pageUrl: "/Tournament" },
    { id: "tourList", title: "لیست تورنومنت", pageUrl: "/Tournament/list" },
    { id: "mainCheckList", title: "چک لیست تورنومنت", pageUrl: "/Tournament/MainCheckList" },
    { id: "Refere", title: "داور ها", pageUrl: "/Tournament/Refere" },
    { id: "Podcast", title: "پادکست", pageUrl: "/Podcast" },
    { id: "PodcastList", title: "لیست پادکست", pageUrl: "/Podcast" },
    { id: "PodcastComment", title: "کامنت پادکست", pageUrl: "/Podcast/CommentMngPodcast" },
    { id: "support", title: "پشتیبانی", pageUrl: "/SupportChat" },
    { id: "notif", title: "اعلان", pageUrl: "/Notif" },
    { id: "NotifType", title: "نوع اعلان", pageUrl: "/Notif/NotifType" },
    { id: "NotifMessageList", title: "لیست پیام اعلان", pageUrl: "/Notif/NotifListMessage" },
    { id: "NotifList", title: "لیست اعلان", pageUrl: "/Notif/NotifList" },
    { id: "Wallet", title: "کیف پول", pageUrl: "/wallet" },
    { id: "AllWallet", title: "لیست کیف پول", pageUrl: "/wallet/AllWallet" },
    { id: "Transaction", title: "لیست تراکنش", pageUrl: "/wallet/Transaction" }
  ];
  

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };
  const [hoveredItem, setHoveredItem] = useState(null); 
  const handleMouseEnter = (id) => {
    setHoveredItem(id);  
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);  
  };
  
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const filterItems = (searchQuery) => {
    return allItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getBookmarkedItems = () => {
    const bookmarked = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
    return bookmarked;
  };

  const toggleBookmark = (item) => {
    const bookmarkedItems = getBookmarkedItems();
    const isBookmarked = bookmarkedItems.find(b => b.id === item.id);

    if (isBookmarked) {
      const updatedBookmarks = bookmarkedItems.filter(b => b.id !== item.id);
      localStorage.setItem('bookmarkedItems', JSON.stringify(updatedBookmarks));
    } else {
      bookmarkedItems.push(item);
      localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
    }
  };

  useEffect(() => {
    const filtered = filterItems(query);
    setFilteredItems(filtered);
  }, [query]);

  const dropdownRef = useRef()
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);  
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div style={styles.containerBookMark}>
     <Star style={styles.starIcon}  onClick={toggleMenu} />

      {isOpen && (
        <div ref={dropdownRef} style={styles.dropdown}>
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="جستجو"
            style={styles.searchInput}
          />
          <ul style={styles.menu}>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => {
                const isBookmarked = getBookmarkedItems().some(b => b.id === item.id);
                return (
                  <li
                  key={item.id}
                  style={{
                    ...styles.menuItem,
                    backgroundColor: hoveredItem === item.id ? '#f0f0f0' : 'transparent',  
                  }}
                  onMouseEnter={() => handleMouseEnter(item.id)} 
                  onMouseLeave={handleMouseLeave}
                   onClick={() =>navigate(item.pageUrl)}
                >
                  {item.title}
                  <button
                    onClick={() => toggleBookmark(item)}
                    style={styles.bookmarkButton}
                  >
                    {isBookmarked ? (
                      <Star fill='gold' style={styles.starIcon} />
                    ) : (
                      <Star fill='transparent' style={styles.starIcon} />
                    )}
                  </button>
                </li>
                
                );
              })
            ) : (
              <li style={styles.menuItem}>نتیجه‌ای یافت نشد.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  containerBookMark: {
    position: 'relative', 
    marginRight:'30px',
    fontFamily : 'sans',
  },
  menuButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    padding: '10px',
    zIndex: 1000,
    maxHeight: '300px', 
    overflowY: 'auto', 
    backgroundColor:'#fff',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    outline:'none'
  },
  menu: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  menuItem: {
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease', 
  },
  

  menuLink: {
    color: '#333',
    textDecoration: 'none',
  },
  bookmarkButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  starIcon: {
    fontSize: '18px',
    color: '#FFD700',
  },
};

export default DropdownMenu;
