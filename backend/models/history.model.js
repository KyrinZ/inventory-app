const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    productName: { type: String, required: true },
    updateType: { type: String, enum: ["added", "updated", "deleted"] },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
