const router = require('express').Router();
const { register, login, allUser, loadUser } = require('../controller/user');

router.post('/signup', register);
router.post('/login', login);
router.get('/', allUser );
router.get('/me/:token', loadUser );

module.exports = router