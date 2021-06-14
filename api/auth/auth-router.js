const router = require('express').Router()

router.post('/register', async (req, res, next) => {
  res.json('endpoint register wired!')
})
router.post('/login', async (req, res, next) => {
  res.json('endpoint login wired!')
})
router.get('/logout', async (req, res, next) => {
  res.json('endpoint logout wired!')
})

module.exports = router
