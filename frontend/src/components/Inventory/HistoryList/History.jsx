import { useState, useEffect, useContext } from "react";

// Components
import HistoryItem from "./HistoryItem";

// Styles
import styles from "./styles/History.module.scss";

// Utilities
import { axios } from "../../utilities";
import { UserContext } from "../../EntryPoint";

export default function History() {
  const [historyItems, setHistoryItems] = useState({
    isItemsArrived: false,
    items: [],
  });
  const { userData } = useContext(UserContext);

  const loadHistory = async () => {
    try {
      const response = await axios.get("history/");
      setHistoryItems({ isItemsArrived: true, items: response.data });
    } catch (error) {
      setHistoryItems({ isItemsArrived: true, items: [] });
    }
  };
  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className={styles.historyContainer}>
      {/* Title */}
      <div className={styles.heading}>
        <h1>{userData.username}'s histories</h1>
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
