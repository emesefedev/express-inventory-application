const pool = require("./pool")

async function getAllVillagers() {
  const { rows } = await pool.query("SELECT * FROM villagers")
  return rows
}

async function getAllVillagersNames() {
  const { rows } = await pool.query("SELECT name FROM villagers")
  return rows
}

async function getVillagerByName(name) {
  const { rows } = await pool.query("SELECT * FROM villagers WHERE name = ($1)", [name]) 
  return rows
}

module.exports = {
  getAllVillagers,
  getAllVillagersNames,
  getVillagerByName
};