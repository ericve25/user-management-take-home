// Pulls app config from process env vars and sets default values if not present
module.exports = {
  SERVICE_HOST: process.env.SERVICE_HOST || 'localhost',
  SERVICE_PORT: process.env.SERVICE_PORT || 5001,
  DB: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'contacts_app',
    dialect: 'postgres',
    logging: false
  },
  NODE_ENV: (process.env.NODE_ENV || 'production').toLowerCase(),
  LOG_LEVEL: (process.env.LOG_LEVEL || 'info').toLowerCase(),
  NOTICE_LEVEL: {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
  },
  JWT_SECRET: process.env.JWT_SECRET || ''
};
