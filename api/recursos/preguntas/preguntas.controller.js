const Pregunta = require('./preguntas.model');

function crearPregunta(pregunta) {
  return new Pregunta(pregunta).save();
}

function obtenerPreguntas() {
  return Pregunta.find({});
}

function obtenerPregunta(id) {
  return Pregunta.findById(id);
}

function buscarPregunta(text) {
  return Pregunta.find({ 'subcategory': text })
}

function modificarPregunta(id, pregunta) {
  return Pregunta.findOneAndUpdate({ _id: id}, {
    ...pregunta
  }, { new: true });
}

function eliminarPregunta(id) {
  return Pregunta.findOneAndDelete(id);
}

module.exports = {
  crearPregunta,
  obtenerPreguntas,
  obtenerPregunta,
  modificarPregunta,
  eliminarPregunta,
  buscarPregunta,
}
