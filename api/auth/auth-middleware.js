function restrict(req, res, next) {
  if (req.session.user) {
    next()
  }
}

module.exports = {
  restrict,
}
