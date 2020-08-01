const { Router, query } = require("express");
const router = Router();

const noteDAO = require('../daos/note');
const tokenDAO = require('../daos/token');

// Middleware for authentication
router.use(function (req, res, next) {
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
}
);

// Create: POST /notes
router.post("/", async (req, res, next) => {
    const userId = await tokenDAO.getUserIdFromToken(req.token);
    const { text }  = req.body
    if (!userId) {
        res.sendStatus(401)
    } else{
        try {
            const newNote = await noteDAO.createNote(userId, text)
            res.json(newNote);
        } catch (e) {
            res.status(400).send(e.message);  
        }
    }
});

// Get all of my notes: GET /notes
router.get("/", async (req, res, next) => {
    const userId = await tokenDAO.getUserIdFromToken(req.token);
    if (!userId) {
        res.sendStatus(401)
    } else{
        try {
            const notes = await noteDAO.getUserNotes(userId);
            res.json(notes);
        } catch (e) {
            res.status(404).send(e.message);  
        }
    }
});

// Get a single note: GET /notes/:id
router.get("/:id", async (req, res, next) => {
    const { noteId } = req.params.id;
    const userId = await tokenDAO.getUserIdFromToken(req.token);
    if (!userId) {
        res.sendStatus(401)
    } else{
        try {
            const userNote = await noteDAO.getNote(userId, noteId);
            res.json(userNote);
        } catch (e) {
            res.status(400).send(e.message);  
        }
    }
});

module.exports = router;