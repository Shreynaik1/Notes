import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
    LayoutDashboard, 
    Star, 
    Trash2, 
    LogOut, 
    Moon, 
    Sun, 
    Search, 
    Plus,
    Hash
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeFilter, setActiveFilter, onAddClick }) => {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();

    const menuItems = [
        { id: 'all', icon: LayoutDashboard, label: 'All Notes' },
        { id: 'important', icon: Star, label: 'Important' },
        // { id: 'tags', icon: Hash, label: 'Tags' },
        // { id: 'trash', icon: Trash2, label: 'Trash' },
    ];

    return (
        <aside className="w-64 h-screen bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 z-20">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
                        N
                    </div>
                    <span className="text-xl font-bold tracking-tight">NotesApp</span>
                </div>

                <button 
                    onClick={onAddClick}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center gap-2 mb-8"
                >
                    <Plus size={20} />
                    New Note
                </button>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveFilter(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeFilter === item.id 
                                ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm border border-slate-200 dark:border-slate-700' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
                <button 
                    onClick={toggleDarkMode}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                            {user?.name?.[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{user?.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
