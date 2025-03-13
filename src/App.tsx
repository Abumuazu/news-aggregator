import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/reactQueryClient';
import ConnectivityBanner from './components/ConnectivityBanner/ConnectivityBanner';
import Home from './pages/Home/Home';
import styles from './App.module.css';
import NetworkStatus from './components/NetworkStatus';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkStatus />
      <div className={styles.appContainer}>
        <ConnectivityBanner /> {/* Displays online/offline status */}
        <header className={styles.header}>
          <h1>News Aggregator</h1>
        </header>
        <Home />
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} News Aggregator</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default App;
