'use client';

import React, { useState, useEffect, useMemo } from 'react';

const IconSearch = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const IconTrash = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconEdit = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconPin = ({ className = "w-5 h-5", filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14l-1 7H6L5 5zm3 7v7l4-2 4 2v-7" />
  </svg>
);

const IconGrid = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconList = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconAlert = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconCopy = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  { name: 'Work', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
  { name: 'Personal', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { name: 'Ideas', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { name: 'Code', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
  { name: 'Important', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
];

const DEFAULT_NOTES: Note[] = [
  {
    id: '1',
    title: 'Next.js 14 App Router Architecture',
    description: 'Explore Server Components, Streaming SSR, and React Suspense boundaries for maximum performance in web apps.',
    category: 'Code',
    isPinned: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Weekly Sprint Retrospective',
    description: '1. Complete API integration for note duplicates.\n2. Refactor state management using custom hooks.\n3. Verify mobile viewport padding.',
    category: 'Work',
    isPinned: true,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: '3',
    title: 'Startup Launch Ideas 🚀',
    description: 'Build an AI-assisted note synthesizer that automatically groups related thoughts and creates summary dashboards.',
    category: 'Ideas',
    isPinned: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: '4',
    title: 'Grocery & Home Checklist',
    description: 'Oat milk, Dark roast coffee beans, Ergonomic wrist rest, Mechanical keyboard lube kit, HD DisplayPort cable.',
    category: 'Personal',
    isPinned: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  }
];

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onCopy?: (title: string) => void;
  viewMode: 'grid' | 'list';
}

const NoteItem = React.memo(({ note, onEdit, onDelete, onTogglePin, onCopy, viewMode }: NoteItemProps) => {
  const [copied, setCopied] = useState(false);

  const categoryConfig = CATEGORIES.find(c => c.name === note.category) || {
    color: 'bg-zinc-800/80 text-zinc-300 border-zinc-700'
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${note.title}\n\n${note.description}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy(note.title);
  };

  const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md ${
        note.isPinned
          ? 'bg-zinc-900/80 border-violet-500/40 shadow-lg shadow-violet-950/20 hover:border-violet-400'
          : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
      } ${viewMode === 'list' ? 'p-4 md:flex-row md:items-center gap-4' : 'p-5 gap-4 h-full'}`}
    >
      <div className="flex-1 space-y-2.5 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryConfig.color}`}>
            {note.category}
          </span>
          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onTogglePin(note.id)}
              title={note.isPinned ? "Unpin note" : "Pin note"}
              className={`p-1.5 rounded-lg transition-colors ${
                note.isPinned
                  ? 'text-violet-400 bg-violet-950/50 hover:bg-violet-900/60'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <IconPin className="w-4 h-4" filled={note.isPinned} />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-violet-300 transition-colors truncate">
            {note.title}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-3 mt-1 font-normal leading-relaxed whitespace-pre-line">
            {note.description}
          </p>
        </div>
      </div>

      <div className={`flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs text-zinc-500 ${
        viewMode === 'list' ? 'md:border-t-0 md:pt-0 md:justify-end gap-3 shrink-0' : ''
      }`}>
        <span className="font-mono text-[11px] text-zinc-500">{formattedDate}</span>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy text to clipboard"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            {copied ? <IconCheck className="w-4 h-4 text-emerald-400" /> : <IconCopy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onEdit(note)}
            title="Edit Note"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-violet-400 hover:bg-violet-950/50 transition-colors"
          >
            <IconEdit className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(note.id)}
            title="Delete Note"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/50 transition-colors"
          >
            <IconTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

NoteItem.displayName = 'NoteItem';

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Work');
  const [isPinnedInput, setIsPinnedInput] = useState(false);

  const [isDuplicateTitle, setIsDuplicateTitle] = useState(false);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('next_js_notes_app_data');
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotes(JSON.parse(saved));
      } else {
        setNotes(DEFAULT_NOTES);
      }
    } catch (e) {
      console.error('Failed to load local notes', e);
      setNotes(DEFAULT_NOTES);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('next_js_notes_app_data', JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  useEffect(() => {
    if (!titleInput.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDuplicateTitle(false);
      return;
    }

    const cleanInput = titleInput.trim().toLowerCase();
    const duplicateFound = notes.some(note => {
      if (editingNote && note.id === editingNote.id) return false;
      return note.title.trim().toLowerCase() === cleanInput;
    });

    setIsDuplicateTitle(duplicateFound);
  }, [titleInput, notes, editingNote]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenAddModal = () => {
    setEditingNote(null);
    setTitleInput('');
    setDescInput('');
    setCategoryInput('Work');
    setIsPinnedInput(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note: Note) => {
    setEditingNote(note);
    setTitleInput(note.title);
    setDescInput(note.description);
    setCategoryInput(note.category);
    setIsPinnedInput(note.isPinned);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setTitleInput('');
    setDescInput('');
    setIsDuplicateTitle(false);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleInput.trim()) {
      showToast('Please enter a note title', 'error');
      return;
    }

    if (isDuplicateTitle) {
      showToast('Cannot save: A note with this title already exists', 'error');
      return;
    }

    if (editingNote) {
      setNotes(prev => prev.map(n => {
        if (n.id === editingNote.id) {
          return {
            ...n,
            title: titleInput.trim(),
            description: descInput.trim(),
            category: categoryInput,
            isPinned: isPinnedInput,
            updatedAt: new Date().toISOString()
          };
        }
        return n;
      }));
      showToast('Note updated successfully!', 'success');
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: titleInput.trim(),
        description: descInput.trim(),
        category: categoryInput,
        isPinned: isPinnedInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes(prev => [newNote, ...prev]);
      showToast('New note added!', 'success');
    }

    handleCloseModal();
  };

  const handleConfirmDelete = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    setDeleteConfirmId(null);
    showToast('Note deleted successfully', 'info');
  };

  const handleTogglePin = (id: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id === id) {
        const nextPin = !n.isPinned;
        showToast(nextPin ? 'Note pinned to top' : 'Note unpinned', 'info');
        return { ...n, isPinned: nextPin };
      }
      return n;
    }));
  };

  const handleResetDefaults = () => {
    setNotes(DEFAULT_NOTES);
    showToast('Reset notes to sample dataset', 'info');
  };

  const filteredAndSortedNotes = useMemo(() => {
    return notes
      .filter(note => {
        const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
        const matchesSearch = 
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        if (sortBy === 'newest') {
          return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.updatedAt || a.createdAt).getTime() - new Date(b.updatedAt || b.createdAt).getTime();
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [notes, searchQuery, selectedCategory, sortBy]);

  const pinnedCount = useMemo(() => notes.filter(n => n.isPinned).length, [notes]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500 selection:text-white pb-10">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-violet-400 bg-clip-text text-transparent">
                  NextNotes
                </h1>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-violet-400 border border-zinc-700">
                  App Router
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">React useState & useEffect Application</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              Reset Sample Notes
            </button>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <IconPlus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Note</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <span className="text-xs font-medium text-zinc-400">Total Notes</span>
            <div className="text-2xl font-bold text-zinc-100 mt-1">{notes.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <span className="text-xs font-medium text-zinc-400">Pinned Notes</span>
            <div className="text-2xl font-bold text-violet-400 mt-1">{pinnedCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <span className="text-xs font-medium text-zinc-400">Filtered View</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{filteredAndSortedNotes.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            <span className="text-xs font-medium text-zinc-400">Active Category</span>
            <div className="text-2xl font-bold text-purple-400 mt-1 truncate">{selectedCategory}</div>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/80">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <IconSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search notes by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-200"
              >
                <IconX className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
              className="bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-violet-500"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="title">Sort: Title A-Z</option>
            </select>

            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-violet-500/20 text-violet-400' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Grid View"
              >
                <IconGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-violet-500/20 text-violet-400' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="List View"
              >
                <IconList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            All Notes ({notes.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = notes.filter(n => n.category === cat.name).length;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                    : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Notes Grid / List Display */}
        {filteredAndSortedNotes.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-zinc-800/80 rounded-3xl bg-zinc-900/20">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <IconSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-zinc-200">No notes found</h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No notes matched your search query "${searchQuery}".`
                : 'Get started by creating your first note above!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-violet-400 bg-violet-950/40 border border-violet-500/30 rounded-xl hover:bg-violet-900/40"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'flex flex-col gap-3'
          }>
            {filteredAndSortedNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onEdit={handleOpenEditModal}
                onDelete={(id) => setDeleteConfirmId(id)}
                onTogglePin={handleTogglePin}
                onCopy={(title) => showToast(`Copied note "${title}"`, 'info')}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                  {editingNote ? <IconEdit className="w-5 h-5" /> : <IconPlus className="w-5 h-5" />}
                </div>
                <h2 className="text-lg font-bold text-zinc-100">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">
                    Note Title <span className="text-rose-400">*</span>
                  </label>
                  
                  {isDuplicateTitle && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md animate-pulse">
                      <IconAlert className="w-3.5 h-3.5" />
                      Title already exists!
                    </span>
                  )}
                </div>

                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js App Router Best Practices"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-zinc-950 border rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all ${
                    isDuplicateTitle
                      ? 'border-amber-500 focus:ring-1 focus:ring-amber-500'
                      : 'border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Category</label>
                  <select
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-violet-500"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs font-semibold text-zinc-300 bg-zinc-950 px-3.5 py-2.5 rounded-xl border border-zinc-800 w-full hover:border-zinc-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={isPinnedInput}
                      onChange={(e) => setIsPinnedInput(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-violet-500 focus:ring-violet-500"
                    />
                    <span className="flex items-center gap-1.5">
                      <IconPin className="w-3.5 h-3.5 text-violet-400" filled={isPinnedInput} />
                      Pin to top of list
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Description / Details</label>
                <textarea
                  rows={5}
                  placeholder="Type your notes, ideas, or code snippets here..."
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDuplicateTitle || !titleInput.trim()}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
                    isDuplicateTitle || !titleInput.trim()
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/20'
                  }`}
                >
                  {editingNote ? 'Save Changes' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <IconAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-100">Delete Note?</h3>
                <p className="text-xs text-zinc-400">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium shadow-2xl animate-bounce">
          <span className={`w-2 h-2 rounded-full ${
            toastMessage.type === 'success' ? 'bg-emerald-400' : toastMessage.type === 'error' ? 'bg-rose-400' : 'bg-violet-400'
          }`} />
          {toastMessage.message}
        </div>
      )}
    </div>
  );
}