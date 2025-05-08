const db = require("../db/queries")
const CustomNotFoundError = require("../errors/CustomNotFoundError")
const CustomNotValidError = require("../errors/CustomNotValidError")
const asyncHandler = require("express-async-handler")
const { capitalize, isSingleLetter } = require("../utilities/strings")
const { allSpecies, allGenders, allPersonalities } = require("../utilities/villagersConstants")
const { months, isValidMonth, isValidDayOfMonth } = require("../utilities/dates")

async function getVillagersNames() {
  const villagersNames = await db.getAllVillagersNames()

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError("No villagers found")
  }

  return villagersNames
}

const getVillagerByName = asyncHandler (async (name) =>  {
  const villager = await db.getVillagerByName(name)

  if (villager.length === 0) {
    throw new CustomNotFoundError(`Villager ${capitalize(name)} not found`)
  }

  return villager[0]
})

const getVillagersNamesThatStartWith = asyncHandler (async (letter) =>  {
  const villagersNames = await db.getVillagersNamesThatStartWith(letter)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`No villager found whose name begins with ${capitalize(letter)}`)
  }

  return villagersNames
})

const getVillagersNamesOfSpecies = asyncHandler (async (species) =>  {

  checkSpeciesExist(species)

  const villagersNames = await db.getVillagersNamesOfSpecies(species)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`Species ${capitalize(species)} not found`)
  }

  return villagersNames
})

const getVillagersNamesOfSpeciesThatStartWith = asyncHandler (async (species, letter) =>  {
  
  checkSpeciesExist(species)

  const validLetter = checkIsValidLetter(letter)

  const villagersNames = await db.getVillagersNamesOfSpeciesThatStartWith(species, validLetter)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(
      `There is no villager of the ${capitalize(species)} species that starts with the letter ${capitalize(validLetter)}`
  )}

  return villagersNames
})

async function getSpecies() {
  const species = await db.getSpecies()

  if (species.length === 0) {
    throw new CustomNotFoundError("No villagers found")
  }

  return species
}

const getVillagersNamesOfGender = asyncHandler (async (gender) =>  {
  
  checkGenderExist(gender)

  const villagersNames = await db.getVillagersNamesOfGender(gender)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`Gender ${capitalize(gender)} not found`)
  }

  return villagersNames
})

const getVillagersNamesOfGenderThatStartWith = asyncHandler (async (gender, letter) =>  {

  checkGenderExist(gender)

  const validLetter = checkIsValidLetter(letter)

  const villagersNames = await db.getVillagersNamesOfGenderThatStartWith(gender, validLetter)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(
      `There is no villager of the ${capitalize(gender)} gender that starts with the letter ${capitalize(validLetter)}`
  )}

  return villagersNames
})

async function getGenders() {
  const genders = await db.getGenders()

  if (genders.length === 0) {
    throw new CustomNotFoundError("No villagers found")
  }

  return genders
}

const getVillagersNamesOfPersonality = asyncHandler (async (personality) =>  {

  checkPersonalityExist(personality)

  const villagersNames = await db.getVillagersNamesOfPersonality(personality)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`Personality ${capitalize(personality)} not found`)
  }

  return villagersNames
})

const getVillagersNamesOfPersonalityThatStartWith = asyncHandler (async (personality, letter) =>  {

  checkPersonalityExist(personality)

  const validLetter = checkIsValidLetter(letter)

  const villagersNames = await db.getVillagersNamesOfPersonalityThatStartWith(personality, validLetter)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(
      `There is no villager of the ${capitalize(personality)} personality that starts with the letter ${capitalize(validLetter)}`)
  }

  return villagersNames
})

async function getPersonalities() {
  const personalities = await db.getPersonalities()

  if (personalities.length === 0) {
    throw new CustomNotFoundError("No villagers found")
  }

  return personalities
}

async function getFirstLetters() {
  const firstLetters = await db.getFirstLetters()

  if (firstLetters.length === 0) {
    throw new CustomNotFoundError("No villagers found")
  }

  return firstLetters
}

const getVillagersNamesWithBirthdaysInMonthPerDay = asyncHandler (async (monthName) =>  {

  const monthIdx = checkIsValidMonthName(monthName)
  const month = months[monthIdx]

  const villagersBirthdays = {}
  for (let day = 1; day <= month.totalDays; day++) {
    villagersBirthdays[day] = await getVillagersNamesWithBirthdaysInDate(month.monthNumber, day)
  }

  return { villagersBirthdays, month }
})

const getVillagersNamesWithBirthdaysInDate = asyncHandler (async (month, day) =>  {
  
  checkIsValidMonth(month)
  checkIsValidDayOfMonth(day, month)

  const villagersNames = await db.getVillagersNamesWithBirthdaysInDate(month, day)

  return villagersNames
})

module.exports = {
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
  getFirstLetters,
  getVillagersNamesWithBirthdaysInMonthPerDay,
  getVillagersNamesWithBirthdaysInDate
}

function checkSpeciesExist(species) {
  if (!allSpecies.includes(species)) {
    throw new CustomNotFoundError(`There is no ${capitalize(species)} species`)
  }
}

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

function checkIsValidLetter(letter) {
  const lowerLetter = letter.toLowerCase()
  
  if (!isSingleLetter(lowerLetter)) {
    throw new CustomNotValidError(`${letter} is not a valid letter`)
  }

  return lowerLetter
}

function checkIsValidMonthName(monthName) {
  const monthIdx = months.findIndex(m => m.monthName === monthName)

  if (monthIdx === -1) {
    throw new CustomNotValidError(`Invalid month`)
  }

  return monthIdx
}

function checkIsValidMonth(month) {
  if (!isValidMonth(month)) {
    throw new CustomNotValidError(`Invalid month`)
  }
}

function checkIsValidDayOfMonth(day, month) {
  if (!isValidDayOfMonth(day, month)) {
    throw new CustomNotValidError(`Invalid date: ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`)
  }
}