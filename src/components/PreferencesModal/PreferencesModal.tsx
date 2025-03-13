import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./PreferencesModal.module.css";
import { setSources } from "../../features/preferencesSlice";
import Filters from "../Filters/Filters";
interface Props {
  onClose: () => void;
}

const PreferencesModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { sources } = useSelector((state: RootState) => state.preferences);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>(sources);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDateChange = useCallback((from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
  }, []);

  const handleSave = () => {
    dispatch(setSources(selectedSources));
    handleCategoryChange(selectedCategory);
    handleDateChange(fromDate, toDate);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Personalize Feed</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.filters}>
          <Filters
            fromDate={fromDate}
            toDate={toDate}
            onDateChange={handleDateChange}
            onCategoryChange={handleCategoryChange}
          />
          <button onClick={handleSave}>Save Preferences</button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
