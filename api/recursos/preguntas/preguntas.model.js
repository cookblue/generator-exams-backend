const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Pregunta debe tener una descripcion']
  },
  category: {
    type: String,
    required: [true, 'Pregunta debe tener una categoria']
  },
  subcategory: {
    type: String,
    required: [true, 'Pregunta debe tener una subcategoria']
  },
  level: {
    type: String,
    maxlength: 20,
    minlength: 5,
    required: [true, 'Pregunta debe tener un nivel']
  },
  options: {
    type: Array,
    required: [true, 'Pregunta debe tener alternativas']
  },
  answer: {
    type: String
  },
  imageUrl: {
    type: String,
  },
  owner: {
    type: String,
    required: [true, 'Pregunta debe tener un usuario']
  },
});

module.exports = mongoose.model('pregunta', preguntaSchema);
