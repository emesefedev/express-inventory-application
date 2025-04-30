#! /usr/bin/env node

const { Client } = require("pg")
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS villagers (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR ( 50 ), 
   species VARCHAR ( 20 ), 
   gender VARCHAR ( 20 ), 
   personality VARCHAR ( 20 ), 
   birthday DATE
);

INSERT INTO villagers (name, species, gender, personality, birthday) 
VALUES
  ('Ace', 'Bird', 'Male', 'Jock', '1998-08-11'),
  ('Admiral', 'Bird', 'Male', 'Cranky', '1998-01-27'),
  ('Agent S', 'Squirrel', 'Male', 'Peppy', '1998-07-02'),
  ('Agnes', 'Pig', 'Female', 'Sisterly', '1998-04-21'),
  ('Al', 'Gorilla', 'Male', 'Lazy', '1998-10-18');
`;

async function main() {
  console.log("seeding...")
  
  const client = new Client({
    host: process.env.HOST,
    user: process.env.ROLE_NAME,
    database: process.env.DATABASE,
    password: process.env.DB_PSW,
    port: 5432
  })

  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()