import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdHome, MdAddCircle } from 'react-icons/md';


function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' }); // fetch API: communicate with the REST API server
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete exercise event with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {            // communicate with the REST API server
        const response = await fetch('/exercises'); //proxy has been configured (PORT 3000), so request to the REST API (returns promise)
        const data = await response.json(); // response is json
        setExercises(data);  // set state; necessary because it updates the variable and lets react know to re-render
    }

    useEffect(() => {   // React hook: one req'd parameter -> a function; pass an empty array for 2nd parameter to load when first mounted
        loadExercises();
    }, []);

    // pass down edit and delete functions to the component for use by sub-components (ExerciseList and Exercise)
    return (
        <body>
            <header className="nav-bar">
                <div className="nav-links">
                    <p><Link className="App-link" to="/"><MdHome /></Link></p>
                </div>
                <div className="nav-links">
                    <p><Link className="App-link" to="/create-exercise"><MdAddCircle /></Link></p>
                </div>
            </header>
            <main>
                <h2>Exercise List</h2>
                <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>

                {<Link className="App-link" to="/create-exercise">
                    <button type="button">
                        Add an exercise event
                    </button>
                </Link>}
            </main>
        </body>

    );
}

export default HomePage;