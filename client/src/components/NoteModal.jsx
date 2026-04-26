import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Star, Pin } from 'lucide-react';

const NoteModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [isImportant, setIsImportant] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setIsPinned(initialData.isPinned || false);
            setIsImportant(initialData.isImportant || false);
        } else {
            setTitle('');
            setDescription('');
            setIsPinned(false);
            setIsImportant(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        onSave({ title, description, isPinned, isImportant });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                >
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold">
                            {initialData ? 'Edit Note' : 'Create New Note'}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            <input 
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full text-2xl font-bold bg-transparent border-none outline-none focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                autoFocus
                            />
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Start typing your note..."
                                className="w-full min-h-[300px] text-lg bg-transparent border-none outline-none focus:ring-0 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsPinned(!isPinned)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isPinned ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <Pin size={20} fill={isPinned ? 'currentColor' : 'none'} />
                                    <span className="text-sm font-medium">Pin</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsImportant(!isImportant)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isImportant ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-500' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <Star size={20} fill={isImportant ? 'currentColor' : 'none'} />
                                    <span className="text-sm font-medium">Important</span>
                                </button>
                            </div>
                            <button 
                                type="submit"
                                className="flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all"
                            >
                                <Save size={20} />
                                Save Note
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default NoteModal;
