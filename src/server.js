const express = require('express');
const jwt = require('express-jwt');
const config = require('./config');
const logger = require('./logger');
const db = require('./db');
// Initialize db connection and models
db.init();

// Build express with router
const router = require('./routes');
const app = express();
app.use(jwt({ secret: config.JWT_SECRET })
  .unless({ path: [
    '/',
    '/health',
    '/users/register', 
    '/users/login'
  ] }));
app.use(router);

// Start API
app.listen(config.SERVICE_PORT, config.SERVICE_HOST, error => {
  if (error) {
    logger.error('API shutdown due to an error', error);
    process.exit(1);
  }

  logger.info(`API is available at http://${config.SERVICE_HOST}:${config.SERVICE_PORT}`);
});
