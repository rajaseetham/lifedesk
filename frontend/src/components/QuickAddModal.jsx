import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Upload, 
  Briefcase, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  Tag, 
  Check, 
  Plus
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const QuickAddModal = ({ isOpen, onClose, defaultTab = 'note' }) => {
  const { addNote, addDocument, addJob, addEvent, addLearning, addTag, tags } = useData();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Form states
  // Note Form
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState('Personal');
  const [selectedTags, setSelectedTags] = useState([]);

  // Document Form
  const [docTitle, setDocTitle] = useState('');
  const [docDescription, setDocDescription] = useState('');
  const [docCategory, setDocCategory] = useState('Documents');
  const [docFileName, setDocFileName] = useState('');
  const [docExpiryDate, setDocExpiryDate] = useState('');

  // Job Form
  const [jobCompany, setJobCompany] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [jobStatus, setJobStatus] = useState('Applied');
  const [jobInterviewDate, setJobInterviewDate] = useState('');

  // Event Form
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState('Important Dates');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  // Learning Form
  const [learningTitle, setLearningTitle] = useState('');
  const [learningType, setLearningType] = useState('Course');

  // Expense Form
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDueDate, setExpenseDueDate] = useState('');

  // New Tag Form
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#6366f1');

  if (!isOpen) return null;

  const handleTagToggle = (tagName) => {
    setSelectedTags(prev => 
      prev.includes(tagName) ? prev.filter(t => t !== tagName) : [...prev, tagName]
    );
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;
    addNote({
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      tags: selectedTags
    });
    resetAndClose();
  };

  const handleDocSubmit = (e) => {
    e.preventDefault();
    if (!docTitle.trim()) return;
    addDocument({
      title: docTitle,
      description: docDescription,
      category: docCategory,
      fileName: docFileName || `${docTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      expiryDate: docExpiryDate || null,
      tags: selectedTags
    });
    resetAndClose();
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    if (!jobCompany.trim() || !jobRole.trim()) return;
    addJob({
      company: jobCompany,
      role: jobRole,
      jobUrl,
      status: jobStatus,
      interviewDate: jobInterviewDate || null
    });
    resetAndClose();
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventStartTime) return;
    addEvent({
      title: eventTitle,
      category: eventCategory,
      startTime: eventStartTime,
      location: eventLocation
    });
    resetAndClose();
  };

  const handleLearningSubmit = (e) => {
    e.preventDefault();
    if (!learningTitle.trim()) return;
    addLearning({
      title: learningTitle,
      type: learningType,
      category: 'Learning'
    });
    resetAndClose();
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseTitle.trim()) return;
    // Add bill/expense event
    addEvent({
      title: `Bill: ${expenseTitle} ($${expenseAmount})`,
      category: 'Finance',
      startTime: expenseDueDate || new Date().toISOString(),
      location: 'Online Payment'
    });
    resetAndClose();
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    addTag(newTagName, newTagColor);
    setNewTagName('');
  };

  const resetAndClose = () => {
    setNoteTitle('');
    setNoteContent('');
    setDocTitle('');
    setDocDescription('');
    setJobCompany('');
    setJobRole('');
    setEventTitle('');
    setLearningTitle('');
    setExpenseTitle('');
    setSelectedTags([]);
    onClose();
  };

  const tabList = [
    { id: 'note', name: 'Note', icon: FileText, color: 'text-indigo-500' },
    { id: 'document', name: 'Document', icon: Upload, color: 'text-sky-500' },
    { id: 'job', name: 'Job App', icon: Briefcase, color: 'text-emerald-500' },
    { id: 'event', name: 'Date / Event', icon: Calendar, color: 'text-amber-500' },
    { id: 'learning', name: 'Learning', icon: BookOpen, color: 'text-violet-500' },
    { id: 'expense', name: 'Bill / Expense', icon: DollarSign, color: 'text-rose-500' },
    { id: 'tag', name: 'Tag', icon: Tag, color: 'text-cyan-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Universal Quick Capture
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Instantly organize any item into your private digital home
              </p>
            </div>
          </div>
          <button 
            onClick={resetAndClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-100 dark:border-slate-700/60 p-2 gap-1 bg-slate-50/30 dark:bg-slate-900/30">
          {tabList.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Modal Form Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">

          {/* NOTE TAB */}
          {activeTab === 'note' && (
            <form onSubmit={handleNoteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon Interview Notes or Passport Renewal steps..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Personal">🏠 Personal</option>
                    <option value="Career">💼 Career</option>
                    <option value="Learning">📚 Learning</option>
                    <option value="Finance">💰 Finance</option>
                    <option value="Documents">📄 Documents</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Content</label>
                <textarea
                  rows={4}
                  placeholder="Type your notes, checklist items, links, or instructions..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Tag selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Attach Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => {
                    const isSel = selectedTags.includes(t.name);
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => handleTagToggle(t.name)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${
                          isSel 
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-400'
                        }`}
                      >
                        <span>#{t.name}</span>
                        {isSel && <Check className="w-3 h-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Save Note
                </button>
              </div>
            </form>
          )}

          {/* DOCUMENT TAB */}
          {activeTab === 'document' && (
            <form onSubmit={handleDocSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certificate or Apartment Lease Agreement..."
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Documents">📄 General Document</option>
                    <option value="Personal">🏠 Personal ID / Paper</option>
                    <option value="Career">💼 Resume / Work Record</option>
                    <option value="Learning">📚 Certificate / Diploma</option>
                    <option value="Finance">💰 Bill / Receipt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={docExpiryDate}
                    onChange={(e) => setDocExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Upload File (PDF / Image / DOC)</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors bg-slate-50/50 dark:bg-slate-900/50">
                  <Upload className="w-6 h-6 mx-auto mb-1.5 text-indigo-500" />
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setDocFileName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="file-upload-input"
                  />
                  <label htmlFor="file-upload-input" className="cursor-pointer text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    {docFileName ? `Selected: ${docFileName}` : 'Choose a file to attach to vault'}
                  </label>
                  <p className="text-[10px] text-slate-400 mt-1">Encrypted on upload. Max 25MB.</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Save Document
                </button>
              </div>
            </form>
          )}

          {/* JOB APP TAB */}
          {activeTab === 'job' && (
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon, Google, Stripe..."
                    value={jobCompany}
                    onChange={(e) => setJobCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Application Pipeline Status</label>
                  <select
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="HR">HR Round</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Interview Date (if set)</label>
                  <input
                    type="datetime-local"
                    value={jobInterviewDate}
                    onChange={(e) => setJobInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Job Link / Portal URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Track Job Application
                </button>
              </div>
            </form>
          )}

          {/* DATE / EVENT TAB */}
          {activeTab === 'event' && (
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Event / Reminder Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certification Exam or Doctor Appointment..."
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Important Dates">📅 Important Date</option>
                    <option value="Career">💼 Interview / Deadline</option>
                    <option value="Learning">📚 Exam / Renewal</option>
                    <option value="Finance">💰 Bill Due Date</option>
                    <option value="Personal">🏠 Birthday / Personal</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Schedule Event
                </button>
              </div>
            </form>
          )}

          {/* LEARNING TAB */}
          {activeTab === 'learning' && (
            <form onSubmit={handleLearningSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Spring Boot 3 & Microservices..."
                  value={learningTitle}
                  onChange={(e) => setLearningTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Resource Type</label>
                  <select
                    value={learningType}
                    onChange={(e) => setLearningType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Course">Online Course</option>
                    <option value="Book">Book / PDF</option>
                    <option value="Tutorial">Tutorial Series</option>
                    <option value="Project">Personal Project</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Add Learning Goal
                </button>
              </div>
            </form>
          )}

          {/* EXPENSE TAB */}
          {activeTab === 'expense' && (
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Bill / Expense Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rent Payment or Internet Bill..."
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="145.00"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={expenseDueDate}
                  onChange={(e) => setExpenseDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Save Bill Reminder
                </button>
              </div>
            </form>
          )}

          {/* TAG TAB */}
          {activeTab === 'tag' && (
            <form onSubmit={handleTagSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Tag Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. #aws or #insurance..."
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Badge Color</label>
                  <input
                    type="color"
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                    className="w-full h-10 p-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                >
                  Create Custom Tag
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
