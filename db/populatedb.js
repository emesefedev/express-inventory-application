#! /usr/bin/env node
const { readFile } = require('fs/promises')
const { Client } = require("pg")
require('dotenv').config()



async function main() {
  const SQL = await readFile('./db/init.sql', {
    encoding: 'utf-8'
  })
  console.log("seeding...")
  
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_ROLE_NAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PSW,
    port: 5432
  }
  const client = new Client(config)

  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
  .then(() => console.log('✅'))
  .catch((e) => console.error('☠ Algo no ha salido bien', e))