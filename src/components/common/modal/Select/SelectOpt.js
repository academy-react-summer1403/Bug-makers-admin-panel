import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getTeacherList } from '../../../../@core/api/course/TeacherList';
import { getCategoryList } from '../../../../@core/api/course/Category';

const SelectOpt = ({ width, placeholder, onChange, isTeacherSelect, isSortSelect, FilterValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const sortData = [{ id: 1, value: 'Cost' }];

  const { data: optionsList, isLoading, error } = useQuery({
    queryKey: isTeacherSelect ? ['teachers'] : isSortSelect ? ['sortOptions'] : ['categories'],
    queryFn: isTeacherSelect ? getTeacherList : isSortSelect ? () => Promise.resolve(sortData) : getCategoryList
  });

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      if (isSortSelect) {
        onChange(option.value); 
      } else {
        onChange(isTeacherSelect ? option.teacherId : option.id);
      }
    }
  };

  const handleRemove = () => {
    setSelectedOption(null);
    if (onChange) {
      onChange(null);
    }
  };

  useEffect(() => {
    if (FilterValue) {
      setSelectedOption(null);
    }
  }, [FilterValue]);

  if (error) {
    return <p>خطایی رخ داده است، لطفا دوباره تلاش کنید.</p>;
  }

  return (
    <div className={`position-relative ${isOpen ? 'z-index-10' : 'z-index-0'}`}>
      {selectedOption && (
        <span
          className="cursor-pointer position-absolute top-0 start-0 p-2"
          onClick={handleRemove}
        >
          ✖
        </span>
      )}
      <div
        className="form-control d-flex justify-content-start align-items-center"
        style={{ width: '160px' }} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? (selectedOption.fullName || selectedOption.techName || selectedOption.value) : placeholder}</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="position-absolute  w-100 bg-white shadow mt-1 max-h-200 overflow-auto rounded"
            style={{zIndex: 10}}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {optionsList?.map((option) => (
              <li
                key={isSortSelect ? option.id : isTeacherSelect ? option.teacherId : option.id}
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                onClick={() => handleSelect(option)}
              >
                {isSortSelect ? option.value : isTeacherSelect ? option.fullName : option.techName}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectOpt;
