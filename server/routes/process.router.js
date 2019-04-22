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