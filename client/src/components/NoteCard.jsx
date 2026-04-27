import React from 'react';
import { motion } from 'framer-motion';
import { Pin, Star, Trash2, Edit3, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

const NoteCard = ({ note, onEdit, onDelete, onPin, onImportant }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`group relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary-500/30 transition-all cursor-default ${note.isPinned ? 'ring-2 ring-primary-500/20' : ''}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {note.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                        {note.updatedAt ? format(new Date(note.updatedAt), 'MMM dd, yyyy') : 'Just now'}
                    </p>
                </div>
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => onPin(note._id)}
                        className={`p-2 rounded-lg transition-colors ${note.isPinned ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <Pin size={16} fill={note.isPinned ? 'currentColor' : 'none'} />
                    </button>
                    <button 
                        onClick={() => onImportant(note._id)}
                        className={`p-2 rounded-lg transition-colors ${note.isImportant ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <Star size={16} fill={note.isImportant ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-4 mb-6 leading-relaxed">
                {note.description}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {note.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold uppercase rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => onEdit(note)}
                        className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                    >
                        <Edit3 size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete(note._id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {note.isPinned && (
                <div className="absolute -top-2 -right-2 bg-primary-600 text-white p-1 rounded-full shadow-lg">
                    <Pin size={12} fill="currentColor" />
                </div>
            )}
        </motion.div>
    );
};

export default NoteCard;
