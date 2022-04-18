const Joi = require('joi');

const idCertification = Joi.string();
const student = Joi.string().min(3);
const course = Joi.string().min(5);

const createCertificationDto = Joi.object({
  student: student.required(),
  course: course.required()
});

const updateCertificationDto = Joi.object({
  student: student,
  course: course
});

const getCertificationId = Joi.object({
  idCertification: idCertification.required(),
});

module.exports = { createCertificationDto, updateCertificationDto, getCertificationId };
