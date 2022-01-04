const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  result: {
    type: Number,
  },
  number1: {
    type: Number,
    required: true,
  },
  number2: {
    type: Number,
    required: true,
  },
});
const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
