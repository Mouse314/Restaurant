const Router = require('express');
const router = new Router();
const visitorController = require('../controllers/visitorController');

router.post('/', visitorController.create);
router.get('/', visitorController.getAll);
router.get('/:id', visitorController.getOne);
router.put('/:id', visitorController.update);
router.delete('/', visitorController.deleteAll)
router.delete('/:id', visitorController.delete);

module.exports = router