import HistoryItem from "./HistoryItem";

const username = "TestUser";
const histories = [
  "Chair was added on 24 July, 14:21.",
  "Table was deleted on 24 July, 14:21.",
  "Guiter was updated on 24 July, 14:21.",
];
export default function History() {
  return (
    <div>
      {/* Title */}
      <div>
        <h1>{username} History</h1>
      </div>

      <div>
        {histories.length > 0
          ? histories.map((history, index) => (
              <HistoryItem key={index} historyText={history} />
            ))
          : "No activities occurred"}
      </div>
    </div>
  );
}
