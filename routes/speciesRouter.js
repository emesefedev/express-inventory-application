const { Router } = require("express")
const { 
  getVillagersNamesOfSpecies,
  getVillagersNamesOfSpeciesThatStartWith, 
  getSpecies
} = require("../controllers/villagerController")
const { capitalize, isValidLetter } = require("../utilities/strings")
const { getFirstLettersGivenNames } = require("../utilities/names")
const { linksVillagers } = require("../utilities/links")
const { checkSpeciesExist } = require("../utilities/villagers")

const speciesRouter = Router()

speciesRouter.get("/", async (req, res) => {
  const species = await getSpecies()
  
  res.render("species", { 
    title: "Species", 
    species, 
    capitalize, 
    links: linksVillagers 
  })
})

speciesRouter.get("/:species", async (req, res) => {
  const { species } = req.params;
  checkSpeciesExist(species)

  const villagersNames = await getVillagersNamesOfSpecies(species)
  const firstLetters = getFirstLettersGivenNames(villagersNames)
  
  res.render("villagers", { 
    title: `Species: ${species}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters, 
    subpath: `species/${species}` 
  })
})

speciesRouter.get("/:species/:letter", async (req, res) => {
  const { species, letter } = req.params;
  checkSpeciesExist(species)
  const validLetter = isValidLetter(letter)

  const villagersNames = await getVillagersNamesOfSpeciesThatStartWith(species, validLetter)
  
  res.render("villagers", { 
    title: `Species: ${species} & Letter: ${letter}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters: [] 
  })
})

module.exports = speciesRouter