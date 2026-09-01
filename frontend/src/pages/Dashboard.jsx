import React from 'react';
import { 
  FileText, 
  Upload, 
  Briefcase, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Tag as TagIcon, 
  PlusCircle, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  AlertTriangle,
  Pin,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const { notes, documents, jobs, events, learning, openQuickAdd } = useData();
  const navigate = useNavigate();

  const pinnedNotes = notes.filter(n => n.isPinned);
  const recentNotes = notes.slice(0, 3);
  const recentDocs = documents.slice(0, 3);
  const upcomingEvents = events.filter(e => !e.isCompleted).slice(0, 3);
  const activeJobs = jobs.filter(j => j.status !== 'Rejected' && j.status !== 'Withdrawn');

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy-First Digital Home
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.fullName || 'Rajaseetha'} 👋
            </h1>
            <p className="text-sm text-indigo-200/90 leading-relaxed">
              Your personal information, career records, notes, and documents are securely organized in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => openQuickAdd('note')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-950 font-semibold rounded-xl text-xs sm:text-sm hover:bg-indigo-50 transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Capture Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => navigate('/notes')}
          className="glass-card p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Notes Vault</span>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold mt-3 text-slate-900 dark:text-white">{notes.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">{pinnedNotes.length} Pinned Notes</p>
        </div>

        <div 
          onClick={() => navigate('/documents')}
          className="glass-card p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Documents</span>
            <div className="p-2 bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-xl group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold mt-3 text-slate-900 dark:text-white">{documents.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">PDFs, Certificates & IDs</p>
        </div>

        <div 
          onClick={() => navigate('/jobs')}
          className="glass-card p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Job Applications</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold mt-3 text-slate-900 dark:text-white">{activeJobs.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Active Applications</p>
        </div>

        <div 
          onClick={() => navigate('/calendar')}
          className="glass-card p-4 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Upcoming Dates</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-105 transition-transform">
              <CalendarIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold mt-3 text-slate-900 dark:text-white">{upcomingEvents.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Interviews & Renewals</p>
        </div>

      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Columns: Upcoming Events & Pinned Notes */}
        <div className="lg:col-span-2 space-y-6">

          {/* 📅 Upcoming Events Card */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Upcoming Events & Reminders</h3>
              </div>
              <button 
                onClick={() => navigate('/calendar')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No upcoming events scheduled.</p>
              ) : (
                upcomingEvents.map(event => (
                  <div key={event.id} className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{event.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(event.startTime).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} • {event.category}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                      Scheduled
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 📝 Pinned & Recent Notes */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Pinned Notes & Checklists</h3>
              </div>
              <button 
                onClick={() => navigate('/notes')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>All Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentNotes.map(note => (
                <div 
                  key={note.id} 
                  onClick={() => navigate('/notes')}
                  className="p-4 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      {note.category}
                    </span>
                    {note.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 line-clamp-1">{note.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{note.content}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {note.tags.map(t => (
                      <span key={t} className="text-[10px] text-indigo-500 dark:text-indigo-400 font-medium">#{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Documents & Quick Actions */}
        <div className="space-y-6">

          {/* 📄 Recent Documents */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-sky-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Recent Documents</h3>
              </div>
              <button 
                onClick={() => navigate('/documents')}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentDocs.map(doc => (
                <div key={doc.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{doc.title}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{doc.fileName}</p>
                  </div>
                  {doc.expiryDate ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 shrink-0">
                      Exp: {doc.expiryDate}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {doc.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ⚡ Quick Actions Card */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => openQuickAdd('note')}
                className="p-3 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-xl text-left border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <FileText className="w-4 h-4 text-indigo-500 mb-1" />
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">+ New Note</p>
              </button>

              <button
                onClick={() => openQuickAdd('document')}
                className="p-3 bg-slate-50 dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-sky-950/60 rounded-xl text-left border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <Upload className="w-4 h-4 text-sky-500 mb-1" />
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">+ Upload Doc</p>
              </button>

              <button
                onClick={() => openQuickAdd('job')}
                className="p-3 bg-slate-50 dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-xl text-left border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <Briefcase className="w-4 h-4 text-emerald-500 mb-1" />
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">+ Job App</p>
              </button>

              <button
                onClick={() => openQuickAdd('event')}
                className="p-3 bg-slate-50 dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-xl text-left border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <CalendarIcon className="w-4 h-4 text-amber-500 mb-1" />
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">+ Add Date</p>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
