import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { MainDashboard } from './components/MainDashboard';
import { AILegalBotPage } from './components/AILegalBotPage';
import { BookmarksPage } from './components/BookmarksPage';
import { SettingsPage } from './components/SettingsPage';
import { WelcomeIntroScreen } from './components/WelcomeIntroScreen';
import { ConstitutionModal } from './components/ConstitutionModal';
import { LawsModal } from './components/LawsModal';
import { CourtSystemModal } from './components/CourtSystemModal';
import { SearchModal } from './components/SearchModal';
import { CaseTrackerModal } from './components/CaseTrackerModal';
import { NavItemKey, BookmarkItem } from './types';
import { INITIAL_BOOKMARKS } from './data/legalData';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { JUDICIAL_THEME } from './theme/theme';

const getInitialTabFromPath = (): NavItemKey => {
  if (typeof window === 'undefined') return 'dashboard';
  const path = window.location.pathname.toLowerCase();
  if (path.includes('ai-legal-bot') || path.includes('ai_bot')) return 'ai_bot';
  if (path.includes('bookmarks')) return 'bookmarks';
  if (path.includes('settings')) return 'settings';
  return 'dashboard';
};

const ROUTE_MAP: Record<NavItemKey, string> = {
  dashboard: '/dashboard',
  ai_bot: '/ai-legal-bot',
  bookmarks: '/bookmarks',
  settings: '/settings',
};

const AppContent: React.FC = () => {
  const { settings } = useSettings();
  const isDark = settings.darkMode;
  const isCompact = settings.compactView;

  // Welcome Screen state: shown upon fresh open or page refresh
  const [hasEnteredPortal, setHasEnteredPortal] = useState(false);

  const [activeTab, setActiveTab] = useState<NavItemKey>(getInitialTabFromPath);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Modals state for quick lookup drawers
  const [constitutionOpen, setConstitutionOpen] = useState(false);
  const [lawsOpen, setLawsOpen] = useState(false);
  const [courtSystemOpen, setCourtSystemOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [caseTrackerOpen, setCaseTrackerOpen] = useState(false);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(INITIAL_BOOKMARKS);

  const handleStartPortal = () => {
    setHasEnteredPortal(true);
    const initialTab = getInitialTabFromPath();
    setActiveTab(initialTab);
  };

  // Global Keyboard Shortcut: ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to popstate (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      const tab = getInitialTabFromPath();
      setActiveTab(tab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectNavTab = (key: NavItemKey) => {
    setActiveTab(key);
    const targetRoute = ROUTE_MAP[key] || '/dashboard';
    if (window.location.pathname !== targetRoute) {
      window.history.pushState({ tab: key }, '', targetRoute);
    }
  };

  const handleAddBookmark = (item: {
    title: string;
    category: 'Article' | 'Statute' | 'Judgement' | 'Court Guide';
    reference: string;
  }) => {
    const newBm: BookmarkItem = {
      id: `bm-${Date.now()}`,
      title: item.title,
      category: item.category,
      reference: item.reference,
      savedDate: 'Just now',
    };
    setBookmarks((prev) => [newBm, ...prev]);
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div
      id="justicia-law-portal-root"
      className={`min-h-screen flex flex-col font-inter transition-colors duration-300 ${
        isDark
          ? 'bg-[#38231F] text-[#F5F1E3] selection:bg-[#A94F43]/30 selection:text-[#F5F1E3]'
          : 'bg-[#F5F1E3] text-[#302522] selection:bg-[#A94F43]/20 selection:text-[#302522]'
      }`}
      style={{ backgroundColor: isDark ? '#38231F' : JUDICIAL_THEME.background }}
    >
      {/* 0. Welcome / Intro Experience (Shows upon open/refresh, then transitions smoothly) */}
      {!hasEnteredPortal ? (
        <WelcomeIntroScreen onStartPortal={handleStartPortal} />
      ) : (
        <>
          {/* 1. Fixed Left Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onSelectTab={handleSelectNavTab}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            mobileOpen={isMobileDrawerOpen}
            onCloseMobile={() => setIsMobileDrawerOpen(false)}
            hasEnteredPortal={hasEnteredPortal}
            onStartPortal={handleStartPortal}
          />

          {/* 2. Top Navigation Bar */}
          <TopNav
            onToggleSidebar={() => {
              if (window.innerWidth < 1024) {
                setIsMobileDrawerOpen(!isMobileDrawerOpen);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenSettings={() => handleSelectNavTab('settings')}
            onOpenAiBot={() => handleSelectNavTab('ai_bot')}
            isCollapsed={isSidebarCollapsed}
          />

          {/* 3. Main Viewport Area with Smooth Page Transitions */}
          <main
            id="app-main-viewport"
            className={`flex-1 transition-all duration-300 overflow-x-hidden ${
              isCompact ? 'pt-[56px]' : 'pt-[64px]'
            } ${isSidebarCollapsed ? 'lg:pl-[76px]' : 'lg:pl-[220px]'}`}
          >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            {activeTab === 'dashboard' && (
              <MainDashboard
                onOpenConstitution={() => setConstitutionOpen(true)}
                onOpenLaws={() => setLawsOpen(true)}
                onOpenCourtSystem={() => setCourtSystemOpen(true)}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenAiBot={() => handleSelectNavTab('ai_bot')}
                onOpenCaseTracker={() => setCaseTrackerOpen(true)}
                onSelectTab={handleSelectNavTab}
              />
            )}

            {activeTab === 'ai_bot' && <AILegalBotPage />}

            {activeTab === 'bookmarks' && (
              <BookmarksPage
                bookmarks={bookmarks}
                onRemoveBookmark={handleRemoveBookmark}
                onOpenConstitution={() => setConstitutionOpen(true)}
                onOpenLaws={() => setLawsOpen(true)}
                onOpenCourtSystem={() => setCourtSystemOpen(true)}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsPage onBackToDashboard={() => handleSelectNavTab('dashboard')} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Interactive Legal System Lookup Dialogs */}
      <ConstitutionModal
        isOpen={constitutionOpen}
        onClose={() => setConstitutionOpen(false)}
        onBookmark={handleAddBookmark}
      />

      <LawsModal
        isOpen={lawsOpen}
        onClose={() => setLawsOpen(false)}
        onBookmark={handleAddBookmark}
      />

      <CourtSystemModal
        isOpen={courtSystemOpen}
        onClose={() => setCourtSystemOpen(false)}
        onBookmark={handleAddBookmark}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={() => setConstitutionOpen(true)}
        onSelectStatute={() => setLawsOpen(true)}
        onSelectCourt={() => setCourtSystemOpen(true)}
        onSelectCase={() => setCaseTrackerOpen(true)}
      />

      <CaseTrackerModal
        isOpen={caseTrackerOpen}
        onClose={() => setCaseTrackerOpen(false)}
      />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
