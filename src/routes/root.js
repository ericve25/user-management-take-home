const router = require('express').Router();
const { wrap } = require('../utils/error');
const {
  getRoutes,
  getHealth
} = require('../handlers/root');

router.get('/', wrap((req, res) => {
  res.send(getRoutes());
}));

router.get('/health', wrap((req, res) => {
  res.send(getHealth());
}));

module.exports = router;
