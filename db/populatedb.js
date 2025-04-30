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
  ('ace', 'bird', 'male', 'jock', '1998-08-11'),
  ('admiral', 'bird', 'male', 'cranky', '1998-01-27'),
  ('agent s', 'squirrel', 'male', 'peppy', '1998-07-02'),
  ('agnes', 'pig', 'female', 'sisterly', '1998-04-21'),
  ('al', 'gorilla', 'male', 'lazy', '1998-10-18'),
  ('alfonso', 'alligator', 'male', 'lazy', '1998-06-09'),
  ('alice', 'koala', 'female', 'normal', '1998-08-19'),
  ('ali', 'alligator', 'female', 'snooty', '1998-11-08'),
  ('amelia', 'eagle', 'female', 'snooty', '1998-11-19'),
  ('anabelle', 'anteater', 'female', 'peppy', '1998-02-16');
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