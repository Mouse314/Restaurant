const Router = require('express');
const router = new Router();
const tableController = require('../controllers/tableController');

router.post('/', tableController.create);
router.get('/', tableController.getAll);
router.get('/:id', tableController.getOne);
router.put('/:id', tableController.update);
router.delete('/', tableController.deleteAll)
router.delete('/:id', tableController.delete);

module.exports = router