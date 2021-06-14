function restrict(req, res, next) {
  console.log('restrict middleware wired!')
  next()
}

module.exports = {
  restrict,
}
