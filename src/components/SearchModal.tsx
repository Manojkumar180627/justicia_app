import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  BookOpen,
  Scale,
  Landmark,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CONSTITUTION_ARTICLES, STATUTES_DATA, COURT_TIERS, MOCK_CASES } from '../data/legalData';
import { useSettings } from '../context/SettingsContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: () => void;
  onSelectStatute: () => void;
  onSelectCourt: () => void;
  onSelectCase: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectStatute,
  onSelectCourt,
  onSelectCase,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Articles' | 'Laws' | 'Courts' | 'Cases'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const articleResults = CONSTITUTION_ARTICLES.filter(
    (a) =>
      a.number.toLowerCase().includes(query.toLowerCase()) ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  ).map((a) => ({
    type: 'Articles' as const,
    title: `${a.number}: ${a.title}`,
    subtitle: a.part,
    category: 'Constitution',
    action: onSelectArticle,
  }));

  const statuteResults = STATUTES_DATA.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.shortCode.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  ).map((s) => ({
    type: 'Laws' as const,
    title: s.title,
    subtitle: `${s.shortCode} • ${s.category} • ${s.totalSections} Sections`,
    category: 'Statute',
    action: onSelectStatute,
  }));

  const courtResults = COURT_TIERS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.jurisdiction.toLowerCase().includes(query.toLowerCase()) ||
      (c.hindiName && c.hindiName.toLowerCase().includes(query.toLowerCase()))
  ).map((c) => ({
    type: 'Courts' as const,
    title: c.name,
    subtitle: `${c.level} Tier • ${c.presidedBy}`,
    category: 'Judiciary',
    action: onSelectCourt,
  }));

  const caseResults = MOCK_CASES.filter(
    (cs) =>
      cs.cnrNumber.toLowerCase().includes(query.toLowerCase()) ||
      cs.petitioner.toLowerCase().includes(query.toLowerCase()) ||
      cs.respondent.toLowerCase().includes(query.toLowerCase())
  ).map((cs) => ({
    type: 'Cases' as const,
    title: `${cs.petitioner} v. ${cs.respondent}`,
    subtitle: `CNR: ${cs.cnrNumber} • ${cs.court} • ${cs.status}`,
    category: 'Case Record',
    action: onSelectCase,
  }));

  const allCombined = [...articleResults, ...statuteResults, ...courtResults, ...caseResults];

  const displayResults =
    filterType === 'All' ? allCombined : allCombined.filter((item) => item.type === filterType);

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150"
    >
      <div
        id="search-modal-container"
        className={`w-full max-w-2xl rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#513C37] border-[#775E57] text-[#F5F1E3]'
            : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#302522]'
        }`}
      >
        {/* Search input header */}
        <div
          className={`p-4 border-b flex items-center gap-3 ${
            isDark ? 'bg-[#38231F] border-[#775E57]' : 'bg-[#38231F] text-[#F5F1E3] border-[#A94F43]'
          }`}
        >
          <Search className="w-5 h-5 text-[#F8E7E2] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.legalSearch.searchPrompt}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#F5F1E3] placeholder-[#E4D8C5] text-sm focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#E4D8C5] hover:text-[#F5F1E3] p-1 rounded-lg text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div
          className={`px-4 py-2 border-b flex items-center gap-2 overflow-x-auto scrollbar-none text-xs ${
            isDark ? 'bg-[#4A2F2B] border-[#775E57]' : 'bg-[#F5F1E3] border-[#D8CEB6]'
          }`}
        >
          <span
            className={`text-[11px] font-semibold uppercase mr-1 ${
              isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
            }`}
          >
            Filter:
          </span>
          {(['All', 'Articles', 'Laws', 'Courts', 'Cases'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === tab
                  ? 'bg-[#A94F43] text-[#FFFFFF] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742]'
                  : 'text-[#38231F] hover:text-[#A94F43] hover:bg-[#F8E7E2]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#D8CEB6]/40 scrollbar-thin">
          {displayResults.length === 0 ? (
            <div className={`p-8 text-center text-xs ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-[#A94F43] opacity-80" />
              <p>No legal references found for "{query}".</p>
              <p className="mt-1 text-[11px] opacity-75">
                Try searching "Article 21", "BNS", "High Court", or "CNR".
              </p>
            </div>
          ) : (
            displayResults.map((res, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onClose();
                  res.action();
                }}
                className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-[#5B4742]/70' : 'hover:bg-[#F8E7E2]'
                }`}
              >
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6]">
                      {res.category}
                    </span>
                    <h4
                      className={`text-xs font-semibold truncate ${
                        isDark ? 'text-[#F5F1E3]' : 'text-[#38231F]'
                      }`}
                    >
                      {res.title}
                    </h4>
                  </div>
                  <p
                    className={`text-[11px] mt-0.5 truncate ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    {res.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[#A94F43] shrink-0 text-xs font-medium">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-3 border-t flex items-center justify-between text-[11px] ${
            isDark ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]' : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#76665C]'
          }`}
        >
          <span>Use ⌘K to quickly access search anytime</span>
          <span className="text-[#A94F43] font-semibold">NJDG + e-Courts Indexed</span>
        </div>
      </div>
    </div>
  );
};
