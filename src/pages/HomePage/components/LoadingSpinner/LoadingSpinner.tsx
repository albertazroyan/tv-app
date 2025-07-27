import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__content">
        <div className="loading-spinner__spinner"></div>
        <p>Loading your entertainment...</p>
      </div>
    </div>
  );
};
