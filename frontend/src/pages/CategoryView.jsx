import React from 'react';
import { useParams } from 'react-router-dom';
import { User, Briefcase, BookOpen, DollarSign, FileText, Calendar, PlusCircle, File, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';

export const CategoryView = () => {
  const { categoryName } = useParams();
  const { notes, documents, jobs, events, learning, openQuickAdd } = useData();

  const categoryIcons = {
    Personal: { icon: User, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/60' },
    Career: { icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/60' },
    Learning: { icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/60' },
    Finance: { icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/60' },
    Documents: { icon: FileText, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/60' },
  };

  const currentCategory = categoryName || 'Personal';
  const meta = categoryIcons[currentCategory] || categoryIcons.Personal;
  const CategoryIcon = meta.icon;

  // Filtered collections
  const catNotes = notes.filter(n => n.category.toLowerCase() === currentCategory.toLowerCase());
  const catDocs = documents.filter(d => d.category.toLowerCase() === currentCategory.toLowerCase());
  const catEvents = events.filter(e => e.category.toLowerCase() === currentCategory.toLowerCase());
  const catJobs = currentCategory === 'Career' ? jobs : [];
  const catLearning = currentCategory === 'Learning' ? learning : [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Category Header */}
      <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl ${meta.bg} ${meta.color} flex items-center justify-center font-bold`}>
            <CategoryIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
              {currentCategory} Hub
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              All stored information, notes, files, and events under {currentCategory}
            </p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('note')}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add to {currentCategory}</span>
        </button>
      </div>

      {/* Grid of Collections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Notes under this category */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              {currentCategory} Notes ({catNotes.length})
            </h3>
          </div>
          {catNotes.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No notes under {currentCategory} yet.</p>
          ) : (
            <div className="space-y-2">
              {catNotes.map(n => (
                <div key={n.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{n.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Documents under this category */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <File className="w-4 h-4 text-sky-500" />
              {currentCategory} Documents ({catDocs.length})
            </h3>
          </div>
          {catDocs.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No documents uploaded under {currentCategory} yet.</p>
          ) : (
            <div className="space-y-2">
              {catDocs.map(d => (
                <div key={d.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{d.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{d.fileName}</p>
                  </div>
                  {d.expiryDate && (
                    <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                      Expires: {d.expiryDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Events under this category */}
        <div className="glass-card rounded-2xl p-5 space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              {currentCategory} Important Dates & Events ({catEvents.length})
            </h3>
          </div>
          {catEvents.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No events or deadlines under {currentCategory}.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {catEvents.map(e => (
                <div key={e.id} className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{e.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{new Date(e.startTime).toLocaleString()}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full">
                    {e.location || 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
