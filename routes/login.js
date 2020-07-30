const { Router, query } = require("express");
const router = Router();

const userDAO = require('../daos/user');

// Middleware

// Login: POST /login
router.post("/login", async (req, res, next) => {
    
});

// Signup: POST /login/signup
router.post("/login/signup", async (req, res, next) => {
    const user = req.body; 
    if (!user || JSON.stringify(user) === '{}' ) {
        res.status(400).send('user is required');
    } else {
        try {
            const savedUser = await userDAO.signup(user);
            res.json(savedUser); 
        } catch(e) {
            if (e instanceof userDAO.BadDataError) {
                res.status(400).send(e.message);
            } else {
                res.status(500).send(e.message);
            }
        }
    }
});

// Logout: POST /login/logout
router.post("/login/logout", async (req, res, next) => {
});

// Change Password POST /login/password
router.post("/login/password", async (req, res, next) => {
});

// Middleware for error handling


module.exports = router;