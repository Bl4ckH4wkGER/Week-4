const { Router, query } = require("express");
const bcrypt = require('bcrypt');
const router = Router();

const userDAO = require('../daos/user');

//Middleware to look up token , only causing more errors at this point
// router.use( async (req, res, next) => {
//     const { email, password, token } = req.body;
//     const user = await userDAO.getUser(email);
//     const storedToken = await userDAO.getStoredToken(user._id);
//     if (token === storedToken) {
//         res.json(storedToken);
//         next()
//     } else {
//         next()
//     }
// });

// Login: POST /login
router.post("/", async (req, res, next) => {
    const {email, password} = req.body;
    const user = await userDAO.getUser(email)
    if (!user) {
        res.status(401).send('User does not exist')
    } else {
        if (!password){
            res.status(400).send('Must provide a password.');
        } else {
            const storedPassword = await userDAO.getStoredPassword(email);
            const doesPasswordMatch = await bcrypt.compare(password, storedPassword);
            if(!doesPasswordMatch){
                res.status(401).send('Wrong password!');
            } else {
                try{
                    const userToken = await userDAO.getUserToken(email);
                    res.json(userToken)
                } catch (e) {
                    next(e)
                }
            }
        }
    }
});

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

// Change Password POST /login/password
router.post("/password", async (req, res, next) => {
    const {email, password, token} = req.body;
    const user = await userDAO.getUser(email)
    if (!user) {
        res.status(401).send('User does not exist')
    } else {
        try {
            const { token } = req.headers.authorization;
            const userId = await userDAO.getUserIdByToken(token);
            if(userId){
                const updatedUser = await userDAO.updatePassword(userId, password);
                res.json(updatedUser)
            } else {
                res.status(401).send('No user associated with this token.')
            }
        } catch (e) {
            next(e);
        }
    }
});

// Logout: POST /login/logout
//  

// Middleware for error handling
router.use(function (error, req, res, next) {
    if (error.message.includes("duplicate key")){
        res.status(409).send('There is an existing account for this email.')
    }
    else if (error.message.includes("not authorized")){
        res.status(401).send('Bad login credentials.')
    }
    else {
        res.status(500).send('Something broke! Our fault :(')
    } 
});

module.exports = router;