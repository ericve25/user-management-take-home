const {
  createUser,
  getUserByEmail
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
const bcrypt = require('bcrypt');

const register = async (body) => {
  const securePassword = await bcrypt.hash(body.password, 10);
  body.password = securePassword;
  const user = await createUser(body);
  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET);
  return token;
};

const login = async (body) => {
  const user = await getUserByEmail(body.email);
  const valid = await bcrypt.compare(body.password, user.password);
  let result;
  if (valid) {
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
