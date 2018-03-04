const db = require('./index');

const createUser = async data => {
  const user = await db.models.user.create(data);
  return user;
};

const getUserByEmail = async(email) => {
  const user = await db.models.user.findOne({
    where: {
      email
    }
  });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail
};
