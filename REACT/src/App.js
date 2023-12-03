import './App.css';
import {React} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseRecipes from './pages/BrowseRecipes';
import BrowseIngredients from './pages/BrowseIngredients';
import RecipeView from './pages/RecipeView';
import RecipeEdit from './pages/RecipeEdit';
import IngredientView from './pages/IngredientView';
import IngredientEdit from './pages/IngredientEdit';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/recipes" element={<BrowseRecipes/>}></Route>
          <Route path="/recipes/:recipe_id" element={<RecipeView/>}></Route>
          <Route path="/recipes/:recipe_id/edit" element={<RecipeEdit/>}></Route>
          <Route path="/ingredients" element={<BrowseIngredients/>}></Route>
          <Route path="/ingredients/:ingredient_id" element={<IngredientView/>}></Route>
          <Route path="/ingredients/:ingredient_id/edit" element={<IngredientEdit/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
