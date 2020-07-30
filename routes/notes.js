const { Router, query } = require("express");
const router = Router();

const noteDAO = require('../daos/note');

// Middleware for authentication

// Create: POST /notes
router.post("/notes/", async (req, res, next) => {
});

// Get all of my notes: GET /notes
router.get("/notes/", async (req, res, next) => {
});

// Get a single note: GET /notes/:id
router.get("/notes/:id", async (req, res, next) => {
});

// Middleware for error handling


module.exports = router;