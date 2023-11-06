import 'dotenv/config';
import * as db from './db_connector.mjs';
import express from 'express';
import * as test from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Recipe controls
 */

// Create a new recipe with the provided parameters
app.post('/recipes', 
    // Validate new recipe parameters before creation
    test.body('name').isString(),
    test.body('servings').isInt({ gt: 0 }),
    test.body('cals_per_serving').isInt({ gt: 0 }),
    test.body('instructions').optional().isString(),

    (req, res) => {
        const validation = test.validationResult(req);
        if (validation.isEmpty()) {
            const parameters = [
                req.body.name,
                req.body.servings,
                req.body.cals_per_serving,
                req.body.instructions];
            const sql = "INSERT INTO Recipes (name, servings, cals_per_serving) VALUES (?, ?, ?)";
            db.pool.query(sql, parameters, function(err, results) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ Error: 'Request failed' });
                } else {
                    res.status(201).json(results);
                };
            });
        } else {
            res.status(400).json({Error: "Invalid request"});
        };
});

// Retrieve all recipes
app.get('/recipes', (req, res) => {
    const sql = "SELECT * FROM Recipes ORDER BY name ASC"
    db.pool.query(sql, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.length === 0){ 
            res.status(404).json({ Error: 'Resource not found' })
        } else {
            res.status(200).json(results);
        };
    });
});

// Retrieve recipe with specified id
app.get('/recipes/:recipe_id', (req, res) => {
    const sql = "SELECT * FROM Recipes WHERE recipe_id = ?"
    db.pool.query(sql, req.params.recipe_id, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.length === 0){ 
            res.status(404).json({ Error: 'Resource not found' })
        } else {
            res.status(200).json(results);
        };
    });
});

// Update a recipe with the provided parameters
app.put('/recipes/:recipe_id',
    // Validate new recipe parameters before creation
    test.body('name').isString(),
    test.body('servings').isInt({ gt: 0 }),
    test.body('cals_per_serving').isInt({ gt: 0 }),
    test.body('instructions').optional().isString(),

    (req, res) => {
        const validation = test.validationResult(req);
        if (validation.isEmpty()) {
            const parameters = req.body;
            const sql = "UPDATE Recipes SET ? WHERE recipe_id = ?";
            db.pool.query(sql, [parameters, req.params.recipe_id], function(err, results) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ Error: 'Request failed' });
                } else if (results.affectedRows === 1) {
                    res.status(200).json(results);
                } else {
                res.status(404).json({ Error: 'Resource not found' });
                };
            });
        } else {
            res.status(400).json({Error: "Invalid request"});
        };
});

// Delete the recipe with specified id
app.delete('/recipes/:recipe_id', (req, res) => {
    const sql = "DELETE FROM Recipes WHERE recipe_id = ?"
    db.pool.query(sql, req.params.recipe_id, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.affectedRows === 1) {
            res.status(204).json(results);
        } else {
           res.status(404).json({ Error: 'Resource not found' });
        };
    });
    
});

/**
 * Ingredient controls
 */

// Create a new ingredient with the provided parameters
app.post('/ingredients', 
    // Validate new ingredient parameters before creation
    test.body('name').isString(),
    test.body('serving_size').isFloat({ gt: 0 }),
    test.body('calories').isInt({ gt: 0 }),
    test.body('cals_per_100g').isFloat({gt: 0}),

    (req, res) => {
        const validation = test.validationResult(req);
        if (validation.isEmpty()) {
            const parameters = [
                req.body.name,
                req.body.serving_size,
                req.body.calories,
                req.body.cals_per_100g
            ];
            const sql = "INSERT INTO Ingredients (name, serving_size, calories, cals_per_100g) VALUES (?, ?, ?, ?)";
            db.pool.query(sql, parameters, function(err, results) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ Error: 'Request failed' });
                } else {
                    res.status(201).json(results);
                };
            });
        } else {
            res.status(400).json({Error: "Invalid request"});
        };
});

/**
 * Retrieve all ingredients
 */
app.get('/ingredients', (req, res) => {
    const sql = "SELECT * FROM Ingredients ORDER BY name ASC"
    db.pool.query(sql, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.length === 0){ 
            res.status(404).json({ Error: 'Resource not found' })
        } else {
            res.status(200).json(results);
        };
    });
});

/**
 * Retrieve ingredient with specified id
 */
app.get('/ingredients/:ingredient_id', (req, res) => {
    const sql = "SELECT * FROM Ingredients WHERE ingredient_id = ?"
    db.pool.query(sql, req.params.ingredient_id, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.length === 0){ 
            res.status(404).json({ Error: 'Resource not found' })
        } else {
            res.status(200).json(results);
        };
    });
});

/**
 * Update an ingredient with the provided parameters
 */
app.put('/ingredients/:ingredient_id',
    // Validate new ingredient parameters before creation
    test.body('name').isString(),
    test.body('serving_size').isFloat({ gt: 0 }),
    test.body('calories').isInt({ gt: 0 }),
    test.body('cals_per_100g').isFloat({gt: 0}),

    (req, res) => {
        const validation = test.validationResult(req);
        if (validation.isEmpty()) {
            const parameters = req.body;
            const sql = "UPDATE Ingredients SET ? WHERE ingredient_id = ?";
            db.pool.query(sql, [parameters, req.params.ingredient_id], function(err, results) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ Error: 'Request failed' });
                } else if (results.affectedRows === 1) {
                    res.status(200).json(results);
                } else {
                res.status(404).json({ Error: 'Resource not found' });
                };
            });
        } else {
            res.status(400).json({Error: "Invalid request"});
        };
});

/**
 * Delete the ingredient with specified id
 */
app.delete('/ingredients/:ingredient_id', (req, res) => {
    const sql = "DELETE FROM Ingredients WHERE ingredient_id = ?"
    db.pool.query(sql, req.params.ingredient_id, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.affectedRows === 1) {
            res.status(204).json(results);
        } else {
           res.status(404).json({ Error: 'Resource not found' });
        };
    });
    
});


/**
 * Recipe Ingredient Controls
 */

// Add an ingredient to a recipe
app.post('/recipes/:recipe_id/ingredients', 
    // Validate parameters before creation
    test.param('recipe_id').isInt({ gt: 0 }),
    test.body('ingredient_id').isInt({ gt: 0 }),
    test.body('quantity').isString(),
    test.body('grams').isInt({ gt: 0 }),

    (req, res) => {
        const validation = test.validationResult(req);
        if (validation.isEmpty()) {
            const parameters = [
                req.params.recipe_id, 
                req.body.ingredient_id, 
                req.body.quantity,
                req.body.grams];
            const sql = "INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, grams) VALUES (?, ?, ?, ?)";
            db.pool.query(sql, parameters, function(err, results) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ Error: 'Request failed' });
                } else {
                    res.status(201).json(results);
                };
            });
        } else {
            res.status(400).json({Error: "Invalid request"});
        };
});

// Get all ingredients for a recipe. Includes join of all ingredient parameters for each ingredient
app.get('/recipes/:recipe_id/ingredients', (req, res) => {
    const sql = "SELECT * FROM RecipeIngredients JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.ingredient_id WHERE recipe_id = ?"
    db.pool.query(sql, req.params.recipe_id, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.length === 0){ 
            res.status(404).json({ Error: 'Resource not found' })
        } else {
            res.status(200).json(results);
        };
    });
});

// Update an ingredient for a recipe
app.put('/recipes/:recipe_id/ingredients/:ingredient_id',
    // Validate parameters before creation
    test.param('recipe_id').isInt({ gt: 0 }),
    test.param('ingredient_id').isInt({ gt: 0 }),
    test.body('quantity').isString(),
    test.body('grams').isInt({ gt: 0 }),

    (req, res) => {
        const validation = test.validationResult(req);
        if (validation.isEmpty()) {
            const parameters = req.body;
            const sql = "UPDATE RecipeIngredients SET ? WHERE recipe_id = ? AND ingredient_id = ?";
            db.pool.query(sql, [parameters, req.params.recipe_id, req.params.ingredient_id], function(err, results) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ Error: 'Request failed' });
                } else if (results.affectedRows === 1) {
                    res.status(200).json(results);
                } else {
                res.status(404).json({ Error: 'Resource not found' });
                };
            });
        } else {
            res.status(400).json({Error: "Invalid request"});
        };
});

// Remove an ingredient from a recipe
app.delete('/recipes/:recipe_id/ingredients/:ingredient_id', (req, res) => {
    const sql = "DELETE FROM RecipeIngredients WHERE recipe_id = ? AND ingredient_id = ?"
    db.pool.query(sql, [req.params.recipe_id, req.params.ingredient_id], function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.affectedRows === 1) {
            res.status(204).json(results);
        } else {
           res.status(404).json({ Error: 'Resource not found' });
        };
    });
    
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});