require('dotenv').config()
const { capitalize } = require('./utilities/strings')
const express = require("express")
const path = require("node:path")

const links = [
  { href: "/", text: "Home" },
  { href: "/villagers", text: "Villagers" },
]

const app = express()

const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const villagerRouter = require("./routes/villagerRouter")

app.use("/villagers", villagerRouter)

app.get("/", (req, res) => {
    res.render("index", { 
      title: "Inventory Application", 
      message: "This is my inventory application, where you can see information about Animal Crossing New Horizons' Villagers.", 
      capitalize, 
      links })
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})