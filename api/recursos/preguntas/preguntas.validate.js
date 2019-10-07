const Joi = require('@hapi/joi');

const blueprintPregunta = Joi.object().keys({
  description: Joi.string().min(3).max(2000).required(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  level: Joi.string().required(),
  options: Joi.array().required(),
  answer: Joi.string(),
  imageUrl: Joi.string()
});

const blueprintGenerator = Joi.object().keys({
  title: Joi.string().required(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  level: Joi.string().required(),
  quantity: Joi.number().required(),
});

function validatePregunta(req, res, next) {
  const joiResult = Joi.validate(req.body, blueprintPregunta);
  if (joiResult.error) {
    res.status(400).send(`Has tenido un error en: ${joiResult.error}`);
    return;
  }
  next();
}

function validateGenerator(req, res, next) {
  const joiResult = Joi.validate(req.query, blueprintGenerator);
  if (joiResult.error) {
    res.status(400).send(`Has tenido un error en: ${joiResult.error}`);
    return;
  }
  next();
}


module.exports = {
	validatePregunta,
  validateGenerator,
}

