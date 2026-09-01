import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Briefcase, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Calendar, 
  FileCode, 
  Tag, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  PlusCircle, 
  Lock,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const { openQuickAdd } = useData();
  const [isLifeExpanded, setIsLifeExpanded] = useState(true);
  const location = useLocation();

  const mainNav = [
    { name: 'Dashboard', path: '/', icon: Home },
  ];

  const lifeCategories = [
    { name: 'Personal', path: '/category/Personal', icon: User, color: 'text-sky-500' },
    { name: 'Career', path: '/category/Career', icon: Briefcase, color: 'text-indigo-500' },
    { name: 'Learning', path: '/category/Learning', icon: BookOpen, color: 'text-emerald-500' },
    { name: 'Finance', path: '/category/Finance', icon: DollarSign, color: 'text-amber-500' },
    { name: 'Documents', path: '/documents', icon: FileText, color: 'text-rose-500' },
  ];

  const secondaryNav = [
    { name: 'Calendar & Dates', path: '/calendar', icon: Calendar },
    { name: 'Notes Vault', path: '/notes', icon: FileCode },
    { name: 'Job Tracker', path: '/jobs', icon: Briefcase },
    { name: 'Learning Hub', path: '/learning', icon: BookOpen },
    { name: 'Tags Manager', path: '/tags', icon: Tag },
    { name: 'Privacy & Settings', path: '/settings', icon: Settings },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
    }`;

  const categoryClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
    }`;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80
        flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Logo */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                Life<span className="text-indigo-600 dark:text-indigo-400">Desk</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
                Privacy First
              </span>
            </div>
          </div>
        </div>

        {/* Quick Add Button */}
        <div className="p-3">
          <button
            onClick={() => {
              openQuickAdd('note');
              if (isMobileOpen) setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-sm font-medium shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Capture Anything</span>
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {/* Main Dashboard */}
          <nav className="space-y-1">
            {mainNav.map(item => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={linkClass}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Categories Accordion */}
          <div>
            <button
              onClick={() => setIsLifeExpanded(!isLifeExpanded)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <span>📂 My Life</span>
              {isLifeExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {isLifeExpanded && (
              <div className="mt-1 ml-2 space-y-0.5 border-l-2 border-slate-100 dark:border-slate-800 pl-2">
                {lifeCategories.map(cat => (
                  <NavLink
                    key={cat.path}
                    to={cat.path}
                    className={categoryClass(cat.path)}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div className="flex items-center gap-2.5">
                      <cat.icon className={`w-3.5 h-3.5 ${cat.color}`} />
                      <span>{cat.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Secondary Modules */}
          <div>
            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Modules & Tools
            </div>
            <nav className="mt-1 space-y-1">
              {secondaryNav.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={linkClass}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Security & User Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-2 px-2 py-1 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-[11px] text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-100 dark:border-indigo-900/50">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-indigo-500" />
              Client Vault Encrypted
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="flex items-center justify-between p-1.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                {user?.fullName ? user.fullName[0] : 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                  {user?.email || 'user@lifedesk.local'}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
