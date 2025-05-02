const db = require("../db/queries")
const CustomNotFoundError = require("../errors/CustomNotFoundError")
const asyncHandler = require("express-async-handler")

async function getVillagers() {
  const villagers = await db.getAllVillagers()
  return villagers
}

async function getVillagersNames() {
  const villagersNames = await db.getAllVillagersNames()
  return villagersNames
}

const getVillagerByName = asyncHandler (async (name) =>  {
  const villager = await db.getVillagerByName(name)

  if (villager.length === 0) {
    throw new CustomNotFoundError("Villager not found")
  }

  return villager[0]
})

const getVillagersNamesThatStartWith = asyncHandler (async (letter) =>  {
  const villagersNames = await db.getVillagersNamesThatStartWith(letter)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError("Letter not found")
  }

  return villagersNames
})

const getVillagersNamesOfSpecies = asyncHandler (async (species) =>  {
  const villagersNames = await db.getVillagersNamesOfSpecies(species)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError("Species not found")
  }

  return villagersNames
})

async function getSpecies() {
  const species = await db.getSpecies()
  return species
}

const getVillagersNamesOfGender = asyncHandler (async (gender) =>  {
  const villagersNames = await db.getVillagersNamesOfGender(gender)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError("Gender not found")
  }

  return villagersNames
})

async function getGenders() {
  const genders = await db.getGenders()
  return genders
}

const getVillagersNamesOfPersonality = asyncHandler (async (personality) =>  {
  const villagersNames = await db.getVillagersNamesOfPersonality(personality)

  if (villagersNames.length === 0) {
    throw new CustomNotFoundError("Personality not found")
  }

  return villagersNames
})

async function getPersonalities() {
  const personalities = await db.getPersonalities()
  return personalities
}

async function getFirstLetters() {
  const firstLetters = await db.getFirstLetters()
  return firstLetters
}

module.exports = {
  getVillagers,
  getVillagersNames,
  getVillagersNamesThatStartWith,
  getVillagerByName,
  getVillagersNamesOfSpecies,
  getSpecies,
  getVillagersNamesOfGender,
  getGenders,
  getVillagersNamesOfPersonality,
  getPersonalities,
  getFirstLetters
}