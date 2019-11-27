const Joi = require('@hapi/joi');

const userSchema = (body) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
  }); 
  return schema.validate(body);
}

module.exports = userSchema;