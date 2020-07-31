const { Router, query } = require("express");
const router = Router();

const noteDAO = require('../daos/note');

// Middleware for authentication
// MUST USE

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