const auth = (req, res, next) => {
  if (!req.user.userId || req.user.userId !== req.params.id) {
    res.sendStatus(401);
  } else {
    return next();
  }
};

module.exports = auth;
