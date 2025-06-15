require('dotenv').config()
const { capitalize } = require('./utilities/strings')

const express = require("express")
const path = require("node:path")
const villagerRouter = require("./routes/villagerRouter")

const links = [
  { href: "/", text: "Home" },
  { href: "/villagers", text: "Villagers" },
]

const app = express()

const publicDir = process.env.PUBLIC_DIR ?? __dirname
const assetsPath = path.join(publicDir, "public")
app.use(express.static(assetsPath))

app.set("views", path.join(publicDir, "views"))
app.set("view engine", "ejs")


app.use("/villagers", villagerRouter)

app.get("/", (req, res) => {
  res.render("index", {
    title: "Inventory Application",
    message: "This is my inventory application, where you can see information about Animal Crossing New Horizons' Villagers.",
    capitalize,
    links
  })
})

app.use((err, req, res, next) => {
  console.error(err);

  const errorStatusCode = err.statusCode || 500
  res.status(errorStatusCode)
  res.render("error", {
    title: `Error ${errorStatusCode}`,
    message: err.message,
    capitalize,
    links
  })
})

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})