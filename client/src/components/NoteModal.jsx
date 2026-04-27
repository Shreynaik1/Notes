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

    // Lock body scroll while open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        onSave({ title, description, isPinned, isImportant });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Panel — bottom-sheet on mobile, centered card on sm+ */}
                <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                    className="relative w-full sm:max-w-2xl bg-white dark:bg-slate-900 
                                rounded-t-3xl sm:rounded-3xl shadow-2xl 
                                border border-slate-200 dark:border-slate-800
                                flex flex-col max-h-[92dvh] sm:max-h-[85vh]"
                >
                    {/* Drag handle — mobile only */}
                    <div className="flex justify-center pt-3 pb-1 sm:hidden">
                        <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
                        <h2 className="text-xl font-bold">
                            {initialData ? 'Edit Note' : 'Create New Note'}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
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
                                className="w-full min-h-[200px] sm:min-h-[280px] text-base sm:text-lg bg-transparent border-none outline-none focus:ring-0 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700 leading-relaxed"
                            />
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 gap-3">
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    type="button"
                                    onClick={() => setIsPinned(!isPinned)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-sm font-medium ${isPinned ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <Pin size={18} fill={isPinned ? 'currentColor' : 'none'} />
                                    <span className="hidden xs:inline">Pin</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsImportant(!isImportant)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-sm font-medium ${isImportant ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-500' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <Star size={18} fill={isImportant ? 'currentColor' : 'none'} />
                                    <span className="hidden xs:inline">Important</span>
                                </button>
                            </div>
                            <button 
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all text-sm sm:text-base flex-shrink-0"
                            >
                                <Save size={18} />
                                Save
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default NoteModal;
