const db = require("../db/queries")

async function getVillagersNames(req, res) {
  const villagersNames = await db.getAllVillagersNames()
  console.log("Names: ", villagersNames)
  return villagersNames
}

async function getVillagers(req, res) {
  const villagers = await db.getAllVillagers()
  console.log("Villagers: ", villagers)
  return villagers
}

module.exports = {
  getVillagers,
  getVillagersNames
}