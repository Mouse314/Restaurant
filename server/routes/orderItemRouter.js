const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderItemController');

router.post('/', orderController.create);
router.get('/', orderController.getAll);
router.get('/:id', orderController.getOne);

module.exports = router