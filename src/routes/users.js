const router = require('express').Router();
const {
  register,
  login,
  getContactsForUser,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
} = require('../handlers/users');

router.post('/register', async (req, res) => {
  await register(req.data);
  res.status(201);
  res.send();
});

router.post('/login', async (req, res) => {
  const token = await login(req.data);
  if (token) {
    res.send(token);
  }
  else {
    res.status(401);
    res.send();
  }
});

router.get(':id/contacts', async (req, res) => {
  res.send(await getContactsForUser(req.params.id));
});

router.post(':id/contacts', async (req, res) => {
  const contact = await createContact(req.params.id, req.body);
  res.status(201);
  res.send(contact);
});

router.get(':id/contacts/:contactId', async (req, res) => {
  res.send(await getSingleContact(req.params.id, req.params.contactId));
});

router.put(':id/contacts/:contactId', async (req, res) => {
  await updateContact(req.params.id, req.params.contactId);
  res.status(204);
  res.send();
});

router.delete(':id/contacts/:contactId', async (req, res) => {
  await deleteContact(req.params.id, req.params.contactId);
  res.status(204);
  res.send();
});

module.exports = router;
