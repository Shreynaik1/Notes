import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { Search, Loader2, Plus, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('/api/notes');
            setNotes(res.data);
        } catch (err) {
            toast.error('Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            fetchNotes();
            return;
        }
        try {
            const res = await axios.get(`/api/notes/search?query=${query}`);
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (editingNote) {
                const res = await axios.put(`/api/notes/${editingNote._id}`, noteData);
                setNotes(notes.map(n => n._id === editingNote._id ? res.data : n));
                toast.success('Note updated');
            } else {
                const res = await axios.post('/api/notes', noteData);
                setNotes([res.data, ...notes]);
                toast.success('Note created');
            }
            setIsModalOpen(false);
            setEditingNote(null);
        } catch (err) {
            toast.error('Failed to save note');
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await axios.delete(`/api/notes/${id}`);
            setNotes(notes.filter(n => n._id !== id));
            toast.success('Note deleted');
        } catch (err) {
            toast.error('Failed to delete note');
        }
    };

    const handleTogglePin = async (id) => {
        try {
            const res = await axios.patch(`/api/notes/${id}/pin`);
            setNotes(notes.map(n => n._id === id ? res.data : n));
        } catch (err) {
            toast.error('Error toggling pin');
        }
    };

    const handleToggleImportant = async (id) => {
        try {
            const res = await axios.patch(`/api/notes/${id}/important`);
            setNotes(notes.map(n => n._id === id ? res.data : n));
        } catch (err) {
            toast.error('Error toggling importance');
        }
    };

    const filteredNotes = notes.filter(note => {
        if (activeFilter === 'important') return note.isImportant;
        return true;
    });

    const pinnedNotes = filteredNotes.filter(n => n.isPinned);
    const regularNotes = filteredNotes.filter(n => !n.isPinned);

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar 
                activeFilter={activeFilter} 
                setActiveFilter={setActiveFilter} 
                onAddClick={() => {
                    setEditingNote(null);
                    setIsModalOpen(true);
                }}
            />

            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-2">
                                {activeFilter === 'all' ? 'My Notes' : 'Important Notes'}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
                            </p>
                        </div>

                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search notes..."
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none shadow-sm transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="h-64 flex items-center justify-center">
                            <Loader2 className="animate-spin text-primary-600" size={40} />
                        </div>
                    ) : notes.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="h-96 flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800"
                        >
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                <Inbox className="text-slate-300 dark:text-slate-600" size={40} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">No notes yet</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                                Start capturing your thoughts and ideas. Click the button below to create your first note.
                            </p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 transition-all"
                            >
                                <Plus size={20} />
                                Create New Note
                            </button>
                        </motion.div>
                    ) : (
                        <div className="space-y-12">
                            {pinnedNotes.length > 0 && (
                                <div>
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                        <Plus size={14} className="rotate-45" /> Pinned
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <AnimatePresence>
                                            {pinnedNotes.map(note => (
                                                <NoteCard 
                                                    key={note._id}
                                                    note={note}
                                                    onEdit={(note) => {
                                                        setEditingNote(note);
                                                        setIsModalOpen(true);
                                                    }}
                                                    onDelete={handleDeleteNote}
                                                    onPin={handleTogglePin}
                                                    onImportant={handleToggleImportant}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}

                            <div>
                                {pinnedNotes.length > 0 && (
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                        <Plus size={14} className="rotate-45" /> Recent
                                    </h2>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <AnimatePresence>
                                        {regularNotes.map(note => (
                                            <NoteCard 
                                                key={note._id}
                                                note={note}
                                                onEdit={(note) => {
                                                    setEditingNote(note);
                                                    setIsModalOpen(true);
                                                }}
                                                onDelete={handleDeleteNote}
                                                onPin={handleTogglePin}
                                                onImportant={handleToggleImportant}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <NoteModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingNote(null);
                }}
                onSave={handleSaveNote}
                initialData={editingNote}
            />
        </div>
    );
};

export default Dashboard;
