import React from 'react';
import { Check, CheckCircle2, ArrowLeft, RotateCcw, Bell, Moon, Sliders, Globe } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useSettings } from '../context/SettingsContext';

interface SettingsPageProps {
  onBackToDashboard?: () => void;
}

interface LanguageOption {
  key: SupportedLanguage;
  label: string;
  nativeLabel: string;
  region: string;
}

const LANGUAGES: LanguageOption[] = [
  { key: 'en', label: 'English', nativeLabel: 'English', region: 'Pan-India & High Courts' },
  { key: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', region: 'Supreme Court & Official' },
  { key: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', region: 'Madras High Court & State' },
  { key: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', region: 'AP & Telangana High Courts' },
];

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBackToDashboard }) => {
  const { settings, updateSetting, resetDefaults, t, toast } = useSettings();

  const isDark = settings.darkMode;
  const isCompact = settings.compactView;

  const handleToggle = (key: 'darkMode' | 'compactView' | 'pushNotifications') => {
    updateSetting(key, !settings[key]);
  };

  const handleLanguageChange = (langKey: SupportedLanguage) => {
    updateSetting('language', langKey);
  };

  return (
    <div
      id="justicia-settings-page"
      className={`w-full min-h-[calc(100vh-64px)] flex flex-col font-inter transition-colors duration-300 ${
        isCompact ? 'px-4 sm:px-6 py-5 md:py-8' : 'px-4 sm:px-6 md:px-8 py-8 md:py-12'
      } ${
        isDark
          ? 'bg-[#38231F] text-[#F5F1E3] selection:bg-[#C96F5D]/30 selection:text-[#F5F1E3]'
          : 'bg-[#F5F1E3] text-[#302522] selection:bg-[#A94F43]/20 selection:text-[#38231F]'
      }`}
    >
      {/* Centered Constrained Container (900px - 1000px) */}
      <div className="w-full max-w-[1000px] mx-auto flex flex-col">
        {/* Navigation Breadcrumb / Back Action */}
        {onBackToDashboard && (
          <button
            id="settings-back-to-dashboard-btn"
            onClick={onBackToDashboard}
            className={`self-start inline-flex items-center gap-2 text-xs font-medium mb-6 transition-colors duration-200 group ${
              isDark ? 'text-[#E4D8C5] hover:text-[#F5F1E3]' : 'text-[#76665C] hover:text-[#38231F]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span>{t.settings.returnToDashboard}</span>
          </button>
        )}

        {/* Page Header */}
        <header
          id="settings-page-header"
          className={`${isCompact ? 'mb-6 sm:mb-8' : 'mb-10 sm:mb-12'}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6]">
                  {t.nav.securePortal}
                </span>
                <span className={`text-xs ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                  {t.nav.version}
                </span>
              </div>
              <h1
                id="settings-heading-title"
                className={`font-playfair font-bold tracking-tight leading-tight ${
                  isCompact ? 'text-[24px] sm:text-[28px]' : 'text-[28px] sm:text-[32px]'
                } ${isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'}`}
              >
                {t.settings.pageTitle}
              </h1>
              <p
                id="settings-heading-subtitle"
                className={`mt-2 font-normal leading-relaxed ${
                  isCompact ? 'text-[13px] sm:text-[14px]' : 'text-[15px] sm:text-[16px]'
                } ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}
              >
                {t.settings.pageSubtitle}
              </p>
            </div>

            {/* Quick Reset Button */}
            <button
              id="settings-reset-defaults-btn"
              onClick={resetDefaults}
              className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 shadow-xs ${
                isDark
                  ? 'bg-[#4A2F2B] hover:bg-[#5B4742] border-[#775E57] hover:border-[#C96F5D]/70 text-[#E4D8C5] hover:text-[#F5F1E3]'
                  : 'bg-[#FFFCF5] hover:bg-[#F8F1E7] border-[#D8CEB6] hover:border-[#A94F43] text-[#38231F] hover:text-[#A94F43]'
              }`}
              title="Reset all preferences to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#A94F43]" />
              <span>{t.settings.resetDefaults}</span>
            </button>
          </div>
        </header>

        {/* Settings Sections Container */}
        <div className={`flex flex-col ${isCompact ? 'space-y-6 sm:space-y-8' : 'space-y-10 sm:space-y-12'}`}>
          {/* ========================================================================= */}
          {/* SECTION 1 — APPEARANCE                                                    */}
          {/* ========================================================================= */}
          <section id="settings-section-appearance" aria-labelledby="heading-appearance">
            <div className="flex items-center gap-2 mb-3 select-none">
              <Moon className="w-4 h-4 text-[#A94F43]" />
              <h2
                id="heading-appearance"
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[2px] text-[#A94F43]"
              >
                {t.settings.appearance}
              </h2>
            </div>

            <div className={`flex flex-col ${isCompact ? 'space-y-2.5' : 'space-y-4'}`}>
              {/* Setting Card 1 — Dark Mode */}
              <div
                id="setting-card-dark-mode"
                className={`group relative w-full rounded-[16px] border flex items-center justify-between gap-4 transition-all duration-250 ease-out hover:-translate-y-0.5 ${
                  isCompact ? 'min-h-[72px] p-4' : 'min-h-[86px] p-5 sm:p-6'
                } ${
                  isDark
                    ? 'bg-[#4A2F2B] hover:bg-[#5B4742] border-[#775E57] hover:border-[#C96F5D]/70 shadow-[0_4px_20px_rgba(0,0,0,0.18)]'
                    : 'bg-[#FFFCF5] hover:bg-[#F8F1E7] border-[#D8CEB6] hover:border-[#A94F43] shadow-xs'
                }`}
              >
                <div className="flex flex-col text-left pr-2">
                  <span
                    className={`font-semibold leading-tight transition-colors ${
                      isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                    } ${isDark ? 'text-[#F5F1E3] group-hover:text-white' : 'text-[#302522] group-hover:text-[#38231F]'}`}
                  >
                    {t.settings.darkModeTitle}
                  </span>
                  <span
                    className={`mt-1 leading-snug ${
                      isCompact ? 'text-[12px] sm:text-[13px]' : 'text-[13px] sm:text-[14px]'
                    } ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}
                  >
                    {t.settings.darkModeSub}
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  id="toggle-dark-mode"
                  type="button"
                  role="switch"
                  aria-checked={settings.darkMode}
                  aria-label="Toggle Dark Mode"
                  onClick={() => handleToggle('darkMode')}
                  className={`relative shrink-0 w-13 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C96F5D]/40 hover:shadow-[0_0_12px_rgba(201,111,93,0.28)] ${
                    settings.darkMode ? 'bg-[#C96F5D]' : 'bg-[#D8CEB6]'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Setting Card 2 — Compact View */}
              <div
                id="setting-card-compact-view"
                className={`group relative w-full rounded-[16px] border flex items-center justify-between gap-4 transition-all duration-250 ease-out hover:-translate-y-0.5 ${
                  isCompact ? 'min-h-[72px] p-4' : 'min-h-[86px] p-5 sm:p-6'
                } ${
                  isDark
                    ? 'bg-[#4A2F2B] hover:bg-[#5B4742] border-[#775E57] hover:border-[#C96F5D]/70 shadow-[0_4px_20px_rgba(0,0,0,0.18)]'
                    : 'bg-[#FFFCF5] hover:bg-[#F8F1E7] border-[#D8CEB6] hover:border-[#A94F43] shadow-xs'
                }`}
              >
                <div className="flex flex-col text-left pr-2">
                  <span
                    className={`font-semibold leading-tight transition-colors ${
                      isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                    } ${isDark ? 'text-[#F5F1E3] group-hover:text-white' : 'text-[#302522] group-hover:text-[#38231F]'}`}
                  >
                    {t.settings.compactViewTitle}
                  </span>
                  <span
                    className={`mt-1 leading-snug ${
                      isCompact ? 'text-[12px] sm:text-[13px]' : 'text-[13px] sm:text-[14px]'
                    } ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}
                  >
                    {t.settings.compactViewSub}
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  id="toggle-compact-view"
                  type="button"
                  role="switch"
                  aria-checked={settings.compactView}
                  aria-label="Toggle Compact View"
                  onClick={() => handleToggle('compactView')}
                  className={`relative shrink-0 w-13 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C96F5D]/40 hover:shadow-[0_0_12px_rgba(201,111,93,0.28)] ${
                    settings.compactView ? 'bg-[#C96F5D]' : 'bg-[#D8CEB6]'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                      settings.compactView ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2 — NOTIFICATIONS                                                 */}
          {/* ========================================================================= */}
          <section id="settings-section-notifications" aria-labelledby="heading-notifications">
            <div className="flex items-center gap-2 mb-3 select-none">
              <Bell className="w-4 h-4 text-[#A94F43]" />
              <h2
                id="heading-notifications"
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[2px] text-[#A94F43]"
              >
                {t.settings.notifications}
              </h2>
            </div>

            {/* Push Notifications Card */}
            <div
              id="setting-card-push-notifications"
              className={`group relative w-full rounded-[16px] border flex items-center justify-between gap-4 transition-all duration-250 ease-out hover:-translate-y-0.5 ${
                isCompact ? 'min-h-[72px] p-4' : 'min-h-[86px] p-5 sm:p-6'
              } ${
                isDark
                  ? 'bg-[#4A2F2B] hover:bg-[#5B4742] border-[#775E57] hover:border-[#C96F5D]/70 shadow-[0_4px_20px_rgba(0,0,0,0.18)]'
                  : 'bg-[#FFFCF5] hover:bg-[#F8F1E7] border-[#D8CEB6] hover:border-[#A94F43] shadow-xs'
              }`}
            >
              <div className="flex flex-col text-left pr-2">
                <span
                  className={`font-semibold leading-tight transition-colors ${
                    isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                  } ${isDark ? 'text-[#F5F1E3] group-hover:text-white' : 'text-[#302522] group-hover:text-[#38231F]'}`}
                >
                  {t.settings.pushNotificationsTitle}
                </span>
                <span
                  className={`mt-1 leading-snug ${
                    isCompact ? 'text-[12px] sm:text-[13px]' : 'text-[13px] sm:text-[14px]'
                  } ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}
                >
                  {t.settings.pushNotificationsSub}
                </span>
              </div>

              {/* Toggle Switch */}
              <button
                id="toggle-push-notifications"
                type="button"
                role="switch"
                aria-checked={settings.pushNotifications}
                aria-label="Toggle Push Notifications"
                onClick={() => handleToggle('pushNotifications')}
                className={`relative shrink-0 w-13 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C96F5D]/40 hover:shadow-[0_0_12px_rgba(201,111,93,0.28)] ${
                  settings.pushNotifications ? 'bg-[#C96F5D]' : 'bg-[#D8CEB6]'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3 — LANGUAGE & REGION                                             */}
          {/* ========================================================================= */}
          <section id="settings-section-language-region" aria-labelledby="heading-language-region">
            <div className="flex items-center gap-2 mb-3 select-none">
              <Globe className="w-4 h-4 text-[#A94F43]" />
              <h2
                id="heading-language-region"
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[2px] text-[#A94F43]"
              >
                {t.settings.languageRegion}
              </h2>
            </div>

            {/* Language Selection Card */}
            <div
              id="setting-card-language-selection"
              className={`w-full rounded-[16px] border flex flex-col transition-all duration-250 ease-out ${
                isCompact ? 'p-4 sm:p-5' : 'p-6 sm:p-7'
              } ${
                isDark
                  ? 'bg-[#4A2F2B] border-[#775E57] shadow-[0_4px_20px_rgba(0,0,0,0.18)]'
                  : 'bg-[#FFFCF5] border-[#D8CEB6] shadow-xs'
              }`}
            >
              <div className="mb-4">
                <h3
                  className={`font-semibold leading-tight ${
                    isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                  } ${isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'}`}
                >
                  {t.settings.interfaceLanguageTitle}
                </h3>
                <p
                  className={`mt-1 text-[13px] ${
                    isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                  }`}
                >
                  {t.settings.interfaceLanguageSub}
                </p>
              </div>

              {/* Segmented Options Button Group */}
              <div
                id="language-options-group"
                role="radiogroup"
                aria-label="Interface Language Selection"
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1"
              >
                {LANGUAGES.map((lang) => {
                  const isSelected = settings.language === lang.key;

                  return (
                    <button
                      key={lang.key}
                      id={`language-option-${lang.key}`}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleLanguageChange(lang.key)}
                      className={`h-[46px] px-4 rounded-xl text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 transition-all duration-250 select-none cursor-pointer focus:outline-hidden ${
                        isSelected
                          ? isDark
                            ? 'bg-[#F8E7E2] border-2 border-[#C96F5D] text-[#38231F] shadow-[0_0_14px_rgba(201,111,93,0.2)] font-semibold'
                            : 'bg-[#F8E7E2] border-2 border-[#A94F43] text-[#38231F] shadow-xs font-semibold'
                          : isDark
                          ? 'bg-[#513C37] border border-[#775E57] text-[#E4D8C5] hover:border-[#C96F5D] hover:text-[#F5F1E3] hover:bg-[#5B4742]'
                          : 'bg-[#F5F1E3] border border-[#D8CEB6] text-[#38231F] hover:border-[#A94F43] hover:text-[#A94F43] hover:bg-[#F8E7E2]'
                      }`}
                    >
                      <span className="truncate">{lang.nativeLabel}</span>
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 stroke-[2.5] ${
                            isDark ? 'text-[#A94F43]' : 'text-[#A94F43]'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Context Note for Legal Texts */}
              <div
                className={`mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] ${
                  isDark ? 'border-[#775E57]/70 text-[#E4D8C5]' : 'border-[#D8CEB6] text-[#76665C]'
                }`}
              >
                <span>{t.settings.dualDiglotNote}</span>
                <span className="text-[#A94F43] font-medium shrink-0">
                  {t.settings.autoSyncBadge}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Global Floating Toast */}
        {toast && (
          <div
            id="settings-toast-notification"
            role="status"
            aria-live="polite"
            className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              isDark
                ? 'bg-[#513C37] text-[#F5F1E3] border border-[#C96F5D]/70'
                : 'bg-[#38231F] text-[#FFFCF5] border border-[#A94F43]/40'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#C96F5D] shrink-0" />
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
