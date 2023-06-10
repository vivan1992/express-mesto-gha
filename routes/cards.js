const router = require('express').Router();

const { vlaidatorCard, vlaidatorToken, vlaidatorCardId } = require('../middlewares/validate');

const {
  createCard, getCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', vlaidatorToken, getCard);

router.post('/', vlaidatorCard, createCard);

router.delete('/:cardId', vlaidatorCardId, deleteCard);

router.put('/:cardId/likes', vlaidatorCardId, likeCard);

router.delete('/:cardId/likes', vlaidatorCardId, dislikeCard);

module.exports = router;
