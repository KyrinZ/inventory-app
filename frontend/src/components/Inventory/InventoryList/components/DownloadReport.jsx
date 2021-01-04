import { generatePDF } from "../../../utilities";

function DownloadReport({ items, ...rest }) {
  return (
    <button
      {...rest}
      onClick={() => {
        generatePDF(items);
      }}
    >
      Download Report
    </button>
  );
}

export default DownloadReport;
