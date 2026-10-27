import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  Search,
  Bell,
  Settings as SettingsIcon,
  Sparkles,
} from 'lucide-react';
import { RECENT_NOTIFICATIONS } from '../data/legalData';
import { useSettings } from '../context/SettingsContext';

interface TopNavProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenAiBot: () => void;
  isCollapsed: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenSettings,
  onOpenAiBot,
  isCollapsed,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;
  const isCompact = settings.compactView;

  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState(RECENT_NOTIFICATIONS);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const notifRef = useRef<HTMLDivElement>(null);
  const notifButtonRef = useRef<HTMLButtonElement>(null);
  const notifPanelRef = useRef<HTMLDivElement>(null);

  const unreadCount = settings.pushNotifications
    ? notifications.filter((n) => n.unread).length
    : 0;

  const updateNotifPosition = () => {
    const button = notifButtonRef.current;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const panelWidth = Math.min(window.innerWidth - 24, 384);
    const panelHeight = Math.min(window.innerHeight - 80, 360);
    const left = Math.min(
      Math.max(12, buttonRect.right - panelWidth + 4),
      window.innerWidth - panelWidth - 12
    );
    const top = Math.max(12, Math.min(buttonRect.bottom + 8, window.innerHeight - panelHeight - 12));

    setMenuPosition({
      top,
      left,
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        notifButtonRef.current && notifButtonRef.current.contains(target)
      ) {
        return;
      }

      if (
        notifPanelRef.current &&
        !notifPanelRef.current.contains(target) &&
        notifRef.current &&
        !notifRef.current.contains(target)
      ) {
        setNotifPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!notifPanelOpen) return;

    updateNotifPosition();

    const handleResize = () => updateNotifPosition();
    const handleScroll = () => updateNotifPosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [notifPanelOpen]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const notifPanel = notifPanelOpen
    ? createPortal(
        <div
          ref={notifPanelRef}
          id="topnav-notifications-dropdown"
          className={`fixed rounded-2xl shadow-2xl overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200 border ${
            isDark
              ? 'bg-[#4A2F2B] border-[#775E57]'
              : 'bg-[#FFFCF5] border-[#D8CEB6]'
          }`}
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            width: 'min(92vw, 24rem)',
            maxWidth: '24rem',
            maxHeight: 'min(70vh, 22rem)',
            zIndex: 60,
          }}
        >
          <div
            className={`px-4 py-3 border-b flex items-center justify-between ${
              isDark
                ? 'bg-[#38231F] border-[#775E57]'
                : 'bg-[#F5F1E3] border-[#D8CEB6]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#C96F5D]' : 'text-[#A94F43]'
                }`}
              >
                {t.topNav.notifications}
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-[#A94F43]/15 text-[#A94F43] px-1.5 py-0.5 rounded-full border border-[#A94F43]/30">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className={`text-[11px] transition-colors ${
                  isDark
                    ? 'text-[#E4D8C5] hover:text-[#F5F1E3]'
                    : 'text-[#76665C] hover:text-[#302522]'
                }`}
              >
                {t.topNav.markAllRead}
              </button>
            )}
          </div>

          <div className="max-h-[320px] overflow-y-auto divide-y divide-[#D8CEB6]/50 scrollbar-thin">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`px-4 py-3 transition-colors ${
                  isDark ? 'bg-[#4A2F2B]/60 hover:bg-[#5B4742]' : 'bg-[#FFFCF5] hover:bg-[#F5F1E3]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-2 h-2 rounded-full ${
                      item.unread ? 'bg-[#A94F43]' : 'bg-[#C96F5D]'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-[12px] font-semibold ${isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'}`}>
                        {item.title}
                      </p>
                      <span className={`text-[10px] ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                        {item.time}
                      </span>
                    </div>
                    <p className={`mt-1 text-[11px] leading-relaxed ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header
        id="app-top-header"
        className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
          isCompact ? 'h-[56px]' : 'h-[64px]'
        } ${
          isDark
            ? 'bg-[#38231F] text-[#F5F1E3] border-b border-[#775E57]'
            : 'bg-[#FFFCF5] text-[#302522] border-b border-[#D8CEB6] shadow-xs'
        } ${isCollapsed ? 'left-0 lg:left-[76px]' : 'left-0 lg:left-[220px]'}`}
      >
        <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left Side: Hamburger & Search */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
            {/* Hamburger Menu Icon */}
            <button
              id="topnav-hamburger-btn"
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl active:scale-95 transition-all duration-200 ${
                isDark
                  ? 'text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742]'
                  : 'text-[#76665C] hover:text-[#302522] hover:bg-[#EDE3D1]'
              }`}
              aria-label="Toggle sidebar navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div
              id="topnav-search-wrapper"
              className="relative w-full max-w-[320px] sm:max-w-[400px]"
            >
              <div
                onClick={onOpenSearch}
                className={`w-full px-3.5 pl-10 rounded-xl flex items-center justify-between cursor-pointer group transition-all duration-300 ${
                  isCompact ? 'h-9 text-xs' : 'h-10 text-xs sm:text-[13px]'
                } ${
                  isDark
                    ? 'bg-[#4A2F2B] text-[#E4D8C5] border border-[#775E57] hover:border-[#C96F5D]/60 shadow-inner'
                    : 'bg-[#F5F1E3] text-[#76665C] border border-[#D8CEB6] hover:border-[#A94F43]/60 shadow-xs'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSearch();
                  }
                }}
                aria-label={t.topNav.searchPlaceholder}
              >
                <Search
                  className={`w-4 h-4 absolute left-3.5 transition-colors ${
                    isDark
                      ? 'text-[#E4D8C5] group-hover:text-[#C96F5D]'
                      : 'text-[#76665C] group-hover:text-[#A94F43]'
                  }`}
                />
                <span
                  className={`font-normal truncate ${
                    isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                  }`}
                >
                  {t.topNav.searchPlaceholder}
                </span>
              </div>
            </div>

          </div>

          {/* Right Side: Quick Action + Notifications + User Profile */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Quick AI Bot Launcher Pill */}
            <button
              id="topnav-ai-bot-btn"
              onClick={onOpenAiBot}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-[#4A2F2B] border border-[#C96F5D]/40 text-[#F5F1E3] hover:border-[#C96F5D] hover:shadow-[0_0_12px_rgba(201,111,93,0.25)]'
                  : 'bg-[#F5F1E3] border border-[#A94F43]/40 text-[#A94F43] hover:bg-[#EDE3D1]'
              }`}
              title="Ask Indian Legal AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="tracking-wide">{t.topNav.aiAssistant}</span>
            </button>


            {/* Portal Settings Direct Action Button */}
            <button
              id="topnav-settings-btn"
              onClick={onOpenSettings}
              className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-200 select-none ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={t.topNav.portalSettings}
              aria-label={t.topNav.portalSettings}
            >
              <SettingsIcon className="w-5 h-5 text-[#A94F43]" />
              <span className="hidden md:inline text-xs font-medium tracking-wide">
                {t.topNav.portalSettings}
              </span>
            </button>
          </div>
        </div>
      </header>
      {notifPanel}
    </>
  );
};
