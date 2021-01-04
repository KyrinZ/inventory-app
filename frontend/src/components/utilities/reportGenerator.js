import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (items) => {
  console.log(items);
  const doc = new jsPDF();

  const tableColumn = [
    "Product Id",
    "Product Name",
    "Quantity",
    "Added on",
    "Last Updated",
  ];
  const tableRows = [];

  items.forEach((item) => {
    const itemData = [
      item.productId,
      item.productName,
      item.quantity,
      item.createdAt,
      item.updatedAt,
    ];
    tableRows.push(itemData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.text("All the products in the inventory", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
