import React from 'react';
import { Briefcase, Plus, ExternalLink, Calendar, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const JobTrackerPage = () => {
  const { jobs, updateJobStatus, deleteJob, openQuickAdd } = useData();

  const pipelineStages = [
    { id: 'Applied', name: 'Applied', color: 'border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { id: 'Assessment', name: 'Assessment', color: 'border-amber-500 text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { id: 'Interview', name: 'Interview', color: 'border-indigo-500 text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    { id: 'HR', name: 'HR Round', color: 'border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
    { id: 'Offer', name: 'Offer 🎉', color: 'border-emerald-500 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    { id: 'Rejected', name: 'Rejected / Ended', color: 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/40' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Career & Job Pipeline Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Visual pipeline tracking for applications, interviews, assessments, and offers
            </p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('job')}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Visual Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {pipelineStages.map(stage => {
          const stageJobs = jobs.filter(j => j.status === stage.id);

          return (
            <div key={stage.id} className="bg-slate-100/60 dark:bg-slate-900/60 rounded-2xl p-3 border border-slate-200/60 dark:border-slate-800 flex flex-col min-w-[240px]">
              
              {/* Stage Header */}
              <div className={`p-2.5 rounded-xl border ${stage.color} flex items-center justify-between mb-3 shadow-xs`}>
                <span className="font-bold text-xs">{stage.name}</span>
                <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 text-[11px] font-extrabold flex items-center justify-center shadow-xs">
                  {stageJobs.length}
                </span>
              </div>

              {/* Stage Applications Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageJobs.length === 0 ? (
                  <p className="text-[11px] text-slate-400 text-center py-6">No applications</p>
                ) : (
                  stageJobs.map(job => (
                    <div key={job.id} className="glass-card rounded-xl p-3.5 space-y-2 group hover:border-emerald-500/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">{job.company}</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{job.role}</p>
                        </div>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {job.interviewDate && (
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-lg text-[10px] text-indigo-600 dark:text-indigo-300 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Int: {new Date(job.interviewDate).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      )}

                      {job.notes && (
                        <p className="text-[11px] text-slate-400 line-clamp-2">{job.notes}</p>
                      )}

                      {/* Move Status Dropdown */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                        {job.jobUrl && (
                          <a
                            href={job.jobUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-emerald-500 p-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <select
                          value={job.status}
                          onChange={(e) => updateJobStatus(job.id, e.target.value)}
                          className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg border-0 cursor-pointer focus:ring-1 focus:ring-emerald-500"
                        >
                          {pipelineStages.map(s => (
                            <option key={s.id} value={s.id}>Move to {s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
