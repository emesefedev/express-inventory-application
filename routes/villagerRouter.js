const { Router } = require("express")
const { 
  getVillagersNames, 
  getVillagersNamesThatStartWith,
  getVillagerByName, 
  getVillagersNamesOfSpecies,
  getVillagersNamesOfSpeciesThatStartWith, 
  getSpecies,
  getVillagersNamesOfGender, 
  getVillagersNamesOfGenderThatStartWith,
  getGenders,
  getVillagersNamesOfPersonality,
  getVillagersNamesOfPersonalityThatStartWith,
  getPersonalities,
  getFirstLetters
} = require('../controllers/villagerController')
const { capitalize } = require('../utilities/strings')
const { formatDateToDDMM } = require('../utilities/dates')
const { getFirstLettersGivenNames } = require('../utilities/names')

const links = [
  { href: "/", text: "Home" },
  { href: "/villagers", text: "Villagers" },
  { href: "/villagers/species", text: "Species" },
  { href: "/villagers/genders", text: "Genders" },
  { href: "/villagers/personalities", text: "Personalities" },
]

const villagerRouter = Router()

villagerRouter.get("/", async (req, res) => {
  const villagersNames = await getVillagersNames()
  const firstLetters = await getFirstLetters()
  res.render("villagers", { title: "Villagers", villagersNames, capitalize, links, firstLetters, subpath: "names" })
})

villagerRouter.get("/species", async (req, res) => {
  const species = await getSpecies()
  
  res.render("species", { title: "Species", species, capitalize, links })
})

villagerRouter.get("/species/:species", async (req, res) => {
  const { species } = req.params;
  const villagersNames = await getVillagersNamesOfSpecies(species)
  const firstLetters = getFirstLettersGivenNames(villagersNames)
  
  res.render("villagers", { 
    title: `Species: ${species}`, 
    villagersNames, 
    capitalize, 
    links, 
    firstLetters, 
    subpath: `species/${species}` 
  })
})

villagerRouter.get("/species/:species/:letter", async (req, res) => {
  const { species, letter } = req.params;
  const villagersNames = await getVillagersNamesOfSpeciesThatStartWith(species, letter)
  
  res.render("villagers", { 
    title: `Species: ${species} & Letter: ${letter}`, 
    villagersNames, 
    capitalize, 
    links, 
    firstLetters: [] 
  })
})

villagerRouter.get("/genders", async (req, res) => {
  const genders = await getGenders()
  
  res.render("genders", { title: "Genders", genders, capitalize, links })
})

villagerRouter.get("/genders/:gender", async (req, res) => {
  const { gender } = req.params;
  const villagersNames = await getVillagersNamesOfGender(gender)
  const firstLetters = getFirstLettersGivenNames(villagersNames)
  
  res.render("villagers", { 
    title: `Gender: ${gender}`, 
    villagersNames, 
    capitalize, 
    links, 
    firstLetters, 
    subpath: `genders/${gender}` 
  })
})

villagerRouter.get("/genders/:gender/:letter", async (req, res) => {
  const { gender, letter } = req.params;
  const villagersNames = await getVillagersNamesOfGenderThatStartWith(gender, letter)
  
  res.render("villagers", { 
    title: `Gender: ${gender} & Letter: ${letter}`, 
    villagersNames, 
    capitalize, 
    links, 
    firstLetters: [] 
  })
})

villagerRouter.get("/personalities", async (req, res) => {
  const personalities = await getPersonalities()
  
  res.render("personalities", { title: "Personalities", personalities, capitalize, links })
})

villagerRouter.get("/personalities/:personality", async (req, res) => {
  const { personality } = req.params;
  const villagersNames = await getVillagersNamesOfPersonality(personality)
  const firstLetters = getFirstLettersGivenNames(villagersNames)
  
  res.render("villagers", { 
    title: `Personality: ${personality}`, 
    villagersNames, 
    capitalize, 
    links, 
    firstLetters, 
    subpath: `personalities/${personality}` 
  })
})

villagerRouter.get("/personalities/:personality/:letter", async (req, res) => {
  const { personality, letter } = req.params;
  const villagersNames = await getVillagersNamesOfPersonalityThatStartWith(personality, letter)
  
  res.render("villagers", { 
    title: `Personality: ${personality} & Letter: ${letter}`, 
    villagersNames, 
    capitalize, 
    links, 
    firstLetters: [] 
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
    links, 
    firstLetters: [] 
  })
})

villagerRouter.get("/:villagerName", async (req, res) => {
  const { villagerName } = req.params;
  const villager = await getVillagerByName(villagerName)

  res.render("villagerInfo", { villager, capitalize, dateFormatter: formatDateToDDMM, links })
})

module.exports = villagerRouter