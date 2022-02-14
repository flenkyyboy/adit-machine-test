import Joi from 'joi';

export const validateCreateAndEditEmployee = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    place: Joi.string().required().label('Place'),
    phone: Joi.string().required().label('Phone'),
    email: Joi.string().required().label('email'),
    dob: Joi.string().required().label('Date of birth'),
    gender: Joi.string().valid('male', 'female').required().label('gender'),
    role: Joi.string().valid('MANAGER', 'ADMIN', 'DEVELOPER').required().label('Role'),
    companyId: Joi.string().required().label('Company Id'),
  });
  return schema.validate(data);
};
