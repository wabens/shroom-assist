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