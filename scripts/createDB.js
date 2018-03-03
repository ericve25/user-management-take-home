const pg = require('pg');
const config = require('../src/config');
const logger = require('../src/logger');

// Create a pool
const pool = new pg.Pool({
  user: config.DB.user,
  password: config.DB.password,
  host: config.DB.host,
  database: 'postgres'
});

pool.query(`CREATE DATABASE ${config.DB.database}`, err => {
  if (err) {
    logger.error('Failed to create database', err);
  }
  pool.end();
});
