require('dotenv').config();

const express = require("express");
const app = express();

const villagerRouter = require("./routes/villagerRouter");

app.use("/villagers", villagerRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});