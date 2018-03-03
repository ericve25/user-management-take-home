const db = require('../src/db');

const main = async() => {
  await db.init(true, {
    syncForce: true
  });
  await db.sequelize.close();
};

main();
