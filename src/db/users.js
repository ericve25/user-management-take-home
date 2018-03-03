const db = require('./index');

const createUser = async data =>
  db.models.user.create(data);

const getUserByEmailPassword = async (email, password) => {
  const user = await db.models.user.findOne({
    where: {
      email: email,
      password: password
    }
  });
  return user;
}

module.exports = {
  createUser,
  getUserByEmailPassword
};
