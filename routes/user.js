const express = require('express')
const router = express.Router()

const { param, query } = require('express-validator')

const userController = require('../controllers/user')

router.get('/users/:username/repos', 
[  
    param('username', 'The [username] must be valid.').trim().escape().isLength({min:3, max:40}).isString(),
    query('forked', 'The [forked] query value must be a boolean.').isBoolean().trim().escape().optional()
],
userController.getRepos)


router.get('/users/:username/repos/stats',
[  
    param('username', 'The [username] must be valid.').trim().escape().isLength({min:3, max:40}).isString(),
    query('forked', 'The [forked] query value must be a boolean.').isBoolean().trim().escape().optional()
],
userController.getRepoStats)


module.exports = router
