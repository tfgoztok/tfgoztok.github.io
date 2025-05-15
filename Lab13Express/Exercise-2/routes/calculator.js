const express = require('express');
const router = express.Router();

const getNumbers = (req) => {
    let a, b;
    
    if (req.params.a && req.params.b) {
        a = parseFloat(req.params.a);
        b = parseFloat(req.params.b);
    }
    else if (req.query.a && req.query.b) {
        a = parseFloat(req.query.a);
        b = parseFloat(req.query.b);
    }
    else if (req.body) {
        a = parseFloat(req.body.a);
        b = parseFloat(req.body.b);
    }

    return { a, b };
};

const validateNumbers = (a, b) => {
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Invalid numbers provided');
    }
    return true;
};

router.all('/addition/:a/:b', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        res.json({ results: a + b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/addition', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        res.json({ results: a + b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/subtraction/:a/:b', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        res.json({ results: a - b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/subtraction', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        res.json({ results: a - b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/multiplication/:a/:b', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        res.json({ results: a * b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/multiplication', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        res.json({ results: a * b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/division/:a/:b', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        res.json({ results: a / b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/division', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        res.json({ results: a / b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/modulus/:a/:b', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        if (b === 0) {
            throw new Error('Modulus by zero is not allowed');
        }
        res.json({ results: a % b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.all('/modulus', (req, res) => {
    try {
        const { a, b } = getNumbers(req);
        validateNumbers(a, b);
        if (b === 0) {
            throw new Error('Modulus by zero is not allowed');
        }
        res.json({ results: a % b });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 