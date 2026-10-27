import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Bookmark,
  Settings,
  ChevronRight,
  ShieldCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { NavItemKey } from '../types';
import { useSettings } from '../context/SettingsContext';

interface SidebarProps {
  activeTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  hasEnteredPortal?: boolean;
  onStartPortal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  mobileOpen,
  onCloseMobile,
  hasEnteredPortal = true,
  onStartPortal,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;
  const isCompact = settings.compactView;

  const navItems: {
    key: NavItemKey;
    label: string;
    icon: React.ElementType;
    badge?: string;
    route: string;
    isStartItem?: boolean;
  }[] = !hasEnteredPortal
    ? [
        {
          key: 'dashboard' as NavItemKey,
          label: 'Start Portal',
          icon: Sparkles,
          badge: 'START',
          route: '/',
          isStartItem: true,
        },
      ]
    : [
        { key: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard, route: '/dashboard' },
        { key: 'ai_bot', label: t.nav.ai_bot, icon: Bot, badge: 'AI', route: '/ai-legal-bot' },
        { key: 'bookmarks', label: t.nav.bookmarks, icon: Bookmark, route: '/bookmarks' },
        { key: 'settings', label: t.nav.settings, icon: Settings, route: '/settings' },
      ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        id="app-left-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r ${
          isDark
            ? 'bg-[#38231F] text-[#F5F1E3] border-[#775E57]'
            : 'bg-[#F5F1E3] text-[#302522] border-[#D8CEB6]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${
          isCollapsed ? 'lg:w-[76px]' : 'lg:w-[220px]'
        } w-[240px]`}
      >
        {/* Top Logo Area */}
        <div
          id="sidebar-logo-container"
          className={`h-[64px] flex items-center justify-between px-4 border-b select-none ${
            isDark ? 'border-[#775E57] bg-[#4A2F2B]' : 'border-[#D8CEB6] bg-[#E8E1C8]'
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              id="sidebar-brand-icon"
              className={`w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center text-lg shadow-sm ${
                isDark ? 'bg-[#A94F43] border-[#C96F5D]' : 'bg-[#A94F43] border-[#C96F5D]'
              }`}
              title="Justicia - Indian Legal System"
            >
              ⚖️
            </div>
            {(!isCollapsed || mobileOpen) && (
              <div className="flex flex-col min-w-0">
                <span className={`font-serif-legal font-bold tracking-[2.5px] text-[15px] leading-tight truncate ${
                  isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                }`}>
                  {t.nav.brandName}
                </span>
                <span className={`text-[9px] uppercase tracking-[2px] font-medium leading-tight ${
                  isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                }`}>
                  {t.nav.brandTag}
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            id="sidebar-mobile-close-btn"
            onClick={onCloseMobile}
            className={`lg:hidden p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742]' : 'text-[#76665C] hover:text-[#302522] hover:bg-[#EDE3D1]'
            }`}
            aria-label="Close sidebar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav
          id="sidebar-nav-list"
          className={`flex-1 overflow-y-auto px-2.5 scrollbar-thin ${
            isCompact ? 'py-2.5 space-y-1' : 'py-4 space-y-1.5'
          }`}
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <div key={item.key} className="relative group">
                <button
                  id={`nav-item-${item.key}`}
                  onClick={() => {
                    if (item.isStartItem && onStartPortal) {
                      onStartPortal();
                    } else {
                      onSelectTab(item.key);
                    }
                    if (mobileOpen) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3 rounded-xl text-left text-[13px] font-medium transition-all duration-300 ease-out select-none ${
                    isCompact ? 'py-2' : 'py-2.5'
                  } ${
                    isActive
                      ? 'bg-[#A94F43] text-[#FFFFFF] border border-[#A94F43] shadow-sm'
                      : isDark
                        ? 'text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742] border border-transparent'
                        : 'text-[#76665C] hover:text-[#302522] hover:bg-[#EDE3D1] border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Left Accent indicator for active */}
                  {isActive && (
                    <span
                      id={`active-pill-${item.key}`}
                      className="absolute left-1 top-2 bottom-2 w-1 bg-[#FFFFFF] rounded-full shadow-[0_0_8px_rgba(169,79,67,0.6)]"
                    />
                  )}

                  {/* Icon */}
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-transform duration-300 ${
                      isActive ? 'text-[#FFFFFF] scale-105' : isDark ? 'text-[#E4D8C5] group-hover:text-[#F5F1E3]' : 'text-[#76665C] group-hover:text-[#302522]'
                    }`}
                  />

                  {/* Label (if not collapsed or in mobile drawer) */}
                  {(!isCollapsed || mobileOpen) && (
                    <span className="flex-1 truncate tracking-wide text-xs sm:text-[13px]">
                      {item.label}
                    </span>
                  )}

                  {/* AI or Sub-badge */}
                  {item.badge && (!isCollapsed || mobileOpen) && (
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                      isDark ? 'bg-[#C96F5D]/20 text-[#F5F1E3] border-[#C96F5D]/35' : 'bg-[#F8E7E2] text-[#A94F43] border-[#D8CEB6]'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Right chevron for active item if not collapsed */}
                  {isActive && (!isCollapsed || mobileOpen) && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#FFFFFF] opacity-80 shrink-0" />
                  )}
                </button>

                {/* Tooltip for collapsed desktop state */}
                {isCollapsed && !mobileOpen && (
                  <div className={`hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2.5 px-2.5 py-1 text-xs rounded-md shadow-lg border whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 ${
                    isDark ? 'bg-[#4A2F2B] text-[#F5F1E3] border-[#775E57]' : 'bg-[#FFFCF5] text-[#302522] border-[#D8CEB6]'
                  }`}>
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Bottom Section: Divider + Secure Portal */}
        <div
          id="sidebar-bottom-section"
          className={`p-3 border-t flex flex-col gap-2 select-none ${
            isDark ? 'border-[#775E57] bg-[#4A2F2B]' : 'border-[#D8CEB6] bg-[#E8E1C8]'
          }`}
        >
          {(!isCollapsed || mobileOpen) ? (
            <div className={`flex items-center justify-between px-2 py-1 ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A94F43] shrink-0" />
                <span className={`text-[11px] tracking-wide font-medium truncate ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                  {t.nav.securePortal}
                </span>
              </div>
              <span className={`text-[10px] font-mono ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                {settings.language.toUpperCase()}
              </span>
            </div>
          ) : (
            <div
              className={`flex items-center justify-center py-1 ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}
              title={`${t.nav.securePortal} – 256-bit Encrypted Judicial Network`}
            >
              <ShieldCheck className="w-4 h-4 text-[#A94F43]" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
