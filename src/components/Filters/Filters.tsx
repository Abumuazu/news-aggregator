import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setSources } from "../../features/preferencesSlice";
import styles from "./Filters.module.css";

interface FiltersProps {
  fromDate: string;
  toDate: string;
  onDateChange: (from: string, to: string) => void;
  onCategoryChange: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  fromDate,
  toDate,
  onDateChange,
  onCategoryChange,
}) => {
  const dispatch = useDispatch();
  const { sources } = useSelector((state: RootState) => state.preferences);
  const [selectedSources, setSelectedSources] = useState<string[]>(sources);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;

    const newToDate = toDate < newFromDate ? newFromDate : toDate;
    onDateChange(newFromDate, newToDate);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value;

    const newFromDate = fromDate > newToDate ? newToDate : fromDate;
    onDateChange(newFromDate, newToDate);
  };

  const handleSourceChange = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  useEffect(() => {
    dispatch(setSources(selectedSources));
  }, [selectedSources, dispatch]);

  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.filters}>
      <div className={styles.dateFilter}>
        <h3>Date Range</h3>
        <label>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            max={maxDate}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            min={fromDate}
            max={maxDate}
          />
        </label>
      </div>

      <div className={styles.categoryFilter}>
        <h3 className={styles.categoryFilterTitle}>Category</h3>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
        </select>
      </div>

      <div className={styles.sourceFilter}>
        <h3>Sources</h3>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={selectedSources.includes("newsapi")}
              onChange={() => handleSourceChange("newsapi")}
            />
            NewsAPI
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedSources.includes("guardian")}
              onChange={() => handleSourceChange("guardian")}
            />
            The Guardian
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedSources.includes("nyt")}
              onChange={() => handleSourceChange("nyt")}
            />
            New York Times
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
