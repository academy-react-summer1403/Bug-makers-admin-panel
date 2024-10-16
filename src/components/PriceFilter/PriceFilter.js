import React, { useState } from 'react';

const PriceFilter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(1000000);
  const [timer, setTimer] = useState(null);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    if (name === 'minPrice') {
      if (Number(value) <= selectedMaxPrice) {
        setSelectedMinPrice(Number(value));
      }
    } else if (name === 'maxPrice') {
      if (Number(value) >= selectedMinPrice) {
        setSelectedMaxPrice(Number(value));
      }
    }

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      onFilter(selectedMinPrice, selectedMaxPrice);
    }, 1000);

    setTimer(newTimer);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex align-items-center">
        <div className="range-slider mx-3">
          <input
            type="range"
            name="minPrice"
            min={minPrice}
            max={maxPrice}
            value={selectedMinPrice}
            onChange={handlePriceChange}
            step={10000}
            className="form-range"
          />
          <input
            type="range"
            name="maxPrice"
            min={minPrice}
            max={maxPrice}
            value={selectedMaxPrice}
            onChange={handlePriceChange}
            step={10000}
            className="form-range"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
