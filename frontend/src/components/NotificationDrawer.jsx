import React from 'react';
import { Bell, AlertTriangle, Calendar, X, ShieldAlert } from 'lucide-react';

export const NotificationDrawer = ({ alerts, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in">
      <div className="p-3.5 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-500" />
          <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Vault Reminders & Expiries
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/40">
        {alerts.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            No active reminders or expiring certificates. All clear!
          </div>
        ) : (
          alerts.map(item => (
            <div key={item.id} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${
                item.type === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
              }`}>
                {item.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 text-center bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700/60">
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          🔒 Private alerts evaluated on client device
        </span>
      </div>
    </div>
  );
};
