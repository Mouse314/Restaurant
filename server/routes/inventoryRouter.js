const Router = require('express');
const router = new Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.create);
router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getOne);

module.exports = router