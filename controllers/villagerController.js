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

module.exports = {
  getVillagers,
  getVillagersNames,
  getVillagerByName,
  getVillagersNamesOfSpecies,
  getSpecies
}