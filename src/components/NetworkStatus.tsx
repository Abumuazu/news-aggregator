import React from 'react';
import useNetworkStatus from '../hooks/useNetworkStatus';

const NetworkStatus: React.FC = () => {
  const { isOnline } = useNetworkStatus();

  if (!isOnline) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '8px',
          textAlign: 'center',
          zIndex: 9999,
        }}
      >
        You are currently offline. Please check your internet connection.
      </div>
    );
  }

  return null;
};

export default NetworkStatus; 