const router = require('express').Router();
const bodyParser = require('body-parser');
const root = require('./root');
const users = require('./users');

router.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
router.use(root);
router.use('/users', users);

module.exports = router;
