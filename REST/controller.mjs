import 'dotenv/config';
import * as db from './db_connector.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Recipe controls
 */

// Create a new recipe with the provided parameters
app.post('/recipes', (req, res) => {
    const parameters = [
        req.body.name,
        req.body.servings,
        req.body.cals_per_serving,
        req.body.instructions];
    const sql = "INSERT INTO Recipes (name, servings, cals_per_serving, instructions) VALUES (?, ?, ?, ?); ";
    db.pool.getConnection(function(err, connection) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        }
        connection.query(sql, parameters, function(err) {
            if (err) {
                console.error(err)
                res.status(400).json({ Error: 'Request failed' });
            } else {
                connection.query("SELECT LAST_INSERT_ID() as recipe_id", function(err, results) {
                    if (err) {
                        console.error(err)
                        res.status(400).json({ Error: 'Request failed' });
                    } else {
                        res.status(201).json({recipe_id: results[0].recipe_id});
                    }
                })
            };
        });
        connection.release();
    });
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
app.put('/recipes/:recipe_id', (req, res) => {
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
app.post('/ingredients', (req, res) => {
    const parameters = [
        req.body.name,
        req.body.serving_size,
        req.body.calories,
        req.body.cals_per_100g
    ];
    const sql = "INSERT INTO Ingredients (name, serving_size, calories, cals_per_100g) VALUES (?, ?, ?, ?)";
    db.pool.getConnection(function(err, connection) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        }
        connection.query(sql, parameters, function(err) {
            if (err) {
                console.error(err)
                res.status(400).json({ Error: 'Request failed' });
            } else {
                connection.query("SELECT LAST_INSERT_ID() as ingredient_id", function(err, results) {
                    if (err) {
                        console.error(err)
                        res.status(400).json({ Error: 'Request failed' });
                    } else {
                        res.status(201).json({ingredient_id: results[0].ingredient_id});
                    }
                })
            };
        });
        connection.release();
    });
});


// Retrieve all ingredients
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

// Retrieve ingredient with specified id
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

// Update an ingredient with the provided parameters
app.put('/ingredients/:ingredient_id', (req, res) => {
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
});

// Delete the ingredient with specified id
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
app.post('/recipes/:recipe_id/ingredients', (req, res) => {
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
});

// Get all ingredients for a recipe. Includes join of all ingredient parameters for each ingredient
app.get('/recipes/:recipe_id/ingredients', (req, res) => {
    const sql = "SELECT * FROM RecipeIngredients LEFT JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.ingredient_id WHERE recipe_id = ?"
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
app.put('/recipe_ingredients/:recipe_ingredient_id', (req, res) => {
    const parameters = req.body;
    const sql = "UPDATE RecipeIngredients SET ? WHERE recipe_ingredient_id = ?";
    db.pool.query(sql, [parameters, req.params.recipe_ingredient_id], function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.affectedRows === 1) {
            res.status(200).json(results);
        } else {
        res.status(404).json({ Error: 'Resource not found' });
        };
    });
});

// Remove an ingredient from a recipe
app.delete('/recipe_ingredients/:recipe_ingredient_id', (req, res) => {
    const sql = "DELETE FROM RecipeIngredients WHERE recipe_ingredient_id = ?"
    db.pool.query(sql, req.params.recipe_ingredient_id, function(err, results) {
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