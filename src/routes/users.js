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
  await register(req.body);
  res.status(201);
  res.send();
});

router.post('/login', async (req, res) => {
  const token = await login(req.body);
  if (token) {
    res.send(token);
  }
  else {
    res.status(401);
    res.send();
  }
});

router.get('/:id/contacts', async (req, res) => {
  res.send(await getContactsForUser(req.params.id));
});

router.post('/:id/contacts', async (req, res) => {
  const contact = await createContact(req.params.id, req.body);
  res.status(201);
  res.send(contact);
});

router.get('/:id/contacts/:contact_id', async (req, res) => {
  res.send(await getSingleContact(req.params.contact_id));
});

router.put('/:id/contacts/:contact_id', async (req, res) => {
  await updateContact(req.params.contact_id, req.body);
  res.status(204);
  res.send();
});

router.delete('/:id/contacts/:contact_id', async (req, res) => {
  await deleteContact(req.params.contact_id);
  res.status(204);
  res.send();
});

module.exports = router;
