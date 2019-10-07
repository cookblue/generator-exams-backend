const fs = require('fs');

const uuidv4 = require('uuid/v4');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

const logger = require('./api/utils/logger');
const preguntasRouter = require('./api/recursos/preguntas/preguntas.routes');
const usuariosRouter = require('./api/recursos/usuarios/usuarios.routes');

const markdownpdf = require("markdown-pdf")


const preguntasController = require('./api/recursos/preguntas/preguntas.controller');

const authJWT = require('./api/libs/auth');
const errorHandler = require('./api/libs/errorHandler');
const app = express();

app.use('/docs', express.static('docs'))


mongoose.connect('mongodb://127.0.0.1:27017/generator-exams', { useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  logger.error(error);
  logger.error('Fallo la conexion a mongodb');
  process.exit(1);
});


app.use(bodyParser.json());

app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim()),
  }
}));
app.use(passport.initialize());

app.use('/usuarios', usuariosRouter);
app.use('/preguntas', preguntasRouter);


app.use(errorHandler.procesarErroresDeDB);
app.use(errorHandler.catchResolver);

passport.use(authJWT);


app.get('/get-examn', async (req, res) => {
  const title = req.query.title;
  const preguntas = await preguntasController.buscarPregunta(req.query.subcategory)
  if (preguntas.length) {
    const templatePregunta = `
---
# ${title}
***
${
      preguntas.map((pregunta) =>
        `
### ${pregunta.description}
\n
${
        pregunta.options.map((option, i) => `\n > ${String.fromCharCode(97 + i)}) ${option} \n`).join('')
        }
---
`
      ).join('')
}
`
    const name = uuidv4()
    markdownpdf()
      .from
      .string(templatePregunta)
      .to(`./docs/${name}.pdf`)

    return res.json({ status: true, file: `/docs/${name}.pdf` });
  }
  res.status(404).send('No se encontro ninguna pregunta relacionada con la busqueda')
});

app.listen(8080, () => {
  console.log('Init server');
});
