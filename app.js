require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { vlaidatorCreateUser, vlaidatorToken } = require('./middlewares/validate');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', vlaidatorToken, login);
app.post('/signup', vlaidatorCreateUser, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/404'));

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
      err,
    });

  next();
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
