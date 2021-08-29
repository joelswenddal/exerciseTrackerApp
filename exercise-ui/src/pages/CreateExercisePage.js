import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';


export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory(); // to return to home page after adding exercise

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',                        // specify the body for POST
            body: JSON.stringify(newExercise),       //fetch requires body to be a string (so stringify the JSON)
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Exercise event added successfully");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <body>
            <header className="nav-bar">
                <div className="nav-links">
                    <p><Link className="App-link" to="/"><MdHome /></Link></p>
                </div>
            </header>
            <main id="edit-exercise">
                <h1>Add Exercise</h1>
                <table id="exercises-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Unit</th>
                            <th>Date</th>
                            <th>Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input
                                className="exercise-name-input"
                                type="text"
                                placeholder="Enter exercise name here"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                            </td>
                            <td><input
                                type="number"
                                value={reps}
                                placeholder="Enter reps here"
                                onChange={e => setReps(e.target.value)} />
                            </td>

                            <td><input
                                type="number"
                                value={weight}
                                placeholder="Enter weight lifted here"
                                onChange={e => setWeight(e.target.value)} />
                            </td>
                            <td><select id="dropdown"
                                onChange={e => setUnit(e.target.value)}>
                                <option >Select unit</option>
                                <option value="lbs">lbs</option>
                                <option value="kgs">kgs</option>
                            </select>
                            </td>

                            <td><input
                                type="text"
                                placeholder="Enter date (MM-DD-YY)"
                                value={date}
                                onChange={e => setDate(e.target.value)} />
                            </td>
                            <td><button
                                onClick={addExercise}
                            >Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </body>
    );
}


export default CreateExercisePage;
