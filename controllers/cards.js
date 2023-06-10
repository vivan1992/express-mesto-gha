const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const NoRulesError = require('../errors/NoRulesError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании карточки.');
      }
      throw err;
    })
    .catch(next);
};

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    })
    .then((card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new NoRulesError('Нет прав на удаление данной карточки');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((c) => res.send({ c }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw new ValidationError('Переданы некорректные данные');
      }
      throw err;
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('Передан несуществующий _id карточки');
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      throw new ValidationError('Переданы некорректные данные');
    }
    throw err;
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('Передан несуществующий _id карточки');
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      throw new ValidationError('Переданы некорректные данные');
    }
    throw err;
  })
  .catch(next);
