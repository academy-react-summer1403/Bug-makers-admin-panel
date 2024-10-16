import React, { useState } from 'react';
import moment from 'jalali-moment';
import { motion, AnimatePresence } from 'framer-motion';

const DateModal = ({ onFilter }) => {
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasData, setHasData] = useState(true);

  const handleFilter = () => {
    const startDate = moment(`${startYear}-${startMonth}-${startDay}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const endDate = moment(`${endYear}-${endMonth}-${endDay}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    
    const data = onFilter(startDate, endDate);

    if (data) {
      setHasData(true);
      setIsOpen(false);
    } else {
      setHasData(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <button
        className="btn btn-light"
        style={{ width: '160px' }} 
        onClick={() => setIsOpen(true)}
      >
        بازه زمانی
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 d-flex align-items-center justify-content-center z-10"
            initial={{ opacity: 0, y: -100 }}  
            animate={{ opacity: 1, y: 0 }}    
            exit={{ opacity: 0, y: -100 }}    
            transition={{ duration: 0.5 }}    
          >
            <div className="bg-white p-4 rounded shadow" style={{ width: '514px' }}>
              <h2 className="text-lg mb-4 text-right">فیلتر بازه زمانی</h2>
              <hr />
              <div className="d-flex flex-column">
                <label className="text-sm">تاریخ شروع:</label>
                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="روز"
                    value={startDay}
                    onChange={(e) => setStartDay(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="ماه"
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="سال"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                  />
                </div>

                <label className="text-sm">تاریخ پایان:</label>
                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="روز"
                    value={endDay}
                    onChange={(e) => setEndDay(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="ماه"
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="سال"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary me-2"
                onClick={handleFilter}
              >
                تایید
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsOpen(false);
                  setStartDay('');
                  setStartMonth('');
                  setStartYear('');
                  setEndDay('');
                  setEndMonth('');
                  setEndYear('');
                  setHasData(true);
                }}
              >
                انصراف
              </button>
              {!hasData && <p className="text-danger mt-2">دیتا یافت نشد</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateModal;
