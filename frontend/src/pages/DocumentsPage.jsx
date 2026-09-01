import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Calendar, AlertTriangle, Eye, Plus, Search, Lock } from 'lucide-react';
import { useData } from '../context/DataContext';

export const DocumentsPage = () => {
  const { documents, addDocument, deleteDocument, openQuickAdd } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [previewDoc, setPreviewDoc] = useState(null);

  const categories = ['All', 'Personal', 'Career', 'Learning', 'Finance', 'Documents'];

  const filteredDocs = documents.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'All' ? true : d.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Document Vault
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Encrypted PDF, certificate, and document storage with expiry tracking
            </p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('document')}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search documents by title or file name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                selectedCategoryFilter === cat
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 text-center text-slate-400 glass-card rounded-2xl">
          <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
          <p className="text-xs font-medium">No documents found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onPreview={() => setPreviewDoc(doc)}
              onDelete={() => deleteDocument(doc.id)}
            />
          ))}
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}

    </div>
  );
};

const DocumentCard = ({ doc, onPreview, onDelete }) => {
  const isExpiringSoon = doc.expiryDate && new Date(doc.expiryDate) > new Date();

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 group">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
            {doc.category}
          </span>
          {doc.expiryDate && (
            <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              isExpiringSoon 
                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}>
              <AlertTriangle className="w-3 h-3" />
              Exp: {doc.expiryDate}
            </span>
          )}
        </div>

        <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-1">
          {doc.title}
        </h3>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
            PDF
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{doc.fileName}</p>
            <p className="text-[10px] text-slate-400">
              {(doc.fileSize / 1024 / 1024).toFixed(2)} MB • {new Date(doc.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {doc.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {doc.description}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {doc.tags.map(t => (
            <span key={t} className="text-[10px] text-sky-500 font-medium">#{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onPreview}
            title="Preview Document"
            className="p-1.5 text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            title="Delete Document"
            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DocumentPreviewModal = ({ doc, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Authorized Stream Preview</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700 text-center space-y-3">
          <FileText className="w-12 h-12 text-sky-500 mx-auto" />
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{doc.title}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{doc.fileName}</p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            This file is encrypted at rest and streamed directly to your authenticated session token. No public URL exposure.
          </p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-slate-400">Category: {doc.category}</span>
          <button
            onClick={() => alert(`Simulated secure download for ${doc.fileName}`)}
            className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Secure Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
