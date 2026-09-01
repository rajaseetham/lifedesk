import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Plus, Trash2, Tag, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export const CalendarPage = () => {
  const { events, toggleEventComplete, deleteEvent, openQuickAdd } = useData();
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Career', 'Learning', 'Finance', 'Personal', 'Important Dates'];

  const filteredEvents = events.filter(e => {
    return filterCategory === 'All' ? true : e.category === filterCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Important Dates & Reminders
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Interviews, exams, bill due dates, birthdays, and certificate renewals
            </p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('event')}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event / Reminder</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-slate-400 glass-card rounded-2xl">
            <CalendarIcon className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-xs font-medium">No events scheduled under this filter.</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <div 
              key={event.id}
              className={`glass-card rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                event.isCompleted ? 'opacity-60 bg-slate-50/50 dark:bg-slate-900/40' : ''
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <button
                  onClick={() => toggleEventComplete(event.id)}
                  title={event.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
                  className={`p-2 rounded-xl shrink-0 transition-colors ${
                    event.isCompleted 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600' 
                      : 'bg-amber-50 dark:bg-amber-950 text-amber-600 hover:bg-amber-100'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-sm text-slate-900 dark:text-white ${event.isCompleted ? 'line-through' : ''}`}>
                      {event.title}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {event.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{new Date(event.startTime).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    {event.location && <span className="text-slate-400">• {event.location}</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                  event.isCompleted 
                    ? 'bg-slate-200 text-slate-600' 
                    : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'
                }`}>
                  {event.isCompleted ? 'Completed' : 'Upcoming'}
                </span>

                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
