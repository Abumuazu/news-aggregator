import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCategories, setAuthors } from "../../features/preferencesSlice";
import styles from "./PreferencesModal.module.css";

interface Props {
  onClose: () => void;
}

const PreferencesModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { categories, authors } = useSelector(
    (state: RootState) => state.preferences
  );

  const [localCategories, setLocalCategories] = useState<string>(
    categories.join(", ")
  );
  const [localAuthors, setLocalAuthors] = useState<string>(authors.join(", "));

  const handleSave = () => {
    const categoryArray = localCategories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const authorArray = localAuthors
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
    dispatch(setCategories(categoryArray));
    dispatch(setAuthors(authorArray));
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
        <div className={styles.field}>
          <label>Preferred Categories (comma-separated):</label>
          <input
            type="text"
            value={localCategories}
            onChange={(e) => setLocalCategories(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Preferred Authors (comma-separated):</label>
          <input
            type="text"
            value={localAuthors}
            onChange={(e) => setLocalAuthors(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default PreferencesModal;
