const passport = require('passport');
const passportJWT = require('passport-jwt');

const usuarioController = require('../recursos/usuarios/usuarios.controller');

const configJWT = {
  secretOrKey: 'secreto',
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

let jwtStrategy = new passportJWT.Strategy(configJWT, async (jwtPayload, next) => {
  const usuarioLogeado = await usuarioController.obtenerUsuario(null, jwtPayload.id);
  next(null, {
    id: usuarioLogeado.id,
    username: usuarioLogeado.username,
  });
});

module.exports = jwtStrategy;
