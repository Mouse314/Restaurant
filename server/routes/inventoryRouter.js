const Router = require('express');
const router = new Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.create);
router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getOne);
router.put('/:id', inventoryController.update);
router.delete('/', inventoryController.deleteAll)
router.delete('/:id', inventoryController.delete);

module.exports = router