import React, { useState } from 'react';
import { Tag as TagIcon, Plus, FileText, Upload, Briefcase } from 'lucide-react';
import { useData } from '../context/DataContext';

export const TagsPage = () => {
  const { tags, addTag, notes, documents, openQuickAdd } = useData();
  const [selectedTag, setSelectedTag] = useState(null);

  const activeTagName = selectedTag || (tags[0] ? tags[0].name : '');

  const taggedNotes = notes.filter(n => n.tags.includes(activeTagName));
  const taggedDocs = documents.filter(d => d.tags.includes(activeTagName));

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
            <TagIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Tags & Labels Hub
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter across notes, documents, and records using custom tags
            </p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('tag')}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Tag</span>
        </button>
      </div>

      {/* Tags Badges Row */}
      <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
        {tags.map(t => {
          const isActive = t.name === activeTagName;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTag(t.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }}></span>
              <span>#{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content under Active Tag */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <span>Items tagged with</span>
          <span className="text-indigo-600 dark:text-indigo-400">#{activeTagName}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Tagged Notes */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-500" />
              Notes ({taggedNotes.length})
            </h3>
            {taggedNotes.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No notes tagged with #{activeTagName}</p>
            ) : (
              taggedNotes.map(n => (
                <div key={n.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{n.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Tagged Documents */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-sky-500" />
              Documents ({taggedDocs.length})
            </h3>
            {taggedDocs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No documents tagged with #{activeTagName}</p>
            ) : (
              taggedDocs.map(d => (
                <div key={d.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{d.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{d.fileName}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-sky-500 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full">
                    {d.category}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
