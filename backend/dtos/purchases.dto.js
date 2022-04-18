const Joi = require('joi');

const idPurchases = Joi.string();
const type = Joi.number().integer().min(0).max(2);
const student = Joi.string().min(3);
const course = Joi.string().min(5);
const titleCourse = Joi.string();
const imageCourse = Joi.string();
const school = Joi.string().min(3);

const createPurchasesDto = Joi.object({
  type: type.required(),
  student: student.required(),
  course: course.required(),
  titleCourse: titleCourse.required(),
  imageCourse: imageCourse.required(),
  school: school.required()
});

const updatePurchasesDto = Joi.object({
  student: student,
  course: course,
  school: school
});

const getPurchasesId = Joi.object({
  idPurchases: idPurchases.required(),
});

module.exports = { createPurchasesDto, updatePurchasesDto, getPurchasesId };
