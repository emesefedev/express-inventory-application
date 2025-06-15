const CustomNotFoundError = require("../errors/CustomNotFoundError")
const { allGenders, allPersonalities, allSpecies } = require("./villagersConstants")
const { capitalize } = require("./strings")

function checkGenderExist(gender) {
  if (!allGenders.includes(gender)) {
    throw new CustomNotFoundError(`There is no ${capitalize(gender)} gender`)
  }
}

function checkPersonalityExist(personality) {
  if (!allPersonalities.includes(personality)) {
    throw new CustomNotFoundError(`There is no ${capitalize(personality)} personality`)
  }
}

function checkSpeciesExist(species) {
  if (!allSpecies.includes(species)) {
    throw new CustomNotFoundError(`There is no ${capitalize(species)} species`)
  }
}

module.exports = {
  checkGenderExist,
  checkPersonalityExist,
  checkSpeciesExist
}