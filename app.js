const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '646bc16b77dffb924b9cdc04' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});

//id  646bc16b77dffb924b9cdc04