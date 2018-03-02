const router = require('express').Router();
const bodyParser = require('body-parser');
const root = require('./root');

router.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
router.use(root);

module.exports = router;
