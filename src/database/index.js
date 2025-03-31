const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'contacthub',
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Connection error', err.stack));

exports.query = async (query) => {
  const { rows } = await client.query(query);
  return rows;
}
