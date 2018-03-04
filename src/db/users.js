const db = require('./index');

const createUser = async data => {
  const user = await db.models.user.create(data);
  return user;
}

const getUserByEmailPassword = async(email, password) => {
  const user = await db.models.user.findOne({
    where: {
      email,
      password
    }
  });
  return user;
};

module.exports = {
  createUser,
  getUserByEmailPassword
};
