const Joi = require('joi');

const idCourse = Joi.string();
const title = Joi.string().min(5).max(50);
const image = Joi.string().min(5);
const description = Joi.string().min(5);
const price = Joi.number().min(0);
const ventas = Joi.number().min(0);
const school = Joi.string().min(3);

const createCourseDto = Joi.object({
  title: title.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  ventas: ventas,
  school: school.required()
});

const updateCourseDto = Joi.object({
  title: title,
  image: image,
  description: description,
  price: price,
  ventas: ventas,
  school: school
});

const getCourseId = Joi.object({
  idCourse: idCourse.required(),
});

module.exports = { createCourseDto, updateCourseDto, getCourseId };
