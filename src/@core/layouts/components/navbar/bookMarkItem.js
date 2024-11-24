import React, { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { Package, Star } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const BookmarkedItems = () => {
  const navigate = useNavigate();

  const getBookmarkedItems = () => {
    return JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
  };

  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    const items = getBookmarkedItems();
    setBookmarkedItems(items);
  }, []);

  const handleClick = (pageUrl) => {
    navigate(pageUrl);
  };

  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        {bookmarkedItems.length > 0 ? (
          bookmarkedItems.map((item) => (
            <div key={item.id} style={styles.iconWrapper}>
              <Tooltip title={`برو به ${item.title}`} >
                <Package
                  onClick={() => handleClick(item.pageUrl)}
                />
              </Tooltip>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

// استایل‌ها برای چینش و ظاهر
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  iconContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '24px',
    color: '#FFD700',
    transition: 'transform 0.2s ease-in-out',
  },
};

export default BookmarkedItems;
