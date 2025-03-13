import React from 'react';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import styles from './ConnectivityBanner.module.css';

const ConnectivityBanner: any = () => {
  const { isOnline } = useNetworkStatus();

  return (
    !isOnline && (
      <div className={styles.banner}>
        <p>You are offline. Some features may not be available.</p>
      </div>
    )
  );
};
export default ConnectivityBanner;

