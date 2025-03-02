const Router = require('express');
const router = new Router();
const recipeItemController = require('../controllers/recipeItemController');

router.post('/', recipeItemController.create);
router.get('/', recipeItemController.getAll);
router.get('/:id', recipeItemController.getOne);

module.exports = router