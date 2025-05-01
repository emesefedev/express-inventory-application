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
  ('anabelle', 'anteater', 'female', 'peppy', '1998-02-16'),
  ('anchovy', 'bird', 'male', 'lazy', '1998-03-04'),
  ('angus', 'bull', 'male', 'cranky', '1998-04-30'),
  ('anicotty', 'mouse', 'female', 'peppy', '1998-02-24'),
  ('ankha', 'cat', 'female', 'snooty', '1998-09-22'),
  ('annalisa', 'anteater', 'female', 'normal', '1998-02-06'),
  ('annalise', 'horse', 'female', 'snooty', '1998-12-02'),
  ('antonio', 'anteater', 'male', 'jock', '1998-10-20'),
  ('apollo', 'eagle', 'male', 'cranky', '1998-07-04'),
  ('apple', 'hamster', 'female', 'peppy', '1998-09-24'),
  ('astrid', 'kangaroo', 'female', 'snooty', '1998-09-08'),
  ('audie', 'wolf', 'female', 'peppy', '1998-08-31'),
  ('aurora', 'penguin', 'female', 'normal', '1998-01-27'),
  ('ava', 'chicken', 'female', 'normal', '1998-04-28'),
  ('avery', 'eagle', 'male', 'cranky', '1998-02-22'),
  ('axel', 'elephant', 'male', 'jock', '1998-03-23'),
  ('azalea', 'rhino', 'female', 'snooty', '1998-12-18'),
  ('baabara', 'sheep', 'female', 'snooty', '1998-03-28'),
  ('bam', 'deer', 'male', 'jock', '1998-11-07'),
  ('bangle', 'tiger', 'female', 'peppy', '1998-08-27'),
  ('barold', 'cub', 'male', 'lazy', '1998-03-02')
  ('bea', 'dog', 'female', 'normal', '1998-10-15'),
  ('beardo', 'gear', 'male', 'smug', '1998-09-27'),
  ('beau', 'deer', 'male', 'lazy', '1998-04-05'),
  ('becky', 'chicken', 'female', 'snooty', '1998-12-09'),
  ('bella', 'mouse', 'female', 'peppy', '1998-12-28'),
  ('benedict', 'chicken', 'male', 'lazy', '1998-10-10'),
  ('benjamin', 'dog', 'male', 'lazy', '1998-08-03'),
  ('bertha', 'hippo', 'female', 'normal', '1998-04-25'),
  ('bettina', 'mouse', 'female', 'normal', '1998-06-12'),
  ('bianca', 'tiger', 'female', 'peppy', '1998-12-13'),
  ('biff', 'hippo', 'male', 'jock', '1998-03-29'),
  ('big top', 'elephant', 'male', 'lazy', '1998-10-03'),
  ('bill', 'duck', 'male', 'jock', '1998-02-01'),
  ('billy', 'goat', 'male', 'jock', '1998-03-25'),
  ('biskit', 'dog', 'male', 'lazy', '1998-05-13'),
  ('bitty', 'hippo', 'female', 'snooty', '1998-10-06'),
  ('blaire', 'squirrel', 'female', 'snooty', '1998-07-03'),
  ('blanche', 'ostrich', 'female', 'snooty', '1998-12-21'),
  ('bluebear', 'cub', 'female', 'peppy', '1998-06-24'),
  ('bob', 'cat', 'male', 'lazy', '1998-01-01'),
  ('bonbon', 'rabbit', 'female', 'peppy', '1998-03-03'),
  ('bones', 'dog', 'male', 'lazy', '1998-08-04'),
  ('boomer', 'penguin', 'male', 'lazy', '1998-02-07'),
  ('boone', 'gorilla', 'male', 'jock', '1998-09-12'),
  ('boots', 'alligator', 'male', 'jock', '1998-08-07'),
  ('boris', 'pig', 'male', 'cranky', '1998-11-06'),
  ('boyd', 'gorilla', 'male', 'cranky', '1998-10-01'),
  ('bree', 'mouse', 'female', 'snooty', '1998-07-07'),
  ('broccolo', 'mouse', 'male', 'lazy', '1998-06-30'),
  ('broffina', 'chicken', 'female', 'snooty', '1998-10-24')
  ;
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