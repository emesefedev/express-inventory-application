require('dotenv').config()
const { capitalize } = require('./utilities/strings')

const express = require("express")
const app = express()

const path = require("node:path")

const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const villagerRouter = require("./routes/villagerRouter")

app.use("/villagers", villagerRouter)

app.get("/", (req, res) => {
    res.render("index", { title: "Inventory Application", message: "Home Page", capitalize })
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})