const pool = require("./pool")

async function getAllVillagers() {
  const { rows } = await pool.query("SELECT * FROM villagers ORDER BY name")
  return rows
}

async function getAllVillagersNames() {
  const { rows } = await pool.query("SELECT name FROM villagers ORDER BY name")
  return rows
}

async function getVillagersNamesThatStartWith(letter) {
  const pattern = `${letter}%`
  const { rows } = await pool.query("SELECT name FROM villagers WHERE name LIKE ($1) ORDER BY name", [pattern])
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

async function getVillagersNamesOfSpeciesThatStartWith(species, letter) {
  const pattern = `${letter}%`
  const { rows } = await pool.query("SELECT name FROM villagers WHERE species = ($1) AND name LIKE ($2) ORDER BY name", 
    [species, pattern]) 
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

async function getVillagersNamesOfGenderThatStartWith(gender, letter) {
  const pattern = `${letter}%`
  const { rows } = await pool.query("SELECT name FROM villagers WHERE gender = ($1) AND name LIKE ($2) ORDER BY name", 
    [gender, pattern]) 
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

async function getVillagersNamesOfPersonalityThatStartWith(personality, letter) {
  const pattern = `${letter}%`
  const { rows } = await pool.query("SELECT name FROM villagers WHERE personality = ($1) AND name LIKE ($2) ORDER BY name", 
    [personality, pattern]) 
  return rows
}

async function getPersonalities() {
  const { rows } = await pool.query("SELECT DISTINCT personality FROM villagers ORDER BY personality")
  return rows
}

async function getFirstLetters() {
  const { rows } = await pool.query("SELECT DISTINCT LEFT(name, 1) AS firstLetter FROM villagers ORDER BY firstLetter")
  return rows
}

async function getBirthdays() {
  const { rows } = await pool.query("SELECT DISTINCT birthday FROM villagers ORDER BY birthday")
  return rows
}

async function getVillagersNamesWithBirthdaysInDate(month, day) {
  const { rows } = await pool.query(
    "SELECT name FROM villagers WHERE EXTRACT(MONTH FROM birthday) = ($1) AND EXTRACT(DAY FROM birthday) = ($2) ORDER BY name",
    [month, day])
  return rows
}

module.exports = {
  getAllVillagers,
  getAllVillagersNames,
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
  getVillagersNamesWithBirthdaysInDate
}