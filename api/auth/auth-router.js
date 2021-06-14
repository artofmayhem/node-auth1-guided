const router = require('express').Router()

router.verb('/register', async (req, res, next) => {
  console.log('endpoint register wired!')
})
router.verb('/login', async (req, res, next) => {
  console.log('endpoint wired!')
})
router.verb('/logout', async (req, res, next) => {
  console.log('endpoint wired!')
})

module.exports = router
