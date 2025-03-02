const Router = require('express');
const router = new Router();
const visitorRouter = require('./visitorRouter');
const tableRouter = require('./tableRouter');
const employeeRouter = require('./employeeRouter');
const menuitemRouter = require('./menuItemRouter');
const inventoryRouter = require('./inventoryRouter');
const orderRouter = require('./orderRouter');
const reservationRouter = require('./reservationRouter');
const orderItemRouter = require('./orderItemRouter');
const paymentRouter = require('./paymentRouter');
const recipeItemRouter = require('./recipeItemRouter');

router.use('/visitor', visitorRouter);
router.use('/table', tableRouter);
router.use('/employee', employeeRouter);
router.use('/menuitem', menuitemRouter);
router.use('/inventory', inventoryRouter);
router.use('/order', orderRouter);
router.use('/reservation', reservationRouter);
router.use('/orderitem', orderItemRouter);
router.use('/payment', paymentRouter);
router.use('/recipeitem', recipeItemRouter);


module.exports = router