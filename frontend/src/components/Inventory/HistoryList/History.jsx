import { useState, useEffect } from "react";

// Components
import HistoryItem from "./HistoryItem";

// Styles
import styles from "./styles/History.module.scss";

// Utilities
import instance from "../../utilities/axios";

const username = "TestUser";

export default function History() {
  const [historyItems, setHistoryItems] = useState({
    isItemsArrived: false,
    items: [],
  });

  const loadHistory = () => {
    instance
      .get("history/")
      .then(({ data }) => {
        setHistoryItems({ isItemsArrived: true, items: data });
      })
      .catch((err) => {
        setHistoryItems({ isItemsArrived: true, items: [] });
      });
  };
  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className={styles.historyContainer}>
      {/* Title */}
      <div className={styles.heading}>
        <h1>{username}'s histories</h1>
      </div>

      <div className={styles.histories}>
        {historyItems.isItemsArrived ? (
          historyItems.items.length > 0 ? (
            historyItems.items.map((history, index) => (
              <HistoryItem key={index}>
                {history.productName} was {history.updateType} on {history.date}
              </HistoryItem>
            ))
          ) : (
            <p>No activities occurred</p>
          )
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}
