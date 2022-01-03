const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  number1: {
    type: Number,
    required: true,
  },
  number2: {
    type: Number,
    required: true,
  },
  result: {
    type: Number,
  },
});
const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
