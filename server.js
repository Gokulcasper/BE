const express = require("express");
const mongoose = require("mongoose");

const port = 4444;

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://0598ashok:0598ashok@cluster0.mkzrh9f.mongodb.net/ashok?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((req, res) => {
    console.log("db connected....");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(require("./Api's/User"));

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
