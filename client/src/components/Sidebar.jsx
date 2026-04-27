import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
    LayoutDashboard, 
    Star, 
    LogOut, 
    Moon, 
    Sun, 
    Plus,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeFilter, setActiveFilter, onAddClick }) => {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close drawer on route/filter change
    useEffect(() => {
        setMobileOpen(false);
    }, [activeFilter]);

    // Lock body scroll when drawer is open on mobile
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const menuItems = [
        { id: 'all', icon: LayoutDashboard, label: 'All Notes' },
        { id: 'important', icon: Star, label: 'Important' },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        N
                    </div>
                    <span className="text-xl font-bold tracking-tight">NotesApp</span>
                    {/* Close button on mobile */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="ml-auto lg:hidden p-1 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <button 
                    onClick={() => { onAddClick(); setMobileOpen(false); }}
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

            <div className="p-6 space-y-4 border-t border-slate-200 dark:border-slate-800">
                <button 
                    onClick={toggleDarkMode}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
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
        </div>
    );

    return (
        <>
            {/* ── Desktop Sidebar (lg+) ── */}
            <aside className="hidden lg:flex w-64 h-screen bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col fixed left-0 top-0 z-20">
                <SidebarContent />
            </aside>

            {/* ── Mobile Hamburger Button ── */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-30 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                aria-label="Open menu"
            >
                <Menu size={22} />
            </button>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
                        />
                        {/* Drawer panel */}
                        <motion.aside
                            key="drawer"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                            className="lg:hidden fixed left-0 top-0 h-full w-72 z-50 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
