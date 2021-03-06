const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/growing_room', (req, res) => {
    const queryText = `SELECT * FROM "growing_room"`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing SELECT growing_room query', err);
            res.sendStatus(500);
        });
});

router.get('/growing_room/types', (req, res) => {
    const queryText = `select column_name,data_type from information_schema.columns where table_name = 'growing_room';`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(`recieved growing_room data types `, result.rows);

        })
        .catch((err) => {
            console.log('Error completing SELECT for growing_room data types', err);
            res.sendStatus(500);
        });
});

router.get('/incubator', (req, res) => {
    const queryText = `SELECT * FROM "incubator"`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(`recieved pallets `, result.rows);

        })
        .catch((err) => {
            console.log('Error completing SELECT incubator query', err);
            res.sendStatus(500);
        });
});

router.get('/incubator/types', (req, res) => {
    const queryText = `select column_name,data_type from information_schema.columns where table_name = 'incubator';`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(`recieved incubator data types `, result.rows);

        })
        .catch((err) => {
            console.log('Error completing SELECT for incubator data types', err);
            res.sendStatus(500);
        });
});

router.put('/update', (req, res) => {
    let value = req.body.modification_value[req.body.target_column[0]];
    let table = req.body.target_table;
     console.log(`table put `, value), req.body;
    
    // make sure this is actually tageting a column to avoid middleman issue
    let queryText = `UPDATE "incubator" SET ${req.body.target_column[0]} = $1 WHERE "id" = $2;`
    let queryValues = [value, req.body.target_id];
    if(table==='growing_room'){
        queryText = `UPDATE "growing_room" SET ${req.body.target_column[0]} = $1 WHERE "id" = $2;`
    }

    pool.query(queryText, queryValues)
        .then((result) => {
            res.sendStatus(201);
            console.log(`updated to process table `, queryValues);

        })
        .catch((err) => {
            console.log('Error completing UPDATE query', err, queryValues);
            res.sendStatus(500);
        });
});

router.post('/insert', (req, res) => {
    let target = req.body.modification_value;
    
    let table = req.body.target_table;
    
    console.log(`req.body `, target);
    console.log(`req.params`, req.params);
    
    let queryText = '';
    let queryValues = [];
    if (table==='growing_room'){
        console.log(`added to growing_room `);

        queryText=`INSERT INTO "growing_room" ("cart_name", "start_date", "pallet", "first_room",
                            "second_room", "second_transfer", "compost_date", "notes", "active")
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        queryValues = [target.cart_name, target.start_date, target.pallet, target.first_room, target.second_room,
                                target.second_transfer, target.compost_date, target.notes, target.active];
    }
    else if (table === 'incubator') {
        console.log(`added to incubator `);

        queryText = `INSERT INTO "growing_room" ("cart_name", "start_date", "pallet", "first_room",
                        "second_room", "second_transfer", "compost_date", "notes", "active")
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        queryValues = [target.cart_name, target.start_date, target.pallet, target.first_room, target.second_room,
            target.second_transfer, target.compost_date, target.notes, target.active
        ];
    }

    pool.query(queryText, queryValues)
        .then((result) => {
            res.sendStatus(201);
            console.log(`added to process table `, queryValues);

        })
        .catch((err) => {
            console.log('Error completing INSERT INTO growing_room query', err);
            res.sendStatus(500);
        });
});

// relates carts to pallets 
// need to work on sql query and modify db
// router.get('/cart_pallet', (req, res) => {
//     const queryText = `SELECT * FROM "incubator"`;
//     pool.query(queryText)
//         .then((result) => {
//             res.send(result.rows);
//             console.log(`recieved pallets `, result.rows);

//         })
//         .catch((err) => {
//             console.log('Error completing SELECT pallet query', err);
//             res.sendStatus(500);
//         });
// });


module.exports = router;