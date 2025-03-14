import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNews } from "../../hooks/useNews";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import PreferencesModal from "../../components/PreferencesModal/PreferencesModal";
import styles from "./Home.module.css";
import { NewsSource } from "../../types/api.types";

const Home: React.FC = () => {
  const { sources } = useSelector((state: RootState) => state.preferences);

  // Default values
  const defaultKeyword = 'technology'; // Default keyword
  const defaultFromDate = (() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return thirtyDaysAgo.toISOString().split('T')[0];
  })();
  const defaultToDate = (() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  })();
  const defaultSources: NewsSource[] = ['newsapi', 'guardian', 'nyt'];

  const [keyword, setKeyword] = useState(defaultKeyword);
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showPreferences, setShowPreferences] = useState(false);

  const { data, isLoading, isError, error, isFetching } = useNews(
    {
      keyword: selectedCategory || keyword,
      fromDate,
      toDate,
    },
    sources.length ? sources as NewsSource[] : defaultSources
  );

  const handleSearch = useCallback((searchTerm: string) => {
    setKeyword(searchTerm.trim());
  }, []);

  const handleDateChange = useCallback((from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <SearchBar onSearch={handleSearch} />
        <button 
          className={styles.preferencesButton}
          onClick={() => setShowPreferences(true)}
        >
          Preferences
        </button>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Filters
            fromDate={fromDate}
            toDate={toDate}
            onDateChange={handleDateChange}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        <main className={styles.articles}>
          {(isLoading || isFetching) && (
            <div className={styles.loading}>Loading articles...</div>
          )}

          {isError && (
            <div className={styles.error}>
              Error: { 'Failed to fetch articles'}
            </div>
          )}

          {!isLoading && !isError && data?.length === 0 && keyword && (
            <div className={styles.noResults}>
              No articles found for "{keyword}"
            </div>
          )}

          {!isLoading && !isError && data && (
            <div className={styles.articleGrid}>
              {data.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </main>
      </div>

      {showPreferences && (
        <PreferencesModal onClose={() => setShowPreferences(false)} />
      )}
    </div>
  );
};

export default Home;
