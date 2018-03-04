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
  let token;
  if (user) {
    token = jwt.sign({ userId: user.id }, config.JWT_SECRET);
  }
  return token;
};

const getContactsForUser = async (id) => {
  const contacts = await getContactsByUserId(id);
  return contacts;
};

const getSingleContact =  async (contact_id) => {
  const contact = await getContactById(contact_id);
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

const updateContact = async (contact_id, data) => {
  await updateContactById(contact_id, data);
};

const deleteContact = async (contact_id) => {
  await deleteContactById(contact_id);
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
