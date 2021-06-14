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
      
    } else {
      next({ status: 401, message: 'invalid credentials' })
    }
  } catch (err) {
    next(err)
  }
})
router.get('/logout', async (req, res, next) => {
  res.json('endpoint logout wired!')
})

module.exports = router
