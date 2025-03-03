const Router = require('express');
const router = new Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.create);
router.get('/', reservationController.getAll);
router.get('/:id', reservationController.getOne);
router.put('/:id', reservationController.update);
router.delete('/', reservationController.deleteAll)
router.delete('/:id', reservationController.delete);

module.exports = router