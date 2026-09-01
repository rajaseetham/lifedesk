import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const INITIAL_TAGS = [
  { id: 't1', name: 'job', color: '#6366f1' },
  { id: 't2', name: 'aws', color: '#f59e0b' },
  { id: 't3', name: 'college', color: '#10b981' },
  { id: 't4', name: 'finance', color: '#ef4444' },
  { id: 't5', name: 'important', color: '#ec4899' },
  { id: 't6', name: 'certificate', color: '#8b5cf6' },
];

const INITIAL_NOTES = [
  {
    id: 'n1',
    title: 'Amazon Technical Interview Preparation Checklist',
    content: 'Review System Design principles, Data Structures (Heaps, Graphs, Dynamic Programming), and Leadership Principles. Prepare 3 STAR format stories for past architecture decisions.',
    category: 'Career',
    isPinned: true,
    tags: ['job', 'important'],
    createdAt: '2026-08-05T10:00:00.000Z',
    updatedAt: '2026-08-08T14:20:00.000Z',
  },
  {
    id: 'n2',
    title: 'Personal Passport & Tax ID Details',
    content: 'Passport Number: Z8941029 (Expires Nov 2028). Tax Identifier: SSN XXX-XX-9182. Stored securely in client-side vault.',
    category: 'Personal',
    isPinned: true,
    tags: ['important'],
    createdAt: '2026-07-20T09:15:00.000Z',
    updatedAt: '2026-07-20T09:15:00.000Z',
  },
  {
    id: 'n3',
    title: 'Spring Boot 3 & JPA Hibernate Best Practices',
    content: 'Use @Transactional(readOnly = true) for queries. Avoid N+1 query problems using JOIN FETCH or Entity Graphs. Implement JWT authentication filters cleanly.',
    category: 'Learning',
    isPinned: false,
    tags: ['college', 'aws'],
    createdAt: '2026-08-01T16:30:00.000Z',
    updatedAt: '2026-08-02T11:10:00.000Z',
  }
];

const INITIAL_DOCUMENTS = [
  {
    id: 'd1',
    title: 'AWS Solutions Architect Certificate',
    description: 'Official AWS Certified Solutions Architect Associate Certificate PDF credential.',
    category: 'Learning',
    fileName: 'AWS_Certified_Solutions_Architect_Certificate.pdf',
    fileType: 'application/pdf',
    fileSize: 1420000,
    tags: ['aws', 'certificate'],
    expiryDate: '2026-08-25',
    createdAt: '2026-08-02T11:00:00.000Z'
  },
  {
    id: 'd2',
    title: 'Tailored Amazon Software Engineer Resume',
    description: 'Updated 2026 software engineering resume featuring Spring Boot, React, and AWS projects.',
    category: 'Career',
    fileName: 'Rajaseetha_Software_Engineer_Resume_v4.pdf',
    fileType: 'application/pdf',
    fileSize: 890000,
    tags: ['job', 'important'],
    expiryDate: null,
    createdAt: '2026-08-04T15:20:00.000Z'
  },
  {
    id: 'd3',
    title: 'Electricity & Utility Bill - August 2026',
    description: 'Monthly utility payment statement for apartment 4B.',
    category: 'Finance',
    fileName: 'Utility_Bill_August_2026.pdf',
    fileType: 'application/pdf',
    fileSize: 420000,
    tags: ['finance'],
    expiryDate: '2026-08-15',
    createdAt: '2026-08-01T08:00:00.000Z'
  }
];

const INITIAL_JOBS = [
  {
    id: 'j1',
    company: 'Amazon',
    role: 'Senior Software Engineer - Cloud Systems',
    status: 'Interview',
    applicationDate: '2026-08-01',
    jobUrl: 'https://amazon.jobs/en/jobs/2849102',
    resumeUsed: 'Rajaseetha_Software_Engineer_Resume_v4.pdf',
    interviewDate: '2026-08-18T10:00',
    notes: 'Recruiter mentioned 3 rounds: System Architecture, Data Structures, and Behavioral.',
    salary: '$185,000 - $210,000'
  },
  {
    id: 'j2',
    company: 'Google',
    role: 'Full Stack Engineer',
    status: 'Assessment',
    applicationDate: '2026-08-03',
    jobUrl: 'https://careers.google.com/jobs/9102',
    resumeUsed: 'Rajaseetha_Software_Engineer_Resume_v4.pdf',
    interviewDate: null,
    notes: 'Online technical assessment link received. Due Aug 20.',
    salary: '$190,000'
  },
  {
    id: 'j3',
    company: 'Stripe',
    role: 'Backend Infrastructure Engineer',
    status: 'Applied',
    applicationDate: '2026-08-07',
    jobUrl: 'https://stripe.com/jobs/4819',
    resumeUsed: 'Rajaseetha_Software_Engineer_Resume_v4.pdf',
    interviewDate: null,
    notes: 'Applied via employee referral.',
    salary: '$195,000'
  }
];

const INITIAL_EVENTS = [
  {
    id: 'e1',
    title: 'Amazon Technical Interview',
    category: 'Career',
    startTime: '2026-08-18T10:00',
    endTime: '2026-08-18T11:30',
    location: 'Chime Virtual Meeting',
    notes: 'System Design & Core Java Live Coding',
    isCompleted: false
  },
  {
    id: 'e2',
    title: 'AWS Certification Expiry / Renewal',
    category: 'Learning',
    startTime: '2026-08-25T09:00',
    endTime: '2026-08-25T10:00',
    location: 'Pearson VUE Testing Center',
    notes: 'Schedule recertification exam before date.',
    isCompleted: false
  },
  {
    id: 'e3',
    title: 'Monthly Utility Bill Due',
    category: 'Finance',
    startTime: '2026-08-15T23:59',
    endTime: null,
    location: 'Online Payment Portal',
    notes: 'Total bill: $142.50',
    isCompleted: false
  }
];

const INITIAL_LEARNING = [
  {
    id: 'l1',
    title: 'Mastering Java 21, Spring Boot 3 & JPA',
    type: 'Course',
    category: 'Learning',
    progressPercentage: 65,
    certificateUrl: 'https://lifedesk.local/certs/spring-boot-3',
    topics: [
      { id: 't1', name: 'Java 21 Virtual Threads & Language Basics', completed: true },
      { id: 't2', name: 'Object-Oriented Design Principles', completed: true },
      { id: 't3', name: 'Java Collections & Streams API', completed: true },
      { id: 't4', name: 'Spring Boot 3 Security & JWT Auth Filters', completed: false },
      { id: 't5', name: 'REST APIs & OpenAPI Specification', completed: false }
    ]
  },
  {
    id: 'l2',
    title: 'Distributed Systems & System Design Patterns',
    type: 'Tutorial',
    category: 'Learning',
    progressPercentage: 40,
    certificateUrl: '',
    topics: [
      { id: 'dt1', name: 'Load Balancing & Reverse Proxies', completed: true },
      { id: 'dt2', name: 'Caching Strategies (Redis & CDN)', completed: true },
      { id: 'dt3', name: 'Database Sharding & Replication', completed: false },
      { id: 'dt4', name: 'Event-Driven Architectures (Kafka)', completed: false }
    ]
  }
];

export const DataProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const local = localStorage.getItem('lifedesk_notes');
    return local ? JSON.parse(local) : INITIAL_NOTES;
  });

  const [documents, setDocuments] = useState(() => {
    const local = localStorage.getItem('lifedesk_documents');
    return local ? JSON.parse(local) : INITIAL_DOCUMENTS;
  });

  const [jobs, setJobs] = useState(() => {
    const local = localStorage.getItem('lifedesk_jobs');
    return local ? JSON.parse(local) : INITIAL_JOBS;
  });

  const [events, setEvents] = useState(() => {
    const local = localStorage.getItem('lifedesk_events');
    return local ? JSON.parse(local) : INITIAL_EVENTS;
  });

  const [learning, setLearning] = useState(() => {
    const local = localStorage.getItem('lifedesk_learning');
    return local ? JSON.parse(local) : INITIAL_LEARNING;
  });

  const [tags, setTags] = useState(() => {
    const local = localStorage.getItem('lifedesk_tags');
    return local ? JSON.parse(local) : INITIAL_TAGS;
  });

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddDefaultTab, setQuickAddDefaultTab] = useState('note');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync to local storage for persistent browser state
  useEffect(() => {
    localStorage.setItem('lifedesk_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('lifedesk_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('lifedesk_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('lifedesk_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('lifedesk_learning', JSON.stringify(learning));
  }, [learning]);

  useEffect(() => {
    localStorage.setItem('lifedesk_tags', JSON.stringify(tags));
  }, [tags]);

  // Note Handlers
  const addNote = (newNote) => {
    const item = {
      id: 'n_' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      tags: [],
      category: 'Personal',
      ...newNote
    };
    setNotes(prev => [item, ...prev]);
  };

  const updateNote = (id, updatedFields) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updatedFields, updatedAt: new Date().toISOString() } : n));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const togglePinNote = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  // Document Handlers
  const addDocument = (newDoc) => {
    const item = {
      id: 'd_' + Date.now(),
      createdAt: new Date().toISOString(),
      fileSize: newDoc.fileSize || 1024 * 500,
      fileType: newDoc.fileType || 'application/pdf',
      tags: newDoc.tags || [],
      category: newDoc.category || 'Documents',
      ...newDoc
    };
    setDocuments(prev => [item, ...prev]);
  };

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  // Job Application Handlers
  const addJob = (newJob) => {
    const item = {
      id: 'j_' + Date.now(),
      status: 'Applied',
      applicationDate: new Date().toISOString().split('T')[0],
      ...newJob
    };
    setJobs(prev => [item, ...prev]);
  };

  const updateJobStatus = (id, newStatus) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  // Event / Date Handlers
  const addEvent = (newEvent) => {
    const item = {
      id: 'e_' + Date.now(),
      isCompleted: false,
      category: newEvent.category || 'Important Dates',
      ...newEvent
    };
    setEvents(prev => [item, ...prev]);
  };

  const toggleEventComplete = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, isCompleted: !e.isCompleted } : e));
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Learning Handlers
  const addLearning = (newResource) => {
    const item = {
      id: 'l_' + Date.now(),
      progressPercentage: 0,
      type: 'Course',
      category: 'Learning',
      topics: [],
      ...newResource
    };
    setLearning(prev => [item, ...prev]);
  };

  const toggleLearningTopic = (learningId, topicId) => {
    setLearning(prev => prev.map(l => {
      if (l.id !== learningId) return l;
      const updatedTopics = l.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t);
      const completedCount = updatedTopics.filter(t => t.completed).length;
      const progress = updatedTopics.length ? Math.round((completedCount / updatedTopics.length) * 100) : 0;
      return { ...l, topics: updatedTopics, progressPercentage: progress };
    }));
  };

  // Tag Handlers
  const addTag = (tagName, tagColor = '#6366f1') => {
    const normalized = tagName.toLowerCase().trim().replace(/^#/, '');
    if (!normalized) return;
    if (tags.some(t => t.name === normalized)) return;
    const newTag = { id: 't_' + Date.now(), name: normalized, color: tagColor };
    setTags(prev => [...prev, newTag]);
  };

  // Universal Quick Add helper
  const openQuickAdd = (tab = 'note') => {
    setQuickAddDefaultTab(tab);
    setIsQuickAddOpen(true);
  };

  return (
    <DataContext.Provider value={{
      notes, addNote, updateNote, deleteNote, togglePinNote,
      documents, addDocument, deleteDocument,
      jobs, addJob, updateJobStatus, deleteJob,
      events, addEvent, toggleEventComplete, deleteEvent,
      learning, addLearning, toggleLearningTopic,
      tags, addTag,
      isQuickAddOpen, setIsQuickAddOpen, openQuickAdd, quickAddDefaultTab,
      isSearchOpen, setIsSearchOpen
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
