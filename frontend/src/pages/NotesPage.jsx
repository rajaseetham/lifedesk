import React, { useState } from 'react';
import { FileText, Plus, Pin, Trash2, Edit3, Tag, Search, Check, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export const NotesPage = () => {
  const { notes, addNote, updateNote, deleteNote, togglePinNote, tags, openQuickAdd } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState('');
  
  // Note edit state
  const [editingNote, setEditingNote] = useState(null);

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTagFilter ? n.tags.includes(selectedTagFilter) : true;
    return matchesSearch && matchesTag;
  });

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const otherNotes = filteredNotes.filter(n => !n.isPinned);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Notes Vault
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Clean, distraction-free encrypted note taking
            </p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('note')}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search notes content or titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tags filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedTagFilter('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              selectedTagFilter === ''
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
            }`}
          >
            All Notes
          </button>
          {tags.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTagFilter(t.name === selectedTagFilter ? '' : t.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                selectedTagFilter === t.name
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              #{t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned Section */}
      {pinnedNotes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Pinned Notes ({pinnedNotes.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onPin={() => togglePinNote(note.id)}
                onEdit={() => setEditingNote(note)}
                onDelete={() => deleteNote(note.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All / Other Notes */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          All Notes ({otherNotes.length})
        </h2>

        {otherNotes.length === 0 && pinnedNotes.length === 0 ? (
          <div className="p-12 text-center text-slate-400 glass-card rounded-2xl">
            <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-xs font-medium">No notes match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onPin={() => togglePinNote(note.id)}
                onEdit={() => setEditingNote(note)}
                onDelete={() => deleteNote(note.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={(id, fields) => {
            updateNote(id, fields);
            setEditingNote(null);
          }}
        />
      )}

    </div>
  );
};

const NoteCard = ({ note, onPin, onEdit, onDelete }) => (
  <div className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-3 group hover:border-indigo-500/50">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
          {note.category}
        </span>
        <button
          onClick={onPin}
          title={note.isPinned ? 'Unpin Note' : 'Pin Note'}
          className="p-1 text-slate-400 hover:text-amber-500 rounded-md transition-colors"
        >
          <Pin className={`w-4 h-4 ${note.isPinned ? 'text-amber-500 fill-amber-500' : ''}`} />
        </button>
      </div>

      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
        {note.title}
      </h3>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
        {note.content}
      </p>
    </div>

    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
      <div className="flex flex-wrap gap-1">
        {note.tags.map(t => (
          <span key={t} className="text-indigo-500 dark:text-indigo-400 font-medium">#{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          title="Edit Note"
          className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          title="Delete Note"
          className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);

const EditNoteModal = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note.id, { title, content, category });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Edit Note</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Personal">Personal</option>
              <option value="Career">Career</option>
              <option value="Learning">Learning</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Content</label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
