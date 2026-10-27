import React, { useState } from 'react';
import {
  X,
  Landmark,
  Shield,
  ChevronRight,
  Gavel,
  Building2,
  Scale,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { COURT_TIERS } from '../data/legalData';
import { CourtTier } from '../types';
import { useSettings } from '../context/SettingsContext';

interface CourtSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookmark: (item: { title: string; category: 'Court Guide'; reference: string }) => void;
}

export const CourtSystemModal: React.FC<CourtSystemModalProps> = ({
  isOpen,
  onClose,
  onBookmark,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [selectedTier, setSelectedTier] = useState<CourtTier>(COURT_TIERS[0]);

  if (!isOpen) return null;

  return (
    <div
      id="court-system-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="court-system-modal-container"
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
              🏛️
            </div>
            <div>
              <h2 className="font-playfair text-lg sm:text-xl font-bold tracking-wide text-[#F5F1E3]">
                {t.courtSystem.modalTitle}
              </h2>
              <p className="text-xs text-[#E4D8C5] font-medium tracking-wider uppercase">
                {t.courtSystem.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            id="court-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742] transition-colors"
            aria-label="Close Court Explorer"
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
          {/* Left Tier Hierarchy List */}
          <div
            className={`w-full md:w-80 border-r flex flex-col overflow-y-auto divide-y scrollbar-thin ${
              isDark
                ? 'bg-[#4A2F2B] border-[#775E57] divide-[#775E57]/60'
                : 'bg-[#FFFCF5] border-[#D8CEB6] divide-[#D8CEB6]'
            }`}
          >
            <div
              className={`p-3.5 border-b text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'border-[#775E57] text-[#E4D8C5]' : 'border-[#D8CEB6] text-[#A94F43]'
              }`}
            >
              Judicial Hierarchy (Top to Bottom)
            </div>

            {COURT_TIERS.map((tier, index) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier)}
                  className={`w-full text-left p-4 transition-colors flex items-center justify-between ${
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
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#F8E7E2] text-[#A94F43] font-bold flex items-center justify-center text-[10px] border border-[#D8CEB6]">
                        {index + 1}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider ${
                          isDark ? 'text-[#E4D8C5]' : 'text-[#A94F43]'
                        }`}
                      >
                        {tier.level} Tier
                      </span>
                    </div>
                    <h4
                      className={`text-xs font-bold mt-1.5 ${
                        isSelected
                          ? isDark
                            ? 'text-[#F5F1E3]'
                            : 'text-[#38231F]'
                          : isDark
                          ? 'text-[#F5F1E3]'
                          : 'text-[#302522]'
                      }`}
                    >
                      {tier.name}
                    </h4>
                    {tier.hindiName && (
                      <span
                        className={`text-[11px] block mt-0.5 ${
                          isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                        }`}
                      >
                        {tier.hindiName}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#A94F43]' : isDark ? 'text-[#E4D8C5]/60' : 'text-[#76665C]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Tier Detail View */}
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
                    {selectedTier.level} Level Court of Record
                  </span>
                  <h3
                    className={`font-playfair text-2xl font-bold mt-2 ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    {selectedTier.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    Presided By: <strong className="font-semibold text-[#38231F] dark:text-[#F5F1E3]">{selectedTier.presidedBy}</strong>
                  </p>
                </div>

                <button
                  onClick={() =>
                    onBookmark({
                      title: selectedTier.name,
                      category: 'Court Guide',
                      reference: selectedTier.jurisdiction,
                    })
                  }
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors shrink-0 ${
                    isDark
                      ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5] hover:text-[#F5F1E3]'
                      : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F] hover:text-[#A94F43]'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-[#A94F43]" />
                  <span>Bookmark Guide</span>
                </button>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 p-4 rounded-xl border ${
                  isDark
                    ? 'bg-[#38231F] border-[#775E57]'
                    : 'bg-[#F5F1E3] border-[#D8CEB6]'
                }`}
              >
                <div>
                  <span
                    className={`text-[11px] uppercase tracking-wider block ${
                      isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                    }`}
                  >
                    Jurisdiction
                  </span>
                  <span
                    className={`text-xs font-semibold mt-0.5 block ${
                      isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                    }`}
                  >
                    {selectedTier.jurisdiction}
                  </span>
                </div>
                {selectedTier.benchesCount && (
                  <div>
                    <span
                      className={`text-[11px] uppercase tracking-wider block ${
                        isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                      }`}
                    >
                      Benches & Sanctioned Strength
                    </span>
                    <span
                      className={`text-xs font-semibold mt-0.5 block ${
                        isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                      }`}
                    >
                      {selectedTier.benchesCount}
                    </span>
                  </div>
                )}
              </div>

              <p
                className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-[#E4D8C5]' : 'text-[#38231F]'
                }`}
              >
                {selectedTier.description}
              </p>
            </div>

            {/* Constitutional Powers & Authorities */}
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#4A2F2B] border-[#775E57]'
                  : 'bg-[#FFFCF5] border-[#D8CEB6] shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Gavel className="w-4 h-4 text-[#A94F43]" />
                <h4
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                  }`}
                >
                  Key Powers, Writs & Constitutional Mandate
                </h4>
              </div>

              <div className="space-y-2.5">
                {selectedTier.powers.map((power, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                      isDark
                        ? 'bg-[#38231F] border-[#775E57] text-[#E4D8C5]'
                        : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A94F43] shrink-0 mt-0.5" />
                    <span>{power}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
