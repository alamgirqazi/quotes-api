const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuotesSchema = new Schema({
  quote: {
    type: String,
    default: "",
    trim: true
  },
  author: {
    type: String,
    default: "",
    trim: true
  },
  id: {
    type: String
  }
});

module.exports = mongoose.model("Quotes", QuotesSchema);