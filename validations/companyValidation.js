import Joi from 'joi';

export const validateCreateAndEditCompany = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    place: Joi.string().required().label('Place'),
    phone: Joi.string().required().label('Phone'),
    email: Joi.string().required().label('email'),
  });
  return schema.validate(data);
};
