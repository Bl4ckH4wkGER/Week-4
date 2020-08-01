const { Router, query } = require("express");
const router = Router();

const noteDAO = require('../daos/note');

// Middleware for authentication
// make sure that user has working token
router.use(function (req, res, next) {
    const { token } = req.headers.authorization;
    if (token) {
        next()
    } else {
        res.status(401).send('Requires authorization token.')
    }   
})

// Create: POST /notes
router.post("/", async (req, res, next) => {
    const { text } = req.body;
    const { token } = req.headers.authorization;
    const userId = await userDAO.getUserIdByToken(token);
    try{
        const newNote = await noteDAO.create(text, userId);
        res.json(newNote)
    } catch (e) {
        throw e;
    }
});

// Get all of my notes: GET /notes
router.get("/", async (req, res, next) => {
    const { token } = req.headers.authorization;
    const userId = await userDAO.getUserIdByToken(token);
    try{
        const userNotes = await noteDAO.getAllNotesForUser(userId);
        res.json(userNotes)
    } catch (e) {
        throw e;
    }
});

// Get a single note: GET /notes/:id
router.get("/:id", async (req, res, next) => {
    const note = await noteDAO.getNoteById(req.params.id);
    if (note) {
        res.json(note);
    } else {
        res.sendStatus(404);
    }
});

// Middleware for error handling


module.exports = router;