const router = require('express').Router();
const { vlaidatorUserId, vlaidatorUserBody, vlaidatorToken } = require('../middlewares/validate');

const {
  getUsers, getUserId, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', vlaidatorToken, getUsers);

router.get('/me', vlaidatorToken, getUserMe);

router.get('/:userId', vlaidatorUserId, getUserId);

router.patch('/me', vlaidatorUserBody, updateUser);

router.patch('/me/avatar', vlaidatorUserBody, updateAvatar);

module.exports = router;
