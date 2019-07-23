const router = require('express').Router();
const {
  getRoutes,
  getHealth
} = require('../handlers/root');

router.get('/', (req, res) => {
  res.send(getRoutes());
});

router.get('/health', (req, res) => {
  res.send(getHealth());
});

module.exports = router;
