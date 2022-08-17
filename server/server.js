require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = requre("./db");

const morgan = require("morgan");

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //access req.body

//ROUTES

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})