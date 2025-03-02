const Router = require('express');
const router = new Router();
const tableController = require('../controllers/tableController');

router.post('/', tableController.create);
router.get('/', tableController.getAll);
router.get('/:id', tableController.getOne);

module.exports = router