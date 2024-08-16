const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../middleware/auth')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/getUser',auth,userController.getUser)

module.exports = router;
