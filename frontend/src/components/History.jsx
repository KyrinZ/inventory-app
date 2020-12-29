// Components
import HistoryItem from "./HistoryItem";

// Styles
import styles from "./History.module.scss";

const username = "TestUser";
const histories = [
  "Chair was added on 24 July, 14:21.",
  "Table was deleted on 24 July, 14:21.",
  "Guiter was updated on 24 July, 14:21.",
];
export default function History() {
  return (
    <div className={styles.historyContainer}>
      {/* Title */}
      <div className={styles.heading}>
        <h1>{username}'s histories</h1>
      </div>

      <div className={styles.histories}>
        {histories.length > 0
          ? histories.map((history, index) => (
              <HistoryItem key={index} historyText={history} />
            ))
          : "No activities occurred"}
      </div>
    </div>
  );
}
