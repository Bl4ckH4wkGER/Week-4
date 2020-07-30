const { Router, query } = require("express");
const router = Router();

const userDAO = require('../daos/user');

// Middleware

// Login: POST /login
// router.post("/", async (req, res, next) => {
// });

// Signup: POST /login/signup
router.post("/signup", async (req, res, next) => {
    const userData = req.body;
    try {
        const newUser = await userDAO.signup(userData);
        res.json(newUser);
    } catch(e) {
        next(e);
    }
});

// Logout: POST /login/logout
// router.post("/logout", async (req, res, next) => {
// });

// Change Password POST /login/password
// router.post("/password", async (req, res, next) => {
// });

// Middleware for error handling
router.use(function (error, req, res, next) {
    if (error.message.includes("duplicate key error")){
        res.status(409).send('There is an existing account for this email.')
    }
    if (error.message.includes("validation failed")) {
        res.status(400).send('Email and password are required.')
    } else {
    } res.status(500).send('Something broke! Our fault :(')
});

module.exports = router;