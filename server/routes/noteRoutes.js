const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');

router.use(auth); // All note routes are protected

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/search', noteController.searchNotes);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.patch('/:id/pin', noteController.togglePin);
router.patch('/:id/important', noteController.toggleImportant);

module.exports = router;
