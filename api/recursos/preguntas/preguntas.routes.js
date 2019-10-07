const express = require('express');

const tokenValidate = require('../../libs/tokenValidate');
const validatePregunta = require('./preguntas.validate').validatePregunta;
const preguntasController = require('./preguntas.controller');

// const PreguntaNoExiste = require('./preguntas.error').PreguntasNoExiste;

const procesarError = require('../../libs/errorHandler').procesarError;

const preguntasRoutes = express.Router();
const logger = require('../../utils/logger');

// /preguntas
preguntasRoutes.get('/', procesarError((req, res) => {
  return preguntasController.obtenerPreguntas()
    .then((preguntas) => {
      logger.info('Se obtuvo todos los productos');
      res.json(preguntas);
    })
}));

// Crear una pregunta
preguntasRoutes.post('/', [tokenValidate, validatePregunta], (req, res) => {
  const preguntaNueva = { ...req.body, owner: req.user.username };

  return preguntasController.crearPregunta(preguntaNueva)
    .then((producto) => {
      res.status(201).json(producto);
    })
    .catch((error) => {
      logger.error('Algo ocurrio en la db.')
      res.status(500);
    })
});

// Se pone dos puntos /: ya que id se recibe como parametro
preguntasRoutes.get('/:id', procesarError((req, res) => {
  const id = req.params.id;
  return preguntasController.obtenerPregunta(id)
    .then(producto => {
      logger.info(`Se obtuvo el producto con id ${producto.id}`);
      if (!producto) throw new ProductoNoExiste(`El producto con id [${id}] no existe`);
      res.json(producto);
    })
}));


preguntasRoutes.put('/:id', validatePregunta, async (req, res) => {
  const id = req.params.id;
  try {
    const preguntaModificada = await preguntasController.modificarPregunta(id, req.body);
    res.json(preguntaModificada);
  } catch (err) {
    res.status(500).send(`Error en la db.`);
  }
});

preguntasRoutes.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const preguntaEliminada = await preguntasController.eliminarPregunta(id);
    res.json(preguntaEliminada);
  } catch (err) {
    res.status(500).send(`Ocurrio un error en la db.`);
  }
});

module.exports = preguntasRoutes;
