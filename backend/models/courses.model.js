const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Modelo de la bd
const courseSchema = new Schema({
  idCourse: String,
  title: String,
  image: String,
  description: String,
  price: Number,
  ventas: Number,
  school: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model('coursesCollection', courseSchema);
module.exports = model;
