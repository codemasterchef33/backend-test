const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utill/database');
const expenseRouter = require('./routes/expense');

const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/expense',expenseRouter);

const port = 4000;

sequelize.sync()
    .then((result) => {
        console.log(`listening to the ${port}`);
        app.listen(port);
    })
    .catch(err => console.log(err));


