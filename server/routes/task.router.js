const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');


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
router.post('/', async (req, res) => {
    const client = await pool.connect()
    let newTask = req.body;
    let targetList = req.body.targetList;
    let constraintList = req.body.constraintList;
    console.log(`newTask `, newTask);

    let queryText = `INSERT INTO "task" ("task_name", "description", "create_date", "active", "creator")
                        VALUES ($1, $2, $3, $4, $5) RETURNING "task_id";`;
    let queryValues = [newTask.name, newTask.description, moment(), true, 1];
    try {
        await client.query('BEGIN');
        let result = await pool.query(queryText, queryValues);
        let task_id = result.rows[0].task_id;
        console.log(`returned id `, task_id);
        res.sendStatus(201);
        
        console.log(`targetList`, targetList);
        console.log(`constraintLIst`, constraintList);
        
        queryText = `INSERT INTO "constraint" ("task_id", "constraint_table", "constraint_column", "constraint_comparison")
                    VALUES ($1, $2, $3, $4);`
        for(constraint of constraintList){
            queryValues = [task_id, constraint.constraint_table, constraint.constraint_column, constraint.constraint_comparison];
            await pool.query(queryText, queryValues);
        }
        queryText = `INSERT INTO "target" ("task_id", "target_table", "target_column", "modification_value", "modification")
                    VALUES ($1, $2, $3, $4, $5);`
        for(target of targetList){
            queryValues = [task_id, target.target_table, target.target_column, target.modification_value, target.modification];
            await pool.query(queryText, queryValues);
        }
    } catch(error){
        await client.query('ROLLBACK')
        throw error

    } finally{
        client.release()
        
    }
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

router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "task" WHERE "task_id"=$1;`;
    let queryValues = [req.params.id];
    pool.query(queryText, queryValues)
        .then((result) => {
            res.sendStatus(200);
            console.log(`DELETE task`, queryValues);

        })
        .catch((err) => {
            console.log('Error completing DELETE task query', err);
            res.sendStatus(500);
        });

})


module.exports = router;