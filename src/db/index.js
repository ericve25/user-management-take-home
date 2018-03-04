const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('../logger');
const config = require('../config');

const initModels = db => {
  const models = {};
  const modelsPath = path.join(__dirname, '../models');
  const modelImports = fs
    .readdirSync(modelsPath)
    .map(file => {
      const modelPath = path.join(modelsPath, file);
      return db.sequelize.import(modelPath);
    });

  modelImports.forEach(model => {
    models[model.name] = model;
  });

  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      logger.debug(`Loading associations for ${modelName}`);
      models[modelName].associate(models);
    }
  });

  return models;
};

const initDatabase = (db, options) => {
  db.sequelize
    .authenticate()
    .then(() =>
      db.sequelize
        .sync({ force: options.syncForce })
        .then(() => {
          logger.info('Initialization of database complete');
        })
        .catch(err => {
          logger.error('Database sync failed', err);
        })
    )
    .catch(err => {
      logger.error('Authentication failed', err);
    });
};

const db = {};
db.sequelize = new Sequelize(
  config.DB.database,
  config.DB.user,
  config.DB.password,
  config.DB
);
db.models = initModels(db);

db.init = (options = { syncForce: false }) => initDatabase(db, options);

module.exports = db;
