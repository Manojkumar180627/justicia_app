import React, { useState } from 'react';
import {
  X,
  Scale,
  Search,
  BookMarked,
  Filter,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { STATUTES_DATA } from '../data/legalData';
import { LegalStatute } from '../types';
import { useSettings } from '../context/SettingsContext';

interface LawsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookmark: (item: { title: string; category: 'Statute'; reference: string }) => void;
}

export const LawsModal: React.FC<LawsModalProps> = ({ isOpen, onClose, onBookmark }) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [selectedStatute, setSelectedStatute] = useState<LegalStatute>(STATUTES_DATA[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const SECTIONS_PER_PAGE = 20;

  if (!isOpen) return null;

  const categories = ['All', 'Criminal', 'Civil', 'Commercial', 'Technology'];

  const filteredStatutes = STATUTES_DATA.filter((st) => {
    const matchesCategory = selectedCategory === 'All' || st.category === selectedCategory;
    const matchesSearch =
      st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.shortCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (sec: { section: string; title: string }) => {
    navigator.clipboard?.writeText?.(`${sec.section} - ${sec.title}, ${selectedStatute.title}`);
    setCopiedSection(sec.section);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  return (
    <div
      id="laws-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="laws-modal-container"
        className={`w-full max-w-5xl h-[88vh] rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${
          isDark
            ? 'bg-[#513C37] border-[#775E57] text-[#F5F1E3]'
            : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#302522]'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#38231F] text-[#F5F1E3] flex items-center justify-between border-b border-[#775E57] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A2F2B] border border-[#C96F5D]/60 flex items-center justify-center text-xl">
              ⚖️
            </div>
            <div>
              <h2 className="font-playfair text-lg sm:text-xl font-bold tracking-wide text-[#F5F1E3]">
                {t.laws.modalTitle}
              </h2>
              <p className="text-xs text-[#E4D8C5] font-medium tracking-wider uppercase">
                {t.laws.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div
          className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
            isDark ? 'bg-[#4A2F2B] border-[#775E57]' : 'bg-[#F5F1E3] border-[#D8CEB6]'
          }`}
        >
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#A94F43] text-[#FFFFFF] font-bold shadow-xs'
                    : isDark
                    ? 'text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742]'
                    : 'text-[#38231F] hover:text-[#A94F43] hover:bg-[#F8E7E2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#A94F43] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t.laws.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl focus:outline-hidden ${
                isDark
                  ? 'bg-[#38231F] text-[#F5F1E3] border border-[#775E57] focus:border-[#C96F5D]'
                  : 'bg-[#FFFCF5] text-[#302522] border border-[#D8CEB6] focus:border-[#A94F43]'
              }`}
            />
          </div>
        </div>

        {/* Body Content */}
        <div
          className={`flex-1 overflow-hidden flex flex-col md:flex-row ${
            isDark ? 'bg-[#38231F]' : 'bg-[#F5F1E3]'
          }`}
        >
          {/* Statutes list */}
          <div
            className={`w-full md:w-80 border-r flex flex-col overflow-y-auto divide-y scrollbar-thin ${
              isDark
                ? 'bg-[#4A2F2B] border-[#775E57] divide-[#775E57]/60'
                : 'bg-[#FFFCF5] border-[#D8CEB6] divide-[#D8CEB6]'
            }`}
          >
            {filteredStatutes.map((st) => {
              const isSelected = selectedStatute.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStatute(st);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left p-4 transition-colors ${
                    isSelected
                      ? isDark
                        ? 'bg-[#5B4742] border-l-4 border-[#C96F5D]'
                        : 'bg-[#F8E7E2] border-l-4 border-[#A94F43]'
                      : isDark
                      ? 'hover:bg-[#5B4742]/60'
                      : 'hover:bg-[#F5F1E3]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6]">
                      {st.shortCode} ({st.year})
                    </span>
                    <span
                      className={`text-[10px] ${
                        isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                      }`}
                    >
                      {st.category}
                    </span>
                  </div>
                  <h4
                    className={`text-xs font-bold mt-1.5 leading-snug ${
                      isSelected
                        ? isDark
                          ? 'text-[#F8E7E2]'
                          : 'text-[#38231F]'
                        : isDark
                        ? 'text-[#F5F1E3]'
                        : 'text-[#302522]'
                    }`}
                  >
                    {st.title}
                  </h4>
                  <p
                    className={`text-[11px] line-clamp-2 mt-1 ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    {st.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Statute Details */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#4A2F2B] border-[#775E57]'
                  : 'bg-[#FFFCF5] border-[#D8CEB6] shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6]">
                    {selectedStatute.category} Law • Act No. of {selectedStatute.year}
                  </span>
                  <h3
                    className={`font-playfair text-2xl font-bold mt-2 ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    {selectedStatute.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    Enacted by: {selectedStatute.enactedBy} • Total Sections: {selectedStatute.totalSections}
                  </p>
                </div>

                <button
                  onClick={() =>
                    onBookmark({
                      title: selectedStatute.title,
                      category: 'Statute',
                      reference: selectedStatute.shortCode,
                    })
                  }
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors shrink-0 ${
                    isDark
                      ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5] hover:text-[#F5F1E3]'
                      : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F] hover:text-[#A94F43]'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5 text-[#A94F43]" />
                  <span>Bookmark Act</span>
                </button>
              </div>

              <p
                className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-[#E4D8C5]' : 'text-[#38231F]'
                }`}
              >
                {selectedStatute.description}
              </p>
            </div>

            {/* Key Sections Accordion / Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                  }`}
                >
                  Key Sections & Statutory Provisions
                </h4>
                <span
                  className={`text-xs ${
                    isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                  }`}
                >
                  Click copy to extract formal citation
                </span>
              </div>

              {(() => {
                const totalS = selectedStatute.keySections.length;
                const startIndex = (currentPage - 1) * SECTIONS_PER_PAGE;
                const paginatedSections = selectedStatute.keySections.slice(startIndex, startIndex + SECTIONS_PER_PAGE);
                const totalPages = Math.ceil(totalS / SECTIONS_PER_PAGE);

                return (
                  <>
                    {paginatedSections.map((sec, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          isDark
                            ? 'bg-[#4A2F2B] border-[#775E57] hover:border-[#C96F5D]'
                            : 'bg-[#FFFCF5] border-[#D8CEB6] hover:border-[#A94F43] shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#F8E7E2] text-[#A94F43] font-bold text-xs">
                              {sec.section}
                            </span>
                            <h5
                              className={`text-xs font-bold ${
                                isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                              }`}
                            >
                              {sec.title}
                            </h5>
                          </div>

                          <button
                            onClick={() => handleCopyCitation(sec)}
                            className={`text-[11px] font-medium transition-colors flex items-center gap-1 ${
                              copiedSection === sec.section
                                ? 'text-[#A94F43]'
                                : isDark
                                ? 'text-[#E4D8C5] hover:text-[#F8E7E2]'
                                : 'text-[#76665C] hover:text-[#38231F]'
                            }`}
                          >
                            {copiedSection === sec.section ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-[#A94F43]" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <span>Copy Citation</span>
                            )}
                          </button>
                        </div>
                        <p
                          className={`text-xs mt-2 leading-relaxed ${
                            isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                          }`}
                        >
                          {sec.summary}
                        </p>
                      </div>
                    ))}

                    {totalS > SECTIONS_PER_PAGE && (
                      <div className={`flex justify-between items-center mt-6 p-4 border-t ${isDark ? 'border-[#775E57]' : 'border-[#D8CEB6]'}`}>
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            currentPage === 1
                              ? 'opacity-50 cursor-not-allowed bg-transparent border border-[#76665C] text-[#76665C]'
                              : isDark
                                ? 'bg-[#F8E7E2] text-[#A94F43] hover:bg-[#F0D6CF]'
                                : 'bg-[#F8E7E2] text-[#A94F43] hover:bg-[#F0D6CF] border border-[#D8CEB6]'
                          }`}
                        >
                          Previous
                        </button>
                        <span className={`text-xs font-medium ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            currentPage === totalPages
                              ? 'opacity-50 cursor-not-allowed bg-transparent border border-[#76665C] text-[#76665C]'
                              : isDark
                                ? 'bg-[#F8E7E2] text-[#A94F43] hover:bg-[#F0D6CF]'
                                : 'bg-[#F8E7E2] text-[#A94F43] hover:bg-[#F0D6CF] border border-[#D8CEB6]'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
