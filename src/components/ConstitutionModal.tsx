import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  Bookmark,
  Scale,
  Award,
  ChevronRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { CONSTITUTION_ARTICLES } from '../data/legalData';
import { LegalArticle } from '../types';
import { useSettings } from '../context/SettingsContext';

interface ConstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookmark: (item: { title: string; category: 'Article'; reference: string }) => void;
}

export const ConstitutionModal: React.FC<ConstitutionModalProps> = ({
  isOpen,
  onClose,
  onBookmark,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<LegalArticle>(CONSTITUTION_ARTICLES[0]);
  const [activeTab, setActiveTab] = useState<'articles' | 'preamble' | 'schedules'>('articles');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const filteredArticles = CONSTITUTION_ARTICLES.filter(
    (art) =>
      art.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBookmarkToggle = (art: LegalArticle) => {
    if (!bookmarkedIds.includes(art.number)) {
      setBookmarkedIds([...bookmarkedIds, art.number]);
      onBookmark({
        title: `${art.number}: ${art.title}`,
        category: 'Article',
        reference: art.part,
      });
    }
  };

  return (
    <div
      id="constitution-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="constitution-modal-container"
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
              📜
            </div>
            <div>
              <h2 className="font-playfair text-lg sm:text-xl font-bold tracking-wide text-[#F5F1E3]">
                {t.constitution.modalTitle}
              </h2>
              <p className="text-xs text-[#E4D8C5] font-medium tracking-wider uppercase">
                {t.constitution.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            id="constitution-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742] transition-colors"
            aria-label="Close Constitution Explorer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#4A2F2B] text-[#E4D8C5] border-b border-[#775E57] flex items-center gap-4 text-xs font-medium shrink-0">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'articles'
                ? 'bg-[#F8E7E2] text-[#A94F43] font-semibold border border-[#D8CEB6]'
                : 'text-[#E4D8C5] hover:text-[#F5F1E3]'
            }`}
          >
            {t.constitution.tabArticles}
          </button>
          <button
            onClick={() => setActiveTab('preamble')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'preamble'
                ? 'bg-[#F8E7E2] text-[#A94F43] font-semibold border border-[#D8CEB6]'
                : 'text-[#E4D8C5] hover:text-[#F5F1E3]'
            }`}
          >
            {t.constitution.tabPreamble}
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'schedules'
                ? 'bg-[#F8E7E2] text-[#A94F43] font-semibold border border-[#D8CEB6]'
                : 'text-[#E4D8C5] hover:text-[#F5F1E3]'
            }`}
          >
            {t.constitution.tabSchedules}
          </button>
        </div>

        {/* Content Body */}
        <div
          className={`flex-1 overflow-hidden flex flex-col md:flex-row ${
            isDark ? 'bg-[#38231F]' : 'bg-[#F5F1E3]'
          }`}
        >
          {activeTab === 'articles' ? (
            <>
              {/* Left List */}
              <div
                className={`w-full md:w-80 border-r flex flex-col overflow-hidden ${
                  isDark
                    ? 'bg-[#4A2F2B] border-[#775E57]'
                    : 'bg-[#FFFCF5] border-[#D8CEB6]'
                }`}
              >
                <div className={`p-3 border-b ${isDark ? 'border-[#775E57]' : 'border-[#D8CEB6]'}`}>
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#A94F43] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder={t.constitution.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-hidden ${
                        isDark
                          ? 'bg-[#38231F] text-[#F5F1E3] border border-[#775E57] focus:border-[#C96F5D]'
                          : 'bg-[#F5F1E3] text-[#302522] border border-[#D8CEB6] focus:border-[#A94F43]'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-[#D8CEB6]/40 scrollbar-thin">
                  {filteredArticles.map((art) => {
                    const isSelected = selectedArticle.number === art.number;
                    return (
                      <button
                        key={art.number}
                        onClick={() => setSelectedArticle(art)}
                        className={`w-full text-left p-3.5 transition-colors flex items-center justify-between ${
                          isSelected
                            ? isDark
                              ? 'bg-[#5B4742] border-l-4 border-[#C96F5D]'
                              : 'bg-[#F8E7E2] border-l-4 border-[#A94F43]'
                            : isDark
                            ? 'hover:bg-[#5B4742]/60'
                            : 'hover:bg-[#F5F1E3]'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <span
                            className={`text-xs font-bold ${
                              isSelected
                                ? isDark
                                  ? 'text-[#F8E7E2]'
                                  : 'text-[#38231F]'
                                : isDark
                                ? 'text-[#F5F1E3]'
                                : 'text-[#302522]'
                            }`}
                          >
                            {art.number}
                          </span>
                          <p
                            className={`text-xs truncate mt-0.5 ${
                              isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                            }`}
                          >
                            {art.title}
                          </p>
                          <span className="text-[10px] text-[#A94F43] font-medium block mt-1">
                            {art.part}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-[#A94F43]' : 'text-[#76665C] opacity-60'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Detail Pane */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#4A2F2B] border-[#775E57]'
                      : 'bg-[#FFFCF5] border-[#D8CEB6] shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6]">
                        {selectedArticle.part}
                      </span>
                      <h3
                        className={`font-playfair text-2xl font-bold mt-2 ${
                          isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                        }`}
                      >
                        {selectedArticle.number}: {selectedArticle.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleBookmarkToggle(selectedArticle)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                        bookmarkedIds.includes(selectedArticle.number)
                          ? 'bg-[#F8E7E2] border-[#A94F43] text-[#A94F43]'
                          : isDark
                          ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5] hover:text-[#F5F1E3]'
                          : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F] hover:text-[#A94F43]'
                      }`}
                    >
                      {bookmarkedIds.includes(selectedArticle.number) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#A94F43]" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Bookmark</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#38231F]'
                    }`}
                  >
                    {selectedArticle.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border ${
                          isDark
                            ? 'bg-[#38231F] text-[#E4D8C5] border-[#775E57]'
                            : 'bg-[#F5F1E3] text-[#38231F] border-[#D8CEB6]'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Case Laws / Judicial Precedents */}
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#4A2F2B] border-[#775E57]'
                      : 'bg-[#FFFCF5] border-[#D8CEB6] shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="w-4 h-4 text-[#A94F43]" />
                    <h4
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                      }`}
                    >
                      Key Supreme Court Landmark Precedents
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {selectedArticle.keyCaseLaws.map((law, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center gap-3 text-xs ${
                          isDark
                            ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]'
                            : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-[#F8E7E2] text-[#A94F43] font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="font-medium">{law}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'preamble' ? (
            /* Preamble View */
            <div className="flex-1 overflow-y-auto p-6 md:p-12 flex items-center justify-center">
              <div
                className={`max-w-2xl text-center p-8 sm:p-10 rounded-3xl border shadow-xl relative ${
                  isDark
                    ? 'bg-[#4A2F2B] border-[#C96F5D]/50'
                    : 'bg-[#FFFCF5] border-[#A94F43]/40'
                }`}
              >
                <div className="text-4xl mb-4">🇮🇳</div>
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold tracking-widest text-[#A94F43] uppercase">
                  THE PREAMBLE
                </h3>
                <p className="text-xs uppercase tracking-widest mt-1 text-[#A94F43]/80">
                  WE, THE PEOPLE OF INDIA
                </p>
                <div
                  className={`my-6 border-t ${
                    isDark ? 'border-[#775E57]' : 'border-[#D8CEB6]'
                  }`}
                />
                <p
                  className={`font-serif-legal text-sm sm:text-base leading-relaxed italic ${
                    isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                  }`}
                >
                  "SOLEMNLY resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 text-xs text-left">
                  <div
                    className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]'
                        : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'
                    }`}
                  >
                    <strong className="text-[#A94F43] block">JUSTICE</strong>
                    social, economic and political;
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]'
                        : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'
                    }`}
                  >
                    <strong className="text-[#A94F43] block">LIBERTY</strong>
                    of thought, expression, belief, faith and worship;
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]'
                        : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'
                    }`}
                  >
                    <strong className="text-[#A94F43] block">EQUALITY</strong>
                    of status and of opportunity;
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]'
                        : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'
                    }`}
                  >
                    <strong className="text-[#A94F43] block">FRATERNITY</strong>
                    assuring the dignity of the individual and unity and integrity of the Nation."
                  </div>
                </div>
                <p className="text-xs text-[#A94F43] font-semibold">
                  Adopted, Enacted and Given to Ourselves on 26th November, 1949.
                </p>
              </div>
            </div>
          ) : (
            /* Schedules View */
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <h3
                className={`font-playfair text-xl font-bold mb-4 ${
                  isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                }`}
              >
                12 Constitutional Schedules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { num: 'First Schedule', title: 'States and Union Territories of India' },
                  { num: 'Second Schedule', title: 'Emoluments of President, Governors, Judges, CAG' },
                  { num: 'Third Schedule', title: 'Forms of Oaths and Affirmations' },
                  { num: 'Fourth Schedule', title: 'Allocation of Rajya Sabha (Council of States) Seats' },
                  { num: 'Fifth Schedule', title: 'Administration of Scheduled Areas and Scheduled Tribes' },
                  { num: 'Sixth Schedule', title: 'Administration of Tribal Areas in Assam, Meghalaya, Tripura & Mizoram' },
                  { num: 'Seventh Schedule', title: 'Union, State, and Concurrent Legislative Lists (Union, State, Concurrent)' },
                  { num: 'Eighth Schedule', title: '22 Recognized Official Languages of the Republic' },
                  { num: 'Ninth Schedule', title: 'Validation of Certain Acts & Regulations (Judicial Review protection)' },
                  { num: 'Tenth Schedule', title: 'Anti-Defection Provisions for MPs and MLAs' },
                  { num: 'Eleventh Schedule', title: 'Panchayati Raj Powers & 29 Functional Matters' },
                  { num: 'Twelfth Schedule', title: 'Municipalities Powers & 18 Functional Matters' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDark
                        ? 'bg-[#4A2F2B] border-[#775E57] hover:border-[#C96F5D]'
                        : 'bg-[#FFFCF5] border-[#D8CEB6] hover:border-[#A94F43] shadow-xs'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#A94F43] uppercase tracking-wider block">
                      {item.num}
                    </span>
                    <p
                      className={`text-xs font-semibold mt-1 ${
                        isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
