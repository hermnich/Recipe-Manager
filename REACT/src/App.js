import './App.css';
import {React, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseRecipes from './pages/BrowseRecipes';
import BrowseIngredients from './pages/BrowseIngredients';
import RecipeEdit from './pages/RecipeEdit';
import IngredientEdit from './pages/IngredientEdit';
import RecipeIngredientEdit from './pages/RecipeIngredientEdit'


function App() {

  const [recipeToEdit, setRecipeToEdit] = useState([]);
  const [ingredientToEdit, setIngredientToEdit] = useState([]);
  const [recipeIngredientToEdit, setRecipeIngredientToEdit] = useState([]);

  return (
    <div className="App">
      <header>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage setRecipeToEdit={setRecipeToEdit} setIngredientToEdit={setIngredientToEdit}/>}></Route>
            <Route path="/recipes" element={<BrowseRecipes setRecipeToEdit={setRecipeToEdit}/>}></Route>
            <Route path="/recipes/edit" element={<RecipeEdit recipeToEdit={recipeToEdit} setRecipeIngredientToEdit={setRecipeIngredientToEdit}/>}></Route>
            <Route path="/ingredients" element={<BrowseIngredients setIngredientToEdit={setIngredientToEdit}/>}></Route>
            <Route path="/ingredients/edit" element={<IngredientEdit ingredientToEdit={ingredientToEdit}/>}></Route>
            <Route path="/recipes/edit/ingredients" element={<RecipeIngredientEdit recipeIngredientToEdit={recipeIngredientToEdit}/>}></Route>
          </Routes>
        </Router>
      </header>
      <footer className="App-footer">
        <div>
          
        </div>
      </footer>
    </div>
  );
}

export default App;
