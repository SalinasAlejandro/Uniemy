const express = require('express');
const ReviewsService = require('../services/reviews.service');
const service = new ReviewsService();
const validatorHandler = require('../middlewares/validator.handler');
const { createReviewDto, updateReviewDto, getReviewId } = require('../dtos/reviews.dto');

const router = express.Router();

//GET ALL REVIEWS
router.get('/', async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const reviews = await service.findDB(size || 1000, filter);
    res.json({
      'success': true,
      'message': 'Estos son las reseñas guardados actualmente',
      'data': reviews
    });
  } catch (error) {
    next(error);
  }

});

////////////////////////////////CREATE A NEW REVIEW
router.post('/', validatorHandler(createReviewDto, 'body'), async (req, res) => {
  const body = req.body;
  const review = await service.createDB(body);
  res.json({
    'success': true,
    'message': 'Se ha creado con éxito',
    'data': review
  });
});

////////////////////////////////GET REVIEW BY ID
router.get('/:idReview', validatorHandler(getReviewId, 'params'), async (req, res, next) => {
  try {
    const { idReview } = req.params;
    const review = await service.findOneDB(idReview);
    res.json({
      'success': true,
      'message': 'Reseña encontrada',
      'data': review
    });
  } catch (error) {
    next(error);
  }
});

////////////////////////////////GET REVIEW BY COURSE
router.get('/reviews/:idCourse', async (req, res, next) => {
  try {
    const { idCourse } = req.params;
    const review = await service.findReviewsByCourse(idCourse);
    res.json({
      'success': true,
      'message': 'Reseñas encontradas',
      'data': review
    });
  } catch (error) {
    next(error);
  }
});

////////////////////////////////GET REVIEW BY USER AND COURSE
router.post('/review', async (req, res, next) => {
  try {
    const body = req.body;
    const review = await service.findReviewByUserAndCourse(body);
    res.json({
      'success': true,
      'message': 'Se ha creado con éxito',
      'data': review
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:idReview', validatorHandler(getReviewId, 'params'), validatorHandler(updateReviewDto, 'body'),
  async (req, res, next) => {
    try {
      const { idReview } = req.params;
      const body = req.body;
      const { old, changed } = await service.updateDB(idReview, body);
      res.json({
        'success': true,
        'message': 'Se ha actualizado con éxito',
        'data': {
          "original": old,
          "Modificado": changed
        }
      });
    } catch (error) {
      next(error);
    }
  });

router.delete('/:idReview', validatorHandler(getReviewId, 'params'), async (req, res, next) => {
  try {
    const { idReview } = req.params;
    const review = await service.deleteDB(idReview);
    res.json({
      'success': true,
      'message': 'Se ha eliminado con éxito',
      'data': review
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
