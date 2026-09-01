import React from 'react';
import { BookOpen, Plus, CheckSquare, Square, Award, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

export const LearningPage = () => {
  const { learning, toggleLearningTopic, openQuickAdd } = useData();

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Learning Hub & Skill Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Track courses, books, tutorials, certificates, and learning topic checklists
            </p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('learning')}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Learning Resource</span>
        </button>
      </div>

      {/* Learning Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learning.length === 0 ? (
          <div className="p-12 text-center text-slate-400 glass-card rounded-2xl md:col-span-2">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-xs font-medium">No learning resources added yet.</p>
          </div>
        ) : (
          learning.map(item => (
            <div key={item.id} className="glass-card rounded-2xl p-6 space-y-4">
              
              {/* Card Title & Type */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400">
                    {item.type}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-violet-600 dark:text-violet-400">
                    {item.progressPercentage}%
                  </span>
                  <p className="text-[10px] text-slate-400">Complete</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-700/60 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${item.progressPercentage}%` }}
                ></div>
              </div>

              {/* Topic Checklist */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Modules & Topics ({item.topics.filter(t => t.completed).length} / {item.topics.length})
                </h4>

                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  {item.topics.map(topic => (
                    <div 
                      key={topic.id}
                      onClick={() => toggleLearningTopic(item.id, topic.id)}
                      className="flex items-center gap-2 text-xs cursor-pointer hover:text-violet-600 dark:hover:text-violet-400 transition-colors p-1"
                    >
                      {topic.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className={topic.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200 font-medium'}>
                        {topic.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Link if attached */}
              {item.certificateUrl && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-slate-500 font-medium">
                    <Award className="w-4 h-4 text-amber-500" /> Certificate Earned
                  </span>
                  <a 
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
};
