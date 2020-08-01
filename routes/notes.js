const { Router, query } = require("express");
const router = Router();

const noteDAO = require('../daos/note');

// Middleware for authentication
// make sure that user has working token
// router.use(function (req, res, next) {
//     const { userId, token } = req.params;
//     const storedToken = await noteDAO.getStoredToken

//     if (!token) {
//         res.status(401).send("No or bad token - not authorized");
//     } else
//         next();
//     } 
// });

// Create: POST /notes
// router.post("/", async (req, res, next) => {
// });

// Get all of my notes: GET /notes
// router.get("/", async (req, res, next) => {
// });

// Get a single note: GET /notes/:id
// router.get("/:id", async (req, res, next) => {
// });

// Middleware for error handling


module.exports = router;