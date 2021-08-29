import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { MdHome, MdAddCircle } from 'react-icons/md';


export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory(); // to return to home page after adding exercise

    const editExercise = async () => {
        const editedExercise = { name: name, reps: reps, weight: weight, unit: unit, date: date }
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            alert("Exercise event was edited successfully.");
        } else {
            alert(`Failed to edit exercise event, status code = ${response.status}`);
        }
        history.push("/");
    };

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
            <main id="edit-exercise">
                <h1>Edit Exercise</h1>
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
                                <option value={unit}>{unit}</option>
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
                                onClick={editExercise}
                            >Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </body>

    );
}

export default EditExercisePage;
