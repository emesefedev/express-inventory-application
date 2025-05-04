const { Router } = require("express")
const { 
  getVillagersNamesOfGender, 
  getVillagersNamesOfGenderThatStartWith,
  getGenders
} = require('../controllers/villagerController')
const { capitalize } = require('../utilities/strings')
const { getFirstLettersGivenNames } = require('../utilities/names')
const { linksVillagers } = require('../utilities/links')

const genderRouter = Router()

genderRouter.get("/", async (req, res) => {
  const genders = await getGenders()
  
  res.render("genders", { 
    title: "Genders", 
    genders, 
    capitalize, 
    links: linksVillagers 
  })
})

genderRouter.get("/:gender", async (req, res) => {
  const { gender } = req.params;
  const villagersNames = await getVillagersNamesOfGender(gender)
  const firstLetters = getFirstLettersGivenNames(villagersNames)
  
  res.render("villagers", { 
    title: `Gender: ${gender}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters, 
    subpath: `genders/${gender}` 
  })
})

genderRouter.get("/:gender/:letter", async (req, res) => {
  const { gender, letter } = req.params;
  const villagersNames = await getVillagersNamesOfGenderThatStartWith(gender, letter)
  
  res.render("villagers", { 
    title: `Gender: ${gender} & Letter: ${letter}`, 
    villagersNames, 
    capitalize, 
    links: linksVillagers, 
    firstLetters: [] 
  })
})

module.exports = genderRouter