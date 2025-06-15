const { Pool } = require("pg")

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_ROLE_NAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PSW,
  port: 5432
}

module.exports = new Pool(config)