const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

router.post('/add-expense', expenseController.postExpense);


router.get('/get-expense', expenseController.addExpense);


router.delete('/delete-expense/:id', expenseController.deleteExpense);

router.post('/update-expense/:id', expenseController.updateExpense);

module.exports = router;

















































