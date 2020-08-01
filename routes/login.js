const { Router, query } = require("express");
const bcrypt = require('bcrypt');
const router = Router();

const userDAO = require('../daos/user');
const tokenDAO = require('../daos/token');
const token = require("../models/token");

// Signup: POST /login/signup
router.post("/signup", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || password === ""){
        res.status(400).send('Email and password are required.')
    } else {
        try {
            const newUser = await userDAO.signup(email, password);
            res.json(newUser);
        } catch(e) {
            next(e);
        }
    }
});

// Login: POST /login
router.post("/", async (req, res, next) => {
    const {email, password} = req.body;
    const user = await userDAO.getUser(email)
    if (!user) {
        res.status(401).send('User does not exist')
    } else {
        if (!password || password === ""){
            res.status(400).send('Must provide a password.');
        } else {
            const user = await userDAO.getUser(email);
            const doesPasswordMatch = await bcrypt.compare(password, user.password);
            if (!doesPasswordMatch) {
                res.status(401).send('Wrong password!');
            } else {
                try {
                    const userToken = await userDAO.assignUserToken(user._id)
                    res.json(userToken)
                } catch (e) {
                    next(e);
                }
            }
        }
    }
});

// Change Password POST /login/password
router.post("/password", 
    function (req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            if (bearerToken) {
                next()
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        } 
    },
    async (req, res, next) => {
        const userId = await tokenDAO.getUserIdFromToken(req.token);
        if (!userId) {
            res.status(401).send('Not a valid token.')
        } else {
            const { password } = req.body;
            if (!password || password === ""){
                res.status(400).send('Must provide a password.');
            } else {
                try {
                    const updatedUser = await userDAO.updateUserPassword(userId, password);
                    res.json(updatedUser)
                } catch (e) {
                    res.status(401);
                }
            }
        }
    }
);

// Logout: POST /login/logout
router.post("/password",
    function (req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            if (bearerToken) {
                next()
            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(401);
        } 
    },
    async (req, res, next) => {
        const userToken = req.token;
        const tokenDeleted = await tokenDAO.removeToken(userToken);
        if (tokenDeleted == true){
            res.status(200).send('Token deleted.')
        } else {
            res.status(401).send('No user found for token.')
        }
    }
);

// Middleware for error handling
router.use(function (error, req, res, next) {
    if (error.message.includes("duplicate key")){
        res.status(409).send('There is an existing account for this email.')
    }
    // else if (error.message.includes("not authorized")){
    //     res.status(401).send('Bad login credentials.')
    // }
    else {
        res.status(500).send('Something broke! Our fault :(')
    } 
});

module.exports = router;