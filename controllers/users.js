const User = require('../models/user');
const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_NOTFOUND = 404;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => {res.status(500).send({
      message: 'Произошла ошибка',
      err: err.message,
      stack: err.stack,
    }
    )});
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error("NotFound");
    })
    .then(user => res.send(user))
    .catch(err => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь по указанному _id не найден.'})
      }

      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: "Переданы некорректные данные"})
      }

      console.log(err.name);
      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.message,
        stack: err.stack,
      })
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: "Переданы некорректные данные при создании пользователя"})
      }
      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.message,
        stack: err.stack,
      })
    });
};

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {new: true, runValidators: true})
    .orFail(() => {
      throw new Error("NotFound");
    })
    .then(user => res.send(user))
    .catch(err => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь по указанному _id не найден.'})
      }

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: "Переданы некорректные данные при обновлении профиля"})
      }

      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.message,
        stack: err.stack,
      })
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {new: true, runValidators: true})
    .orFail(() => {
      throw new Error("NotFound");
    })
    .then(user => res.send(user))
    .catch(err => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь по указанному _id не найден.'})
      }

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: "Переданы некорректные данные при обновлении аватара"})
      }
      res.status(500).send({
        message: 'Произошла ошибка',
        err: err.message,
        stack: err.stack,
      })
    });
};