const { Client } = require('pg');
require('dotenv').config({ path: '.env.test' });

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

beforeAll(async () => {
  await client.connect();

  await client.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(255),
      category_id UUID,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
      CONSTRAINT check_email_or_phone CHECK (email IS NOT NULL OR phone IS NOT NULL)
    );
  `);
});

beforeEach(async () => {
  await client.query('TRUNCATE TABLE contacts, categories RESTART IDENTITY CASCADE');
});

afterAll(async () => {
  await client.end();
});
