const Joi = require('joi');

const idProgress = Joi.string();
const student = Joi.string().min(3);
const course = Joi.string().min(5);
const level = Joi.string().min(1);

const createProgressDto = Joi.object({
  student: student.required(),
  course: course.required(),
  level: level.required()
});

const updateProgressDto = Joi.object({
  level: level
});

const getProgressId = Joi.object({
  idProgress: idProgress.required(),
});

module.exports = { createProgressDto, updateProgressDto, getProgressId };
