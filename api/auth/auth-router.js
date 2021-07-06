const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(
      password, // plain text
      8, // number of rounds of hashing 2 ^ 8
    )
    const newUser = { username, password: hash }
    const createdUser = await User.add(newUser)

    res.json(createdUser)
  } catch (err) {
    next(err)
  }
})
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const [user] = await User.findBy({ username })
    // does username correspont to an actual user?
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user
      // a cookie is set on client
      // a session is stored for that user
      res.json(`welcome back, ${user.username}!`)
    } else {
      next({ status: 401, message: 'invalid credentials' })
    }
  } catch (err) {
    next(err)
  }
})
router.get('/logout', async (req, res, next) => { //eslint-disable-line
  if (req.session.user) {
    req.session.destroy(err => {
      if (err) res.json({ message: 'you cannot leave' })
      else res.json({ message: 'goodbye' })
    })
  } else {
    res.json({ message: 'excuse me, do I know you?' })
  }
})
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router
