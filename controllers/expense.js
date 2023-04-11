const Expense = require('../models/expense');

exports.postExpense = async (req, res, next) => {
    try {
        const amt = req.body.amount;
        const dis = req.body.description;
        const cat = req.body.categary;

        const data = await Expense.create({
            amount: amt,
            description: dis,
            categary: cat
        })

        return res.status(201).json({ newExpenseDetail: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}



exports.addExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({ allExpenses: expenses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}


exports.deleteExpense = async (req, res, next) => {
    try {
        const id = req.params.id;

        console.log(id);
        const expense = await Expense.findByPk(id);  //Expense.update(id)
        if (!expense) {
            console.log(`this expense doesn't exist`);
            return res.sendStatus(400);
        }
        await expense.destroy();
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}


exports.updateExpense = async (req, res, next) => {
    try {
        // console.log(req.params.body.description);
        

        const amt = req.body.amount;
        const dis = req.body.description;
        const cat = req.body.categary;
        const id = req.params.id;

        // const exp = await Expense.update(id,req.body);
        const expense = await Expense.findByPk(id);
        expense.amount = amt;
        expense.description = dis;
        expense.categary = cat;
        await expense.save();

        // console.log(expense);
        await res.status(200).json({ newExpenseDetail: expense });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}