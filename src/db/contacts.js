const db = require('./index');

const getContactsByUserId = async userId =>
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

const getContactById = async contact_id => 
  db.models.contact.findOne({ where: { id: contact_id } });

const updateContactById = async (contact_id, data) => {
  const result = await db.models.contact.findOne({ where: { id: contact_id } });
  if (!result) {
    throw new Error('Contact not found');
  }

  return result.update(data);
};
  
const deleteContactById = async contact_id => 
  db.models.contact.destroy({ where: { id: contact_id } });

module.exports = {
  getContactsByUserId,
  createContactForUser,
  getContactById,
  updateContactById,
  deleteContactById
};
