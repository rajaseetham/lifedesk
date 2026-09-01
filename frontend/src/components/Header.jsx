import React, { useState } from 'react';
import { Search, Plus, Sun, Moon, Bell, Menu, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { NotificationDrawer } from './NotificationDrawer';

export const Header = ({ setIsMobileOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { openQuickAdd, setIsSearchOpen, events, documents } = useData();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Compute pending notification alerts (expiries & upcoming events)
  const pendingAlerts = [
    ...documents.filter(d => d.expiryDate && new Date(d.expiryDate) > new Date()).map(d => ({
      id: d.id,
      title: `${d.title} Expiry Warning`,
      subtitle: `Expires on ${d.expiryDate}`,
      type: 'warning'
    })),
    ...events.filter(e => !e.isCompleted).map(e => ({
      id: e.id,
      title: e.title,
      subtitle: new Date(e.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      type: 'event'
    }))
  ];

  const todayString = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Mobile Toggle & Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-sm lg:text-base">
              Good day, {user?.fullName || 'Rajaseetha'} 👋
            </h2>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Shield className="w-2.5 h-2.5 mr-1" /> Private Vault
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
            Today is {todayString}
          </p>
        </div>
      </div>

      {/* Center Search Trigger Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 dark:text-slate-400 rounded-xl text-xs transition-colors border border-transparent hover:border-indigo-500/30"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search notes, documents, applications, tags...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg md:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {pendingAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <NotificationDrawer 
              alerts={pendingAlerts} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
          )}
        </div>

        {/* Quick Add Header Button */}
        <button
          onClick={() => openQuickAdd('note')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </header>
  );
};
