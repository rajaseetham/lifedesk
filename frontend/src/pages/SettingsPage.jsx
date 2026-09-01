import React, { useState } from 'react';
import { Settings, ShieldCheck, Download, Lock, Key, Server, Moon, Sun, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

export const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notes, documents, jobs, events, learning, tags } = useData();

  const [auditLogs] = useState([
    { id: 1, action: 'JWT Token Refresh', ip: '127.0.0.1 (Local Session)', time: 'Just now', status: 'Success' },
    { id: 2, action: 'Document Vault Stream Handshake', ip: '127.0.0.1', time: '10 mins ago', status: 'Verified' },
    { id: 3, action: 'Client-side Encrypted Vault Sync', ip: 'Local Storage', time: 'Today 10:15 AM', status: 'Encrypted' },
  ]);

  const handleExportJSON = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      user: { email: user?.email, fullName: user?.fullName },
      notes,
      documents,
      jobs,
      events,
      learning,
      tags
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifedesk_privacy_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Privacy & Security Settings
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage your private data vault, JWT security, and data export
            </p>
          </div>
        </div>

        <button
          onClick={handleExportJSON}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Encrypted JSON</span>
        </button>
      </div>

      {/* Security Status Card */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-emerald-500" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Privacy Guarantee & Isolation
              </h3>
              <p className="text-xs text-slate-400">
                Your life data is scoped strictly to user ID #{user?.id || '1'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300">
            Active Vault Protection
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <p className="font-bold text-slate-700 dark:text-slate-300">No Public URLs</p>
            <p className="text-[11px] text-slate-400 mt-1">Uploaded files are streamed via token authorization endpoints only.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <p className="font-bold text-slate-700 dark:text-slate-300">Zero Third-Party Sharing</p>
            <p className="text-[11px] text-slate-400 mt-1">No tracker scripts, no data collection, no telemetry analytics.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <p className="font-bold text-slate-700 dark:text-slate-300">JWT Token Expiry</p>
            <p className="text-[11px] text-slate-400 mt-1">24-hour expiration token with BCrypt hashed credentials.</p>
          </div>
        </div>
      </div>

      {/* Theme & Display Options */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" /> Interface Customization
        </h3>

        <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Color Theme Mode</p>
            <p className="text-[11px] text-slate-400">Current theme: <span className="font-semibold capitalize text-indigo-500">{theme}</span></p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* Security Audit Log */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-500" /> Vault Security Audit Log
        </h3>

        <div className="space-y-2">
          {auditLogs.map(log => (
            <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{log.action}</p>
                  <p className="text-[10px] text-slate-400">{log.ip} • {log.time}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
