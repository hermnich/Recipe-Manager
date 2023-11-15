import 'dotenv/config';
import express from 'express';
import * as test from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post('/percent', 
    // Validate request before execution
    test.query('total').isFloat({gt: 0}),
    test.body().isObject(),
    test.body('*').isFloat({min: 0}),

    (req, res) => {
        const validation = test.validationResult(req);
        if (validation.isEmpty()) {
            const total = req.query.total
            let results = {};
        
            Object.keys(req.body).forEach((key) => {
                results[key] = req.body[key] * 100 / total
            });
            res.status(200).json(results);
        } else {
            res.status(400).json({Error: "Invalid request"})
        }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});