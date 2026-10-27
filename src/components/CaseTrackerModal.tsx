import React, { useState } from 'react';
import {
  X,
  FolderGit2,
  Search,
  Calendar,
  Building2,
  Users,
  FileText,
  Clock,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_CASES } from '../data/legalData';
import { CaseRecord } from '../types';
import { useSettings } from '../context/SettingsContext';

interface CaseTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseTrackerModal: React.FC<CaseTrackerModalProps> = ({ isOpen, onClose }) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseRecord>(MOCK_CASES[0]);

  if (!isOpen) return null;

  const filteredCases = MOCK_CASES.filter(
    (c) =>
      c.cnrNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.includes(searchQuery) ||
      c.petitioner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.respondent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.court.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="case-tracker-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="case-tracker-modal-container"
        className={`w-full max-w-5xl h-[88vh] rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${
          isDark
            ? 'bg-[#38231F] border-[#775E57] text-[#F5F1E3]'
            : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#302522]'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#38231F] text-[#F5F1E3] flex items-center justify-between border-b border-[#775E57] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A2F2B] border border-[#C96F5D]/60 flex items-center justify-center text-xl">
              📂
            </div>
            <div>
              <h2 className="font-playfair text-lg sm:text-xl font-bold tracking-wide text-[#F5F1E3]">
                {t.caseTracker.modalTitle}
              </h2>
              <p className="text-xs text-[#E4D8C5] font-medium tracking-wider uppercase">
                {t.caseTracker.modalSubtitle}
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

        {/* Content Body */}
        <div
          className={`flex-1 overflow-hidden flex flex-col md:flex-row ${
            isDark ? 'bg-[#38231F]' : 'bg-[#F5F1E3]'
          }`}
        >
          {/* Left Case List */}
          <div
            className={`w-full md:w-80 border-r flex flex-col overflow-hidden ${
              isDark ? 'bg-[#4A2F2B] border-[#775E57]' : 'bg-[#FFFCF5] border-[#D8CEB6]'
            }`}
          >
            <div className={`p-3 border-b ${isDark ? 'border-[#775E57]' : 'border-[#D8CEB6]'}`}>
              <div className="relative">
                <Search className="w-4 h-4 text-[#A94F43] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={t.caseTracker.searchPlaceholder}
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

            <div className="flex-1 overflow-y-auto divide-y divide-[#775E57]/20 scrollbar-thin">
              {filteredCases.map((cs) => {
                const isSelected = selectedCase.cnrNumber === cs.cnrNumber;
                return (
                  <button
                    key={cs.cnrNumber}
                    onClick={() => setSelectedCase(cs)}
                    className={`w-full text-left p-3.5 transition-colors ${
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
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8E7E2] border border-[#D8CEB6] text-[#A94F43]">
                        {cs.caseType} {cs.caseNumber}/{cs.year}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          cs.status === 'Disposed'
                            ? 'bg-[#DDF5E6] text-[#2F7D4E] border border-[#A7D9B2]'
                            : cs.status === 'Listed'
                            ? 'bg-[#FDF0DA] text-[#A94F43] border border-[#E9C598]'
                            : 'bg-[#EAF1FF] text-[#4969A4] border border-[#B7C7EA]'
                        }`}
                      >
                        {cs.status}
                      </span>
                    </div>

                    <h4
                      className={`text-xs font-bold mt-2 truncate ${
                        isSelected
                          ? isDark
                            ? 'text-[#F5F1E3]'
                            : 'text-[#38231F]'
                          : isDark
                          ? 'text-[#F5F1E3]'
                          : 'text-[#302522]'
                      }`}
                    >
                      {cs.petitioner}
                    </h4>
                    <p
                      className={`text-[11px] truncate ${
                        isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                      }`}
                    >
                      vs. {cs.respondent}
                    </p>
                    <span className={`text-[10px] block mt-1 ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                      {cs.court}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Case Detailed Docket View */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#4A2F2B] border-[#775E57]'
                  : 'bg-[#FFFCF5] border-[#D8CEB6] shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6]">
                    CNR: {selectedCase.cnrNumber}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded border ${isDark ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]' : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'}`}>
                    Stage: {selectedCase.stage}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    selectedCase.status === 'Disposed'
                      ? 'bg-[#DDF5E6] text-[#2F7D4E] border border-[#A7D9B2]'
                      : 'bg-[#FDF0DA] text-[#A94F43] border border-[#E9C598]'
                  }`}
                >
                  Status: {selectedCase.status}
                </span>
              </div>

              <h3
                className={`font-playfair text-xl sm:text-2xl font-bold mt-4 ${
                  isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                }`}
              >
                {selectedCase.petitioner}
              </h3>
              <p
                className={`text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-[#E4D8C5]' : 'text-[#A94F43]'
                }`}
              >
                VERSUS
              </p>
              <h4
                className={`font-playfair text-lg sm:text-xl font-bold ${
                  isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                }`}
              >
                {selectedCase.respondent}
              </h4>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 rounded-xl border text-xs ${
                  isDark
                    ? 'bg-[#38231F] border-[#775E57]'
                    : 'bg-[#F5F1E3] border-[#D8CEB6]'
                }`}
              >
                <div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider block ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    Court & Bench
                  </span>
                  <span
                    className={`font-semibold block mt-0.5 ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    {selectedCase.court} ({selectedCase.bench})
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider block ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    Next Hearing / Listing Date
                  </span>
                  <span className="font-semibold text-[#A94F43] block mt-0.5">
                    {selectedCase.nextHearingDate}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider block ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    Coram / Presiding Bench
                  </span>
                  <span
                    className={`font-semibold block mt-0.5 ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    {selectedCase.coram}
                  </span>
                </div>
              </div>
            </div>

            {/* Case History Timeline */}
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#4A2F2B] border-[#775E57]'
                  : 'bg-[#FFFCF5] border-[#D8CEB6] shadow-xs'
              }`}
            >
              <h4
                className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                  isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                }`}
              >
                Proceedings & Cause List Registry History
              </h4>

              <div className="relative pl-6 border-l-2 border-[#C96F5D]/40 space-y-4 text-xs">
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#A94F43] ring-4 ring-[#4A2F2B]" />
                  <span className="text-[10px] text-[#76665C] font-mono">
                    Next Listing: {selectedCase.nextHearingDate}
                  </span>
                  <p
                    className={`font-semibold ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    Listed for Final Arguments before Division Bench
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#8D7769] ring-4 ring-[#4A2F2B]" />
                  <span className="text-[10px] text-[#76665C] font-mono">Previous Hearing: 14 Oct 2025</span>
                  <p
                    className={`font-semibold ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    Rejoinder affidavit filed by Petitioner Counsel; Registry indexed.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#8D7769] ring-4 ring-[#4A2F2B]" />
                  <span className="text-[10px] text-[#76665C] font-mono">Institution: 04 Jan 2024</span>
                  <p
                    className={`font-semibold ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    Writ Petition Registered & Notice Issued to Respondent Union/State.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
