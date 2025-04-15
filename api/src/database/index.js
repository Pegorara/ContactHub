const { Client } = require('pg');
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const createClient = () => {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'contacthub',
  });
  return client;
};

exports.query = async (query, values) => {
  const client = createClient();
  try {
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error('Query error', err.stack);
    throw err;
  } finally {
    await client.end();
  }
};

exports.getClient = () => {
  const client = createClient();
  client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch((err) => console.error('Connection error', err.stack));
  return client;
};
