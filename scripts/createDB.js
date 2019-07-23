const { Client } = require('pg');
const config = require('../src/config');
const logger = require('../src/logger');
const client = new Client({
  user: config.DB.user,
  password: config.DB.password,
  host: config.DB.host,
  database: 'postgres'
});
client.connect()
  .then(() => logger.info('DB connected'))
  .catch(e => logger.error('DB connection error', e.stack));

client.query(`CREATE DATABASE ${config.DB.database}`, err => {
  if (err) {
    logger.error('Failed to create database', err);
  }
  client.end();
});
