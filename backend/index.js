const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("backend is working !");
});

app.use("/api/inchApp", require("./routes/swapRoutes.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
