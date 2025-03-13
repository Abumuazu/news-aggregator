import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search articles..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="Search articles"
      />
      <button className={styles.button} type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
