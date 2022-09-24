const router = require("express").Router();
const pool = require("../db/index");

//Get all khmpabeds
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM khmpabeds"
        );
        res.status(200).json({
            status: "success",
            resultCount: result.rowCount,
            data: {
                khmpabeds: result.rows
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Get a khmpabed
router.get("/:scout_id", async (req, res) => {
    const id = req.params.scout_id;
    try {
        const result = await pool.query(
            "SELECT * FROM khmpabeds WHERE scout_id = $1",
            [id]
        );
        res.status(200).json({
            status: "success",
            data: {
                khmpabed: result.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Create a khmpabed
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, gark, astijan, bashdon, khoump, cell } = req.body;

        //Check if Khmpabed exists
        const khmpabed = await pool.query(
            "SELECT * FROM khmpabeds WHERE first_name = $1 AND last_name = $2",
            [firstName, lastName]
        );
        if (khmpabed.rows.length !== 0) {
            console.log("Khmpabed already exists.");
            return res.status(401).send("Khmpabed already exists.");
        }
        //End check

        const results = await pool.query(
            "INSERT INTO khmpabeds (first_name, last_name, gark, astijan, bashdon, khoump, cell) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [firstName, lastName, gark, astijan, bashdon, khoump, cell]
        );
        res.status(201).json({
            status: "success",
            data: {
                newKhmpabed: results.rows[0]
            }
        });

    } catch (err) {
        console.error(err.message);
    }
})

//Update a khmpabed
router.put("/:scout_id", async (req, res) => {
    const id = req.params.scout_id;
    try {
        const { firstName, lastName, gark, astijan, bashdon, khoump, cell } = req.body;
        const result = await pool.query(
            "UPDATE khmpabeds SET first_name = $1, last_name = $2, gark = $3, astijan = $4, bashdon = $5, khoump = $6, cell = $7 WHERE scout_id = $8 RETURNING *",
            [firstName, lastName, gark, astijan, bashdon, khoump, cell, id]
        );
        res.status(200).json({
            status: "success",
            data: {
                khmpabed: result.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a khmpabed
router.delete("/:scout_id", async (req, res) => {
    const id = req.params.scout_id;
    try {
        const results = await pool.query(
            "DELETE FROM khmpabeds WHERE scout_id = $1",
            [id]
        );

        res.status(204).json({
            status: "success"
        });

    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;