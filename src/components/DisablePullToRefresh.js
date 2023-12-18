// DisablePullToRefresh.js
import React, { useEffect } from 'react';

const DisablePullToRefresh = ({ isActive }) => {
  useEffect(() => {
    const preventPullToRefresh = (e) => {
      e.preventDefault();
    };

    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      document.body.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    } else {
      document.body.style.overflow = ''; // Reset overflow style
      document.body.style.overscrollBehavior = ''; // Reset overscroll-behavior style
      document.body.removeEventListener('touchmove', preventPullToRefresh);
    }

    return () => {
      // Clean up the event listener on component unmount
      document.body.style.overflow = ''; // Reset overflow style
      document.body.style.overscrollBehavior = ''; // Reset overscroll-behavior style
      document.body.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, [isActive]);

  return null;
};

export default DisablePullToRefresh;
