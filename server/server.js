require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //access req.body

//ROUTES

//login routes
app.use("/auth", require("./AuthRoutes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./AuthRoutes/dashboard"));

//get all users
app.get("/api/v1/users", async (req, res) => {
    try {
        const results = await db.query("SELECT user_id, user_name, user_email FROM users");
        res.status(200).json({
            status: "success",
            resultCount: results.rowCount,
            data: {
                users: results.rows,
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})

//delete a user
app.delete("/api/v1/users/:user_id", async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM users WHERE user_id=$1",
            [req.params.user_id]
        );
        res.status(204).json({
            status: "success"
        });

    } catch (err) {
        console.error(err.message);
    }
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})