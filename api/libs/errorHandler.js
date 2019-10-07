const mongoose = require('mongoose');
const logger = require('../utils/logger');

// TODO: Investigar que es un closure, y un HOC

function procesarError(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  }
}
// new CustomProductError
function procesarErroresDeDB(err, req, res, next) {
  if (err instanceof mongoose.Error ||
      err.name === 'MongoError') {
    logger.error('Ocurrio un error en la DB', err);
    err.message = 'Error en la BD';
    err.status = 500;
  }
  next(err);
}

function catchResolver(err, req, res, next) {
  console.log(err);
  res.status(err.status).send(err.message);
}

module.exports = {
  procesarError,
  procesarErroresDeDB,
  catchResolver,
}
