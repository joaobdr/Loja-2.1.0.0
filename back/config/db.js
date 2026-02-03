// config/db.js
const { MongoClient } = require("mongodb");
require('dotenv').config

const uri = process.env.mongoURL;
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  await client.connect();
  db = client.db("loja");
  console.log("✅ MongoDB conectado");
}

function getDB() {
  return db;
}

module.exports = { connectToDatabase, getDB };
