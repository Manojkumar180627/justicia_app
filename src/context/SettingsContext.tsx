import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPortalSettings, SupportedLanguage } from '../types';
import { translations, TranslationDictionary } from '../i18n/translations';

const SETTINGS_STORAGE_KEY = 'justicia_law_portal_settings_v3';

export const DEFAULT_SETTINGS: UserPortalSettings = {
  darkMode: true,
  compactView: false,
  pushNotifications: true,
  language: 'en',
};

interface ToastState {
  id: number;
  message: string;
  type?: 'info' | 'success' | 'warning';
}

interface SettingsContextType {
  settings: UserPortalSettings;
  updateSetting: <K extends keyof UserPortalSettings>(
    key: K,
    value: UserPortalSettings[K],
    customToast?: string
  ) => void;
  resetDefaults: () => void;
  t: TranslationDictionary;
  toast: ToastState | null;
  dismissToast: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserPortalSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          darkMode: typeof parsed.darkMode === 'boolean' ? parsed.darkMode : DEFAULT_SETTINGS.darkMode,
          compactView: typeof parsed.compactView === 'boolean' ? parsed.compactView : DEFAULT_SETTINGS.compactView,
          pushNotifications: typeof parsed.pushNotifications === 'boolean' ? parsed.pushNotifications : DEFAULT_SETTINGS.pushNotifications,
          language: ['en', 'hi', 'ta', 'te'].includes(parsed.language) ? parsed.language : DEFAULT_SETTINGS.language,
        };
      }
    } catch {
      // Ignore localStorage parse error
    }
    return DEFAULT_SETTINGS;
  });

  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore
    }

    // Apply dark mode class and data attributes to document root
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    if (settings.compactView) {
      root.setAttribute('data-compact', 'true');
    } else {
      root.removeAttribute('data-compact');
    }
  }, [settings]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'success') => {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  };

  const dismissToast = () => setToast(null);

  // Auto dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const t = translations[settings.language] || translations.en;

  const updateSetting = <K extends keyof UserPortalSettings>(
    key: K,
    value: UserPortalSettings[K],
    customToast?: string
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };

      // Handle browser notification permissions if turning pushNotifications on
      if (key === 'pushNotifications' && value === true) {
        if (typeof window !== 'undefined' && 'Notification' in window) {
          if (Notification.permission === 'default') {
            Notification.requestPermission().then((perm) => {
              if (perm === 'granted') {
                try {
                  new Notification('Justicia Law Portal', {
                    body: '🔔 Legal Hearing Reminders & Sanhitas Alerts enabled.',
                    icon: '/favicon.ico',
                  });
                } catch {
                  // Ignore
                }
              }
            });
          } else if (Notification.permission === 'granted') {
            try {
              new Notification('Justicia Law Portal', {
                body: '🔔 Push Notifications active.',
                icon: '/favicon.ico',
              });
            } catch {
              // Ignore
            }
          }
        }
      }

      return next;
    });

    // Provide friendly toast messages
    if (customToast) {
      showToast(customToast);
    } else {
      if (key === 'darkMode') {
        showToast(value ? 'Dark mode enabled' : 'Light mode enabled');
      } else if (key === 'compactView') {
        showToast(value ? 'Compact view enabled' : 'Normal view restored');
      } else if (key === 'pushNotifications') {
        showToast(value ? 'Push notifications enabled' : 'Push notifications disabled');
      } else if (key === 'language') {
        const langNames: Record<SupportedLanguage, string> = {
          en: 'English',
          hi: 'हिन्दी (Hindi)',
          ta: 'தமிழ் (Tamil)',
          te: 'తెలుగు (Telugu)',
        };
        showToast(`Language changed to ${langNames[value as SupportedLanguage] || value}`);
      }
    }
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    showToast(t.settings.toastDefaultsRestored);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetDefaults,
        t,
        toast,
        dismissToast,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
