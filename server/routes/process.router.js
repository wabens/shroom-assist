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
            console.log('Error completing SELECT carts-pallet query', err);
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
            console.log('Error completing SELECT pallet query', err);
            res.sendStatus(500);
        });
});

router.post('/growing_room', (req, res) => {
    let target = req.body;
    const queryText = `INSERT INTO "growing_room" ("cart_name", "start_date", "pallet", "first_room",
                         "second_room", "second_transfer", "compost_date", "notes", "active")
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
    pool.query(queryText, [target.cart_name, target.start_date, target.pallet, target.first_room, target.second_room,
                            target.second_transfer, target.compost_date, target.notes, target.active])
        .then((result) => {
            res.sendStatus(201);
            console.log(`added to growing_room `);

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