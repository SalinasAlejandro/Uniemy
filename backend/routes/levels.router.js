const express = require('express');
const LevelsService = require('../services/levels.service');
const service = new LevelsService();
const validatorHandler = require('./../middlewares/validator.handler');
const { createLevelDto, updateLevelDto, getLevelId } = require('./../dtos/levels.dto');

const router = express.Router();

//GET ALL LEVELS
router.get('/', async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const levels = await service.findDB(size || 1000, filter);
    res.json({
      'success': true,
      'message': 'Estos son los niveles guardados actualmente',
      'data': levels
    });
  } catch (error) {
    next(error);
  }

});

////////////////////////////////CREATE A NEW LEVEL
router.post('/', validatorHandler(createLevelDto, 'body'), async (req, res) => {
  const body = req.body;
  const level = await service.createDB(body);
  res.json({
    'success': true,
    'message': 'Se ha creado con éxito',
    'data': level
  });
});

////////////////////////////////GET LEVEL BY ID
router.get('/:idLevel', validatorHandler(getLevelId, 'params'), async (req, res, next) => {
  try {
    const { idLevel } = req.params;
    const level = await service.findOneDB(idLevel);
    res.json({
      'success': true,
      'message': 'Nivel encontrado',
      'data': level
    });
  } catch (error) {
    next(error);
  }
});

////////////////////////////////GET LEVELS OF COURSES
router.get('/course/:idCouse', async (req, res, next) => {
  try {
    const { idCouse } = req.params;
    const levels = await service.findLevelsCourse(idCouse);
    res.json({
      'success': true,
      'message': 'Niveles encontrados',
      'data': levels
    });
  } catch (error) {
    next(error);
  }
});

////////////////////////////////GET LEVELS OF COURSES
router.post('/level/PrevNext', async (req, res, next) => {
  try {
    const body = req.body;
    const level = await service.findLevelPrevNext(body);
    res.json({
      'success': true,
      'message': 'Nivel previo/siguiente encontrado',
      'data': level
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:idLevel', validatorHandler(getLevelId, 'params'), validatorHandler(updateLevelDto, 'body'),
  async (req, res, next) => {
    try {
      const { idLevel } = req.params;
      const body = req.body;
      const { old, changed } = await service.updateDB(idLevel, body);
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

router.delete('/:idLevel', validatorHandler(getLevelId, 'params'), async (req, res, next) => {
  try {
    const { idLevel } = req.params;
    const level = await service.deleteDB(idLevel);
    res.json({
      'success': true,
      'message': 'Se ha eliminado con éxito',
      'data': level
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
