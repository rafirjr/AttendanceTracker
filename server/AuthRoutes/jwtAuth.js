const router = require("express").Router();
const pool = require("../db/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
    try {
        //1. Destructure the req.body (name, email, password)
        const {name, email, password} = req.body;
        
        
        //2. Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email =$1", [email]);
        //res.json(user.rows);

        if(user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }
        //3. Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. Enter new user in database
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );
        //res.json(newUser.rows[0]);

        //5. Generating jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token});


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login route
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. Destructure the req.body
        const {email, password} = req.body;

        //2. Check if user doesn't exist
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email],
        );

        if(user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect.");
        }

        //3. Check if incoming password is the same as database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        };

        //4. Give them jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Verify tokens
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;