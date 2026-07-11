const { readFile } = require("node:fs/promises")
const path = require("node:path")

const pool = require("./pool")

async function initializeDatabase() {
  const sql = await readFile(
    path.join(__dirname, "init.sql"),
    "utf8"
  )

  console.log("Initializing database...")

  await pool.query(sql)

  console.log("Database ready")
}

module.exports = initializeDatabase