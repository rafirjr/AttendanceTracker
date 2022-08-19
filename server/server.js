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

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})