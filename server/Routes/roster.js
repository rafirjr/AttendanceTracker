const router = require("express").Router();
const pool = require("../db/index");

//Get all scouts
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM roster`
        );
        res.status(200).json({
            status: "success",
            resultCount: result.rowCount,
            data: {
                scouts: result.rows
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Get a scout
router.get("/:scout_id", async (req, res) => {
    const id = req.params.scout_id;
    try {
        const result = await pool.query(
            "SELECT * FROM roster WHERE scout_id = $1",
            [id]
        );
        if(result.rows !== 1) {
            console.log("Scout not found.");
        }
        res.status(200).json({
            status: "success",
            data: {
                scout: result.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Create a scout
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, khoump, gark, dob, street, city, state, zip, contact_num,
                parent_name_one, parent_cell_one, parent_email_one, parent_name_two, parent_cell_two,
                parent_email_two, allergies } = req.body;

        //Check if scout exists
        const scout = await pool.query(
            "SELECT * FROM roster WHERE first_name = $1 AND last_name = $2",
            [firstName, lastName]
        );
        if (scout.rows.length !== 0) {
            console.log("Scout already exists.");
            return res.status(401).send("Scout already exists.");
        }
        //End check
        
        const results = await pool.query(
            `INSERT INTO roster (first_name, last_name, khoump, gark, date_of_birth, street, city, state, zip_code, 
                contact_number, parent_name_one, parent_cell_one, parent_email_one, parent_name_two,
                parent_cell_two, parent_email_two, allergies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
            [firstName, lastName, khoump, gark, dob, street, city, state, zip, contact_num,
                parent_name_one, parent_cell_one, parent_email_one, parent_name_two, parent_cell_two,
                parent_email_two, allergies]
        );
        res.status(201).json({
            status: "success",
            data: {
                newScout: results.rows[0]
            }
        });

    } catch (err) {
        console.error(err.message);
    }
})

//Update a scout
router.put("/:scout_id", async (req, res) => {
    const id = req.params.scout_id;
    try {
        const { firstName, lastName, khoump, gark, dob, street, city, state, zip, contact_num,
            parent_name_one, parent_cell_one, parent_email_one, parent_name_two, parent_cell_two,
            parent_email_two, allergies } = req.body;
        const result = await pool.query(
            `UPDATE roster SET first_name = $1, last_name = $2, khoump = $3, gark = $4,
            date_of_birth = $5, street = $6, city = $7, state = $8, zip_code = $9, 
            contact_number = $10, parent_name_one = $11, parent_cell_one = $12, parent_email_one = $13, 
            parent_name_two = $14, parent_cell_two = $15, parent_email_two = $16, allergies = $17 
            WHERE scout_id = $18 RETURNING *`,
            [firstName, lastName, khoump, gark, dob, street, city, state, zip, contact_num,
                parent_name_one, parent_cell_one, parent_email_one, parent_name_two, parent_cell_two,
                parent_email_two, allergies, id]
        );
        res.status(200).json({
            status: "success",
            data: {
                scout: result.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a scout
router.delete("/:scout_id", async (req, res) => {
    const id = req.params.scout_id;
    try {
        const results = await pool.query(
            "DELETE FROM roster WHERE scout_id = $1",
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