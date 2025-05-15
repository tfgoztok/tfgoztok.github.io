const express = require('express');
const bodyParser = require('body-parser');
const calculatorRouter = require('./routes/calculator');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', calculatorRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Calculator API is running on http://localhost:${port}`);
}); 