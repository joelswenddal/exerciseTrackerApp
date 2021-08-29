import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));


app.use(express.json());  // needed because REST API typically uses the MIME type JSON

/**
 * Create a new exercise event with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise); // express sends the response after sending the status (content-type: JSON)
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve exercises. 
 * All exercise events in the db are returned.
 */
app.get('/exercises', (req, res) => {
    let filter = {};

    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Update the exercise event whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, title: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).json({ error: 'Request failed' });
        });
});

app.use((error, req, res, next) => {

    console.log(`Unhandled error ${error}. URL = ${req.originalUrl}, method = ${req.method}`);
    res.status(500).json({ error: 'Server error' });
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});