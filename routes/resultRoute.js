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
    const num1 = req.params.number1;
    const num2 = req.params.number2;
    let data;
    try {
      data = new Result({
        number1: num1,
        number2: num2,
      });

      data.save();
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: "404 Error",
      });
    }
    res.status(200).json({
      id: data._id,
    });
  })
);

resultRouter.get(
  "/get_answer/:idenitfier",
  expressAsyncHandler(async (req, res) => {
    const data = req.params.idenitfier;
    try {
      const result = await Result.findById(data);
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
          message: "Couldn't find result!!",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: "404 Error",
      });
    }
  })
);

module.exports = resultRouter;
