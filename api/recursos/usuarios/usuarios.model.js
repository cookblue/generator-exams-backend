const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Usuario debe tener un username']
  },
  password: {
    type: String,
    required: [true, 'Usuario debe tener una contraseña']
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model('usuario', usuarioSchema);