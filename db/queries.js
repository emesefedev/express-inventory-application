const pool = require("./pool")

async function getAllVillagers() {
  const { rows } = await pool.query("SELECT * FROM villagers")
  return rows
}

async function getAllVillagersNames() {
  const { rows } = await pool.query("SELECT name FROM villagers")
  return rows
}

module.exports = {
  getAllVillagers,
  getAllVillagersNames
};