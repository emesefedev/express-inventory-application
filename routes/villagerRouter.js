const { Router } = require("express")
const { getVillagersNames, getVillagerByName, getVillagersNamesOfSpecies, getSpecies, getGenders } = require('../controllers/villagerController')
const { capitalize } = require('../utilities/strings')
const { formatDateToDDMM } = require('../utilities/dates')
const { getVillagersNamesOfGender } = require("../db/queries")

const villagerRouter = Router()

villagerRouter.get("/", async (req, res) => {
  const villagersNames = await getVillagersNames()
  res.render("villagers", { title: "Villagers", villagersNames, capitalize })
})

villagerRouter.get("/species", async (req, res) => {
  const species = await getSpecies()
  
  res.render("species", { title: "Villagers' Species", species, capitalize })
})

villagerRouter.get("/species/:species", async (req, res) => {
  const { species } = req.params;
  const villagersNames = await getVillagersNamesOfSpecies(species)
  
  res.render("villagers", { title: `${species}s`, villagersNames, capitalize })
})

villagerRouter.get("/genders", async (req, res) => {
  const genders = await getGenders()
  
  res.render("genders", { title: "Villagers' Genders", genders, capitalize })
})

villagerRouter.get("/genders/:gender", async (req, res) => {
  const { gender } = req.params;
  const villagersNames = await getVillagersNamesOfGender(gender)
  
  res.render("villagers", { title: `${gender}s`, villagersNames, capitalize })
})

villagerRouter.get("/:villagerName", async (req, res) => {
  const { villagerName } = req.params;
  const villager = await getVillagerByName(villagerName)

  res.render("villagerInfo", { villager, capitalize, dateFormatter: formatDateToDDMM })
})

module.exports = villagerRouter