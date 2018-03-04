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
const auth = require('../utils/auth');

router.post('/register', async (req, res) => {
  await register(req.body);
  res.sendStatus(201);
});

router.post('/login', async (req, res) => {
  const user = await login(req.body);
  if (user) {
    res.send(user);
  } else {
    res.sendStatus(401);
  }
});

router.get('/:id/contacts', auth, async (req, res) => {
  res.send(await getContactsForUser(req.params.id));
});

router.post('/:id/contacts', auth, async (req, res) => {
  const contact = await createContact(req.params.id, req.body);
  res.status(201);
  res.send(contact);
});

router.get('/:id/contacts/:contact_id', auth, async (req, res) => {
  res.send(await getSingleContact(req.params.contact_id));
});

router.put('/:id/contacts/:contact_id', auth, async (req, res) => {
  await updateContact(req.params.contact_id, req.body);
  res.sendStatus(204);
});

router.delete('/:id/contacts/:contact_id', auth, async (req, res) => {
  await deleteContact(req.params.contact_id);
  res.sendStatus(204);
});

module.exports = router;
