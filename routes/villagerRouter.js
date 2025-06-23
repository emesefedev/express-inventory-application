const { Router } = require("express")
const { 
  getVillagersNames, 
  getVillagersNamesThatStartWith,
  getVillagerByName,
  getFirstLetters
} = require('../controllers/villagerController')
const { capitalize } = require('../utilities/strings')
const { formatDateToDDMM } = require('../utilities/dates')
const { linksVillagers } = require('../utilities/links')

const speciesRouter = require("./speciesRouter")
const genderRouter = require("./genderRouter")
const personalityRouter = require("./personalityRouter")
const birthdayRouter = require("./birthdayRouter")

const villagerRouter = Router()

villagerRouter.use("/species", speciesRouter)
villagerRouter.use("/genders", genderRouter)
villagerRouter.use("/personalities", personalityRouter)
villagerRouter.use("/birthdays", birthdayRouter)

villagerRouter.get("/", async (req, res) => {
  const [villagersNames, firstLetters] = await Promise.all([
    getVillagersNames(),
    getFirstLetters()
  ])
  res.render("villagers", { 
    title: "Villagers", 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters, 
    subpath: "names" 
  })
})

villagerRouter.get("/names", async (req, res) => {
  res.redirect("/villagers")
})

villagerRouter.get("/names/:letter", async (req, res) => {
  const { letter } = req.params;
  const villagersNames = await getVillagersNamesThatStartWith(letter)

  res.render("villagers", { 
    title: `Villagers with names that start with ${letter}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters: [] 
  })
})

villagerRouter.get("/:villagerName", async (req, res) => {
  const { villagerName } = req.params;
  const villager = await getVillagerByName(villagerName)

  res.render("villagerInfo", { 
    villager, 
    capitalize, 
    dateFormatter: formatDateToDDMM, 
    links: linksVillagers 
  })
})

module.exports = villagerRouter