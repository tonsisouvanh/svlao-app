import Joi from "joi";

export const validateLoginInput = (data) => {
  const schema = Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
