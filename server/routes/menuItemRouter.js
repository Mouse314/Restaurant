const Router = require('express');
const router = new Router();
const menuitemController = require('../controllers/menuitemController');

router.post('/', menuitemController.create);
router.get('/', menuitemController.getAll);
router.get('/:id', menuitemController.getOne);
router.put('/:id', menuitemController.update);
router.delete('/', menuitemController.deleteAll)
router.delete('/:id', menuitemController.delete);

module.exports = router