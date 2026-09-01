import React, { useState, useEffect } from 'react';
import { Search, X, FileText, File, Briefcase, Calendar, BookOpen, Tag, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const { notes, documents, jobs, events, learning, tags } = useData();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal handled via context in App
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search aggregations
  const matchedNotes = query ? notes.filter(n => 
    n.title.toLowerCase().includes(q) || 
    n.content.toLowerCase().includes(q) || 
    n.tags.some(t => t.toLowerCase().includes(q))
  ) : [];

  const matchedDocs = query ? documents.filter(d => 
    d.title.toLowerCase().includes(q) || 
    d.fileName.toLowerCase().includes(q) || 
    d.description?.toLowerCase().includes(q) ||
    d.tags.some(t => t.toLowerCase().includes(q))
  ) : [];

  const matchedJobs = query ? jobs.filter(j => 
    j.company.toLowerCase().includes(q) || 
    j.role.toLowerCase().includes(q) || 
    j.notes?.toLowerCase().includes(q)
  ) : [];

  const matchedEvents = query ? events.filter(e => 
    e.title.toLowerCase().includes(q) || 
    e.notes?.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q)
  ) : [];

  const matchedLearning = query ? learning.filter(l => 
    l.title.toLowerCase().includes(q) || 
    l.topics.some(t => t.name.toLowerCase().includes(q))
  ) : [];

  const matchedTags = query ? tags.filter(t => 
    t.name.toLowerCase().includes(q)
  ) : [];

  const totalResults = matchedNotes.length + matchedDocs.length + matchedJobs.length + matchedEvents.length + matchedLearning.length + matchedTags.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search notes, documents, certificates, jobs, dates (e.g. 'Amazon')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden placeholder-slate-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 text-xs">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {!query ? (
            <div className="p-8 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-xs">Type any search term like <span className="font-semibold text-indigo-500">"Amazon"</span>, <span className="font-semibold text-indigo-500">"Certificate"</span>, or <span className="font-semibold text-indigo-500">"Rent"</span></p>
            </div>
          ) : totalResults === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching records found for "{query}".
            </div>
          ) : (
            <div className="space-y-4">

              {/* Notes */}
              {matchedNotes.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    Notes ({matchedNotes.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedNotes.map(n => (
                      <div
                        key={n.id}
                        onClick={() => { navigate('/notes'); onClose(); }}
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl border border-slate-200/60 dark:border-slate-700/40 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{n.content}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {matchedDocs.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <File className="w-3.5 h-3.5 text-sky-500" />
                    Documents ({matchedDocs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedDocs.map(d => (
                      <div
                        key={d.id}
                        onClick={() => { navigate('/documents'); onClose(); }}
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-xl border border-slate-200/60 dark:border-slate-700/40 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                            {d.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{d.fileName} • {d.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jobs */}
              {matchedJobs.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                    Job Applications ({matchedJobs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedJobs.map(j => (
                      <div
                        key={j.id}
                        onClick={() => { navigate('/jobs'); onClose(); }}
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl border border-slate-200/60 dark:border-slate-700/40 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {j.company} — {j.role}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Status: <span className="font-semibold text-emerald-500">{j.status}</span></p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {matchedEvents.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    Important Dates & Events ({matchedEvents.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchedEvents.map(e => (
                      <div
                        key={e.id}
                        onClick={() => { navigate('/calendar'); onClose(); }}
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl border border-slate-200/60 dark:border-slate-700/40 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                            {e.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{new Date(e.startTime).toLocaleString()}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {matchedTags.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-cyan-500" />
                    Matching Tags ({matchedTags.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchedTags.map(t => (
                      <span
                        key={t.id}
                        onClick={() => { navigate('/tags'); onClose(); }}
                        className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold cursor-pointer border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100"
                      >
                        #{t.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700/60 text-center">
          <span className="text-[11px] text-slate-400">
            Press <kbd className="px-1 bg-white dark:bg-slate-800 border rounded">Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
