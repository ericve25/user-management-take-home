const config = require('../config');

const formatMessage = (message, level, err) => {
  let errorPostpend = '';
  if (err) {
    errorPostpend = `(${err.message ? err.message : err})`;
  }
  return `${new Date().toISOString()} [${level.toUpperCase()}] ${message}${errorPostpend}`;
};

const error = (message, err) => {
  console.error(formatMessage(message, config.NOTICE_LEVEL.ERROR, err));
};

const warn = (message, err) => {
  if (config.LOG_LEVEL === config.NOTICE_LEVEL.WARN ||
      config.LOG_LEVEL === config.NOTICE_LEVEL.INFO ||
      config.LOG_LEVEL === config.NOTICE_LEVEL.DEBUG) {
    console.warn(formatMessage(message, config.NOTICE_LEVEL.WARN, err));
  }
};

const info = (message, err) => {
  if (config.LOG_LEVEL === config.NOTICE_LEVEL.INFO ||
      config.LOG_LEVEL === config.NOTICE_LEVEL.DEBUG) {
    console.log(formatMessage(message, config.NOTICE_LEVEL.INFO, err));
  }
};

const debug = (message, err) => {
  if (config.LOG_LEVEL === config.NOTICE_LEVEL.DEBUG) {
    console.log(formatMessage(message, config.NOTICE_LEVEL.DEBUG, err));
  }
};

module.exports = {
  error,
  warn,
  info,
  debug
};
