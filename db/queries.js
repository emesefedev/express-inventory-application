const pool = require("./pool")

async function getAllVillagers() {
  const { rows } = await pool.query("SELECT * FROM villagers ORDER BY name")
  return rows
}

async function getAllVillagersNames() {
  const { rows } = await pool.query("SELECT name FROM villagers ORDER BY name")
  return rows
}

async function getVillagerByName(name) {
  const { rows } = await pool.query("SELECT * FROM villagers WHERE name = ($1)", [name]) 
  return rows
}

async function getVillagersNamesOfSpecies(species) {
  const { rows } = await pool.query("SELECT name FROM villagers WHERE species = ($1) ORDER BY name", [species]) 
  return rows
}

async function getSpecies() {
  const { rows } = await pool.query("SELECT DISTINCT species FROM villagers ORDER BY species")
  return rows
}

async function getVillagersNamesOfGender(gender) {
  const { rows } = await pool.query("SELECT name FROM villagers WHERE gender = ($1) ORDER BY name", [gender]) 
  return rows
}

async function getGenders() {
  const { rows } = await pool.query("SELECT DISTINCT gender FROM villagers ORDER BY gender")
  return rows
}

async function getVillagersNamesOfPersonality(personality) {
  const { rows } = await pool.query("SELECT name FROM villagers WHERE personality = ($1) ORDER BY name", [personality]) 
  return rows
}

async function getPersonalities() {
  const { rows } = await pool.query("SELECT DISTINCT personality FROM villagers ORDER BY personality")
  return rows
}

module.exports = {
  getAllVillagers,
  getAllVillagersNames,
  getVillagerByName,
  getVillagersNamesOfSpecies,
  getSpecies,
  getVillagersNamesOfGender,
  getGenders,
  getVillagersNamesOfPersonality,
  getPersonalities
}