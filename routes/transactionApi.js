//import dependencies for express routing
const express = require('express');
const router = express.Router();

//import controller for transactions
const transactionApiController = require('../controllers/transactionApi')


/* connect routes to controller */

//route for adding transactions
router.post('/addTransaction', transactionApiController.addTransaction);

//route for spending points
router.post('/spendPoints', transactionApiController.spendPoints);

//route for getting point balances
router.get('/getBalance', transactionApiController.getBalance);


//export router for server to use
module.exports = router;