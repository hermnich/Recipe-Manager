import 'dotenv/config';
import * as db from './db_connector.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());


function insert(table_name, req, res) {
    let keys = []
    let values = []
    for (const [key, value] of Object.entries(req.body)) {
        keys.push(key)
        values.push(value)
    }

    const sql = "INSERT INTO ?? (??) VALUES (?);";
    db.pool.query(sql, [table_name, keys, values], function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else {
            res.status(201).json({id: results.insertId});
        };
    });
}

function select_all(table_name, req, res) {
    const sql = "SELECT * FROM ??"
    db.pool.query(sql, table_name, function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.length === 0){ 
            res.status(404).json({ Error: 'Resource not found' })
        } else {
            res.status(200).json(results);
        };
    });
}

function select_id(table_name, req, res) {
    let keys = []
    let values = []
    for (const [key, value] of Object.entries(req.params)) {
        keys.push(key)
        values.push(value)
    }

    const sql = `SELECT * FROM ?? WHERE ?? = ?`
    db.pool.query(sql, [table_name, keys, values], function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.length === 0){ 
            res.status(404).json({ Error: 'Resource not found' })
        } else {
            res.status(200).json(results);
        };
    });
}

function update_id(table_name, req, res) {
    const parameters = req.body;
    let keys = []
    let values = []
    for (const [key, value] of Object.entries(req.params)) {
        keys.push(key)
        values.push(value)
    }

    const sql = "UPDATE ?? SET ? WHERE ?? = ?";
    db.pool.query(sql, [table_name, parameters, keys, values], function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.affectedRows === 1) {
            res.status(200).json(results);
        } else {
        res.status(404).json({ Error: 'Resource not found' });
        };
    });
}

function delete_id(table_name, req, res) {
    let keys = []
    let values = []
    for (const [key, value] of Object.entries(req.params)) {
        keys.push(key)
        values.push(value)
    }

    const sql = "DELETE FROM ?? WHERE ?? = ?"
    db.pool.query(sql, [table_name, keys, values], function(err, results) {
        if (err) {
            console.error(err)
            res.status(400).json({ Error: 'Request failed' });
        } else if (results.affectedRows === 1) {
            res.status(204).json(results);
        } else {
           res.status(404).json({ Error: 'Resource not found' });
        };
    });
}

/**
 * Recipe controls
 */

// Create a new recipe with the provided parameters
app.post('/recipes', (req, res) => {
    insert('Recipes', req, res)
});

// Retrieve all recipes. Includes calculated calories based on the ingredients for each recipe
app.get('/recipes', (req, res) => {
    const sql = `SELECT Recipes.*, floor(sum(RecipeIngredients.quantity * Ingredients.calories / 100 / Recipes.servings)) AS calories
                FROM Recipes
                JOIN RecipeIngredients
                    ON RecipeIngredients.recipe_id = Recipes.recipe_id
                JOIN Ingredients
                    ON Ingredients.ingredient_id = RecipeIngredients.ingredient_id
                GROUP BY Recipes.recipe_id
                ORDER BY Recipes.name ASC`
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
    select_id('Recipes', req, res)
});

// Update a recipe with the provided parameters
app.put('/recipes/:recipe_id', (req, res) => {
    update_id("Recipes", req, res)
});

// Delete the recipe with specified id
app.delete('/recipes/:recipe_id', (req, res) => {
    delete_id('Recipes', req, res)    
});

/**
 * Ingredient controls
 */

// Create a new ingredient with the provided parameters
app.post('/ingredients', (req, res) => {
    insert('Ingredients', req, res)
});

// Retrieve all ingredients
app.get('/ingredients', (req, res) => {
    select_all("Ingredients", req, res)
});

// Retrieve ingredient with specified id
app.get('/ingredients/:ingredient_id', (req, res) => {
    select_id('Ingredients', req, res)
});

// Update an ingredient with the provided parameters
app.put('/ingredients/:ingredient_id', (req, res) => {
    update_id('Ingredients', req, res)
});

// Delete the ingredient with specified id
app.delete('/ingredients/:ingredient_id', (req, res) => {
    delete_id('Ingredients', req, res)
});


/**
 * Recipe Ingredient Controls
 */

// Add an ingredient to a recipe
app.post('/recipes/:recipe_id/ingredients', (req, res) => {
    insert('RecipeIngredients', req, res)
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
    update_id('RecipeIngredients', req, res)
});

// Remove an ingredient from a recipe
app.delete('/recipe_ingredients/:recipe_ingredient_id', (req, res) => {
    delete_id('RecipeIngredients', req, res)
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});