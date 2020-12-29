// Styles
import styles from "./HistoryItem.module.scss";

import historyIcon from "../assets/history-icon.svg";

export default function HistoryItem({ historyText }) {
  return (
    <div className={styles.historyItemContainer}>
      <div className={styles.icon}>
        <img src={historyIcon} alt="HistoryIcon" />
      </div>
      <p>{historyText}</p>
    </div>
  );
}
