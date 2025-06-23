const { Router } = require("express")
const {
  getVillagersNamesOfPersonality,
  getVillagersNamesOfPersonalityThatStartWith,
  getPersonalities
} = require("../controllers/villagerController")
const { capitalize, isValidLetter } = require("../utilities/strings")
const { getFirstLettersGivenNames } = require("../utilities/names")
const { linksVillagers } = require("../utilities/links")
const { checkPersonalityExist } = require("../utilities/villagers")

const personalityRouter = Router()

personalityRouter.get("/", async (req, res) => {
  const personalities = await getPersonalities()
  
  res.render("personalities", { 
    title: "Personalities", 
    personalities, 
    capitalize, 
    links: linksVillagers 
  })
})

personalityRouter.get("/:personality", async (req, res) => {
  const { personality } = req.params;
  checkPersonalityExist(personality)

  const villagersNames = await getVillagersNamesOfPersonality(personality)
  const firstLetters = getFirstLettersGivenNames(villagersNames)
  
  res.render("villagers", { 
    title: `Personality: ${personality}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters, 
    subpath: `personalities/${personality}` 
  })
})

personalityRouter.get("/:personality/:letter", async (req, res) => {
  const { personality, letter } = req.params;
  checkPersonalityExist(personality)
  const validLetter = isValidLetter(letter)

  const villagersNames = await getVillagersNamesOfPersonalityThatStartWith(personality, validLetter)
  
  res.render("villagers", { 
    title: `Personality: ${personality} & Letter: ${letter}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters: [] 
  })
})

module.exports = personalityRouter