import './App.css';
import {React} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseRecipes from './pages/BrowseRecipes';
import BrowseIngredients from './pages/BrowseIngredients';
import RecipeEdit from './pages/RecipeEdit';
import IngredientEdit from './pages/IngredientEdit';

function App() {

  return (
    <div className="App">
      <header>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/recipes" element={<BrowseRecipes/>}></Route>
            <Route path="/recipes/:recipe_id/edit" element={<RecipeEdit/>}></Route>
            <Route path="/ingredients" element={<BrowseIngredients/>}></Route>
            <Route path="/ingredients/:ingredient_id/edit" element={<IngredientEdit/>}></Route>
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
