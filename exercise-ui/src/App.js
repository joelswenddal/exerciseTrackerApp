import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage.js';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();  // set this up here so Home page and Edit page can share state (call the edit function and pass info)

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
