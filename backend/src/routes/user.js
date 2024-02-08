const router = require('express').Router();
const { register, login, allUser, loadUser } = require('../controller/user');
const { isAuthenticatedUser } = require("../middlewares/auth") 

router.post('/signup', register);
router.post('/login', login);
router.get('/', allUser );
router.get('/me', isAuthenticatedUser, loadUser );

module.exports = router