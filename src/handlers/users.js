const {
  createUser,
  getUserByEmailPassword
} = require('../db/users');

const {
  getContactsByUserId,
  createContactForUser,
  getContactById,
  updateContactById,
  deleteContactById
} = require('../db/contacts');
const jwt = require('jsonwebtoken');
const config = require('../config');

const register = async (body) => {
  const user = await createUser(body);
  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET);
  return token;
};

const login = async (body) => {
  const user = await getUserByEmailPassword(body.email, body.password);
  let result;
  if (user) {
    result = {
      userId: user.id,
      token: jwt.sign({ userId: user.id }, config.JWT_SECRET)
    };
  }
  return result;
};

const getContactsForUser = async (id) => {
  const contacts = await getContactsByUserId(id);
  return contacts;
};

const getSingleContact =  async (contactId) => {
  const contact = await getContactById(contactId);
  return contact;
};

const createContact = async (id, body) => {
  const data = {
    ...body,
    userId: id
  };
  const contact = await createContactForUser(data);
  return contact;
};

const updateContact = async (contactId, data) => {
  await updateContactById(contactId, data);
};

const deleteContact = async (contactId) => {
  await deleteContactById(contactId);
};

module.exports = {
  register,
  login,
  getContactsForUser,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
