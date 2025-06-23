require('dotenv').config()
// Important
const ejs = require('ejs')
const { capitalize } = require('./utilities/strings')

const express = require("express")
const path = require("node:path")
const villagerRouter = require("./routes/villagerRouter")

const links = [
  { href: "/", text: "Home" },
  { href: "/villagers", text: "Villagers" },
]

const assetsPath = process.env.APP_PUBLIC_DIR
const viewsPath = path.join(process.cwd(), "views")
console.log('Using', {
  assetsPath,
  viewsPath
})

const app = express()
app.use(express.static(assetsPath))

app.set("views", viewsPath)
app.set("view engine", "ejs")
app.engine('ejs', (path, data, cb) => {
  // Reference EJS otherwise it gets tree-shaken out of the bundle
  ejs.renderFile(path, data, {}, cb)
})

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