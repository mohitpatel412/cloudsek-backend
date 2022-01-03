const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const resultRouter = require("./routes/resultRoute");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://backend:backend@cluster0.zvwsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", function () {
  console.log("Database Connected");
});

app.use("/", resultRouter);

app.listen(process.env.PORT || 4444, () => {
  console.log(`Server is running at port http://127.0.0.1:${4444}`);
});
