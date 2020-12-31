// Styles
import styles from "./styles/HistoryItem.module.scss";

import historyIcon from "../../../assets/history-icon.svg";

export default function HistoryItem({ children }) {
  return (
    <div className={styles.historyItemContainer}>
      <div className={styles.icon}>
        <img src={historyIcon} alt="HistoryIcon" />
      </div>
      <p>{children}</p>
    </div>
  );
}
