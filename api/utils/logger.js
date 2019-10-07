const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      level: 'info',
      json: false,
      handleException: true,
      maxsize: 512000, // 5MB
      maxFiles: 5,
      filename: `${__dirname}/../../logs-de-aplicacion.log`,
      prettyPrint: object => { return JSON.stringify(object) }
    }),
    new winston.transports.Console({
      level: 'debug',
      handleException: true,
      json: false,
      colorize: true,
      prettyPrint: object => { return JSON.stringify(object) }
    }),
  ]
});

module.exports = logger;