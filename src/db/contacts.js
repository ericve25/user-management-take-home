const db = require('./index');

const getContactsForUser = async userId =>
  db.models.user.findOne({
    where: {
      id: userId
    },
    include: [
      {
        model: db.models.contact
      }
    ]
  });

const createContactForUser = async data =>
  db.models.contact.create(data);

const getContactById = async contactId => 
  db.models.contact.findOne({ where: { id: contactId } });

const updateContactById = async (contactId, data) => {
  const result = await db.models.contact.findOne({ where: { id: contactId } });
  if (!result) {
    throw new NotFoundError('contact', 'id', contactId);
  }

  return result.update(data);
};
  
const deleteContactById = async contactId => 
  db.models.contact.destroy({ where: { id: contactId } });

module.exports = {
  getContactsForUser,
  createContactForUser,
  getContactById,
  updateContactById,
  deleteContactById
};
