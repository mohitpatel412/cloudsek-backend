const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const resultRouter = express.Router();
const Result = require("../models/resultSchema");

resultRouter.get("/", (req, res) => {
  res.status(200).json(`Hi, Have a great day!!`);
});

resultRouter.get(
  "/calculate/:number1/:number2",
  expressAsyncHandler(async (req, res) => {
    let number1 = req.params.number1;
    let number2 = req.params.number2;
    const data = new Result({
      number1: number1,
      number2: number2,
    });
    try {
      data.save();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error!!",
      });
    }
    res.status(200).json({
      uniquieId: data._id,
    });
  })
);

resultRouter.get(
  "/get_answer/:idenitfier",
  expressAsyncHandler(async (req, res) => {
    let idenitfier = req.params.idenitfier;
    try {
      let result = await Result.findById(idenitfier);
      result.result = Number(result.number1) + Number(result.number2);

      if (result.result) {
        setTimeout(() => {
          res.status(200).json({
            message: "Result : ",
            result: result.result,
          });
        }, 10000);
      } else {
        res.status(200).json({
          message: "Please Wait...",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: "Not Found",
      });
    }
  })
);

module.exports = resultRouter;
