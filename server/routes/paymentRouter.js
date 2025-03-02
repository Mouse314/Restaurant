const Router = require('express');
const router = new Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.create);
router.get('/', paymentController.getAll);
router.get('/:id', paymentController.getOne);

module.exports = router