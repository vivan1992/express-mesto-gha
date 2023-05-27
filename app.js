const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '646bc16b77dffb924b9cdc04',
  };

  next();
});

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/404'));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
