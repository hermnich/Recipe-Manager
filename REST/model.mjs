//import mysql from 'mysql';
import 'sequelize';
import 'dotenv/config';
import 'mysql';

// Connect to to the database
const db = mysql.createPool ({
    connectionLimit: 10,
    host: process.env.HOST,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

const createRecipe = async (parameters) => {
    const sql = 
    db.query(sql, function (err, results, fields) {
        
    })
};

const retrieveRecipes = async (filter) => {
    const results = await Recipe.findAll();
    console.log(results);
    return results;
};

const updateRecipe = async (_id, parameters) => {

};

const deleteRecipe = async (_id) => {

};

const createIngredient = async (parameters) => {

};

const retrieveIngredients = async (filter) => {

};

const updateIngredient = async (_id, parameters) => {

};

const deleteIngredient = async (_id) => {

};

const createRecipeIngredient = async () => {

};

const retrieveRecipeIngredients = async () => {

};

const updateRecipeIngredient = async () => {

};

const deleteRecipeIngredient = async () => {

};

export {createRecipe, retrieveRecipes, updateRecipe, deleteRecipe, 
    createIngredient, retrieveIngredients, updateIngredient, deleteIngredient, 
    createRecipeIngredient, retrieveRecipeIngredients, updateRecipeIngredient, deleteRecipeIngredient}
