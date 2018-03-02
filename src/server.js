const express = require('express');
const router = require('./routes');
const config = require('./config');
const logger = require('./logger');

const app = express();
app.use(router);

app.listen(config.SERVICE_PORT, config.SERVICE_HOST, error => {
  if (error) {
    logger.error('Service shutdown due to an error', error);
    process.exit(1);
  }

  logger.info(`API is available at http://${config.SERVICE_HOST}:${config.SERVICE_PORT}`);
});
