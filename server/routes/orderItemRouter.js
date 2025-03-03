const Router = require('express');
const router = new Router();
const orderItemController = require('../controllers/orderItemController');

router.post('/', orderItemController.create);
router.get('/', orderItemController.getAll);
router.get('/:id', orderItemController.getOne);
router.put('/:id', orderItemController.update);
router.delete('/', orderItemController.deleteAll)
router.delete('/:id', orderItemController.delete);

module.exports = router