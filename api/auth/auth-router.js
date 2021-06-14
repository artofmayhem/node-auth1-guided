const router = require('express').Router()

router.post('/register', async (req, res, next) => {
  console.log('endpoint register wired!')
})
router.post('/login', async (req, res, next) => {
  console.log('endpoint login wired!')
})
router.get('/logout', async (req, res, next) => {
  console.log('endpoint logout wired!')
})

module.exports = router
