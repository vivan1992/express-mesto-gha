const Card = require('../models/card');
const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_NOTFOUND = 404;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then(card => res.send(card))
    .catch(err => {

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: "Переданы некорректные данные при создании карточки."})
      }

      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.message,
        stack: err.stack,
      })
    });
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error("NotFound");
    })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Карточка с указанным _id не найдена.'})
      }

      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.message,
        stack: err.stack,
      })
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true }
)
  .orFail(() => {
    throw new Error("NotFound");
  })
  .then(card => res.send(card))
  .catch(err => {
    if (err.message === 'NotFound') {
      return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Передан несуществующий _id карточки'})
    }

    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE_VALIDATION).send({ message: "Переданы некорректные данные для постановки лайка"})
    }

    res.status(500).send({
      message: 'Произошла ошибка',
      err: err.message,
      stack: err.stack,
    })
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
)
  .orFail(() => {
    throw new Error("NotFound");
  })
  .then(card => res.send(card))
  .catch(err => {
    if (err.message === 'NotFound') {
      return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Передан несуществующий _id карточки'})
    }

    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE_VALIDATION).send({ message: "Переданы некорректные данные для снятия лайка"})
    }

    res.status(500).send({
      message: 'Произошла ошибка',
      err: err.message,
      stack: err.stack,
    })
  });