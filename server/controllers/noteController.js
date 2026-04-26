const Note = require('../models/Note');

exports.createNote = async (req, res) => {
    try {
        const { title, description, isPinned, isImportant, tags, color } = req.body;
        const note = new Note({
            title,
            description,
            userId: req.user,
            isPinned,
            isImportant,
            tags,
            color
        });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user }).sort({ isPinned: -1, updatedAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { title, description, isPinned, isImportant, tags, color } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user },
            { title, description, isPinned, isImportant, tags, color },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchNotes = async (req, res) => {
    try {
        const { query } = req.query;
        const notes = await Note.find({
            userId: req.user,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).sort({ updatedAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.togglePin = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        
        note.isPinned = !note.isPinned;
        await note.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.toggleImportant = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        
        note.isImportant = !note.isImportant;
        await note.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
