const { Pool } = require("pg")
require('dotenv').config()

module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.ROLE_NAME,
  database: process.env.DATABASE,
  password: process.env.DB_PSW,
  port: 5432
})