const { Router } = require("express")
const { 
  getVillagersNames, 
  getVillagerByName, 
  getVillagersNamesOfSpecies, 
  getSpecies,
  getVillagersNamesOfGender, 
  getGenders,
  getVillagersNamesOfPersonality,
  getPersonalities
} = require('../controllers/villagerController')
const { capitalize } = require('../utilities/strings')
const { formatDateToDDMM } = require('../utilities/dates')

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

villagerRouter.get("/personalities", async (req, res) => {
  const personalities = await getPersonalities()
  
  res.render("personalities", { title: "Villagers' Personalities", personalities, capitalize })
})

villagerRouter.get("/personalities/:personality", async (req, res) => {
  const { personality } = req.params;
  const villagersNames = await getVillagersNamesOfPersonality(personality)
  
  res.render("villagers", { title: `${personality}s`, villagersNames, capitalize })
})

villagerRouter.get("/:villagerName", async (req, res) => {
  const { villagerName } = req.params;
  const villager = await getVillagerByName(villagerName)

  res.render("villagerInfo", { villager, capitalize, dateFormatter: formatDateToDDMM })
})

module.exports = villagerRouter