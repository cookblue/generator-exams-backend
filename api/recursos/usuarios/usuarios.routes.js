const express = require('express');
const uuidv4 = require('uuid/v4');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const usuarioController = require('./usuarios.controller');

const validateUsuario = require('./usuarios.validate');
const usuariosRoutes = express.Router();

const tokenValidate = require('../../libs/tokenValidate');


usuariosRoutes.get('/', async (req, res) => {
  const usuarios = await usuarioController.obtenerUsuarios();
  res.json(usuarios);
});

// Endpoint para crear usuario
usuariosRoutes.post('/', validateUsuario, async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      res.status(500).send(`A ocurrido un error en el servidor con bcrypt`);
      return
    }
    // Todo hacer catch
    const newUser = { ...req.body, password: hashedPassword, id: uuidv4() };
    const usuario = await usuarioController.crearUsuario(newUser);

    const token = jwt.sign({id: usuario['_id']}, 'secreto', { expiresIn: 86400 });

    res.status(201).json({ usuario: { username: usuario.username }, token });
  });

});


usuariosRoutes.put('/', tokenValidate, async (req, res) => {
  const usuario = await usuarioController.actualizarUsuario(req.user.username, req.body.username);
  res.json(usuario);
});


usuariosRoutes.post('/login', validateUsuario, async (req, res) => {
  const usuario = await usuarioController.obtenerUsuario(req.body.username)

  if (!usuario) {
    res.status(404).send(`El usuario no existe. Verifica tu informacion.`);
    return;
  }

  bcrypt.compare(req.body.password, usuario.password, (err, coincide) => {
    if (err) {
      console.log(err);
      res.status(500).send(`Algo ocurrio ups!`);
      return;
    }

    if (coincide) {
      const token = jwt.sign({id: usuario['_id']}, 'secreto', { expiresIn: 86400 });
      res.status(200).send({token, usuario: usuario.username });
    } else {
      res.status(401).send(`Verifica tu password.`);
    }
  });
})

usuariosRoutes.post('/whoami', tokenValidate, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = usuariosRoutes;
