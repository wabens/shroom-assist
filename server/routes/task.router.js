const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// get all tasks
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "task"`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(`recieved tasks `, result.rows);

        })
        .catch((err) => {
            console.log('Error completing SELECT task query', err);
            res.sendStatus(500);
        });
});

// insert a new task
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`newTask `, newTask);
    
    const queryText = `INSERT INTO "task" ("task_name", "description", "create_date", "active", "creator")
                        VALUES ($1, $2, $3, $4, $5);`;
    const queryValues = [newTask.task_name, newTask.description, newTask.create_date, newTask.active, newTask.creator];
    pool.query(queryText, queryValues)
        .then((result) => {
            res.sendStatus(201);
            console.log(`added new task `, newTask);

        })
        .catch((err) => {
            console.log('Error completing INSERT task query', err);
            res.sendStatus(500);
        });
});


// get all targets
router.get('/target', (req, res) => {
    const queryText = `SELECT * FROM "target"`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(`recieved targets `, result.rows);

        })
        .catch((err) => {
            console.log('Error completing SELECT target query', err);
            res.sendStatus(500);
        });
});



// update target modificaiton_value
router.put('/target/value', (req, res) => {
    const target = req.body;
    console.log(`target`, target);
    
    const queryText = `UPDATE "target" SET "modification_value" = $1 WHERE "target_id"=$2`;
    const queryValue = [target.modification_value, target.target_id];

    pool.query(queryText, queryValue)
        .then((result) => {
            res.sendStatus(200);
            console.log(`updated target modificaiton_value `, queryValue);

        })
        .catch((err) => {
            console.log('Error completing UPDATE target query', err);
            res.sendStatus(500);
        });
});

// get all constraints
router.get('/constraint', (req, res) => {
    const queryText = `SELECT * FROM "constraint"`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(`recieved constraints `, result.rows);

        })
        .catch((err) => {
            console.log('Error completing SELECT constraint query', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {

});

module.exports = router;