const db = require("../db/queries")
const CustomNotFoundError = require("../errors/CustomNotFoundError")
const asyncHandler = require("express-async-handler")
const { capitalize } = require("../utilities/strings")
const { months, checkIsValidMonth, checkIsValidDayOfMonth } = require("../utilities/dates")

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

const getVillagersNamesThatStartWith = asyncHandler (async (str) =>  {
  const villagersNames = await db.getVillagersNamesThatStartWith(str)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`No villager found whose name begins with ${capitalize(str)}`)
  }

  return villagersNames
})

const getVillagersNamesOfSpecies = asyncHandler (async (species) =>  {
  const villagersNames = await db.getVillagersNamesOfSpecies(species)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`Species ${capitalize(species)} not found`)
  }

  return villagersNames
})

const getVillagersNamesOfSpeciesThatStartWith = asyncHandler (async (species, letter) =>  {
  const villagersNames = await db.getVillagersNamesOfSpeciesThatStartWith(species, letter)

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

  const villagersNames = await db.getVillagersNamesOfGender(gender)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`Gender ${capitalize(gender)} not found`)
  }

  return villagersNames
})

const getVillagersNamesOfGenderThatStartWith = asyncHandler (async (gender, letter) =>  {

  const villagersNames = await db.getVillagersNamesOfGenderThatStartWith(gender, letter)

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

  const villagersNames = await db.getVillagersNamesOfPersonality(personality)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError(`Personality ${capitalize(personality)} not found`)
  }

  return villagersNames
})

const getVillagersNamesOfPersonalityThatStartWith = asyncHandler (async (personality, letter) =>  {

  const villagersNames = await db.getVillagersNamesOfPersonalityThatStartWith(personality, letter)

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

const getVillagersNamesWithBirthdaysInMonthPerDay = asyncHandler (async (monthIndex) =>  {

  const month = months[monthIndex]

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
  getVillagersNamesWithBirthdaysInMonthPerDay
}

