import React, { useState } from 'react';

const Menu = ({ onMenuClick }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      onMenuClick(); // Call onMenuClick here
    };
  
    return (
      <div className={`menu cross menu--1 ${isChecked ? 'active' : ''}`}>
        <label>
          <input
            style={{ display: 'none' }}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <svg className='meun-svg' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
            <path className="line--2" d="M0 50h70" />
            <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
          </svg>
        </label>
      </div>
    );
  };
  
  export default Menu;
  
