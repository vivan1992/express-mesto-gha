const ERROR_CODE_NOTFOUND = 404;

module.exports.pageNotFound = (req, res) => {
  res.status(ERROR_CODE_NOTFOUND).send({ message: 'Страница не найдена' });
};
