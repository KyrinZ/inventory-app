const Joi = require("joi");

const authValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const productValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
    productName: Joi.string().required(),
    quantity: Joi.number().required(),
  });

  return schema.validate(data);
};
module.exports.authValidation = authValidation;
module.exports.productValidation = productValidation;
