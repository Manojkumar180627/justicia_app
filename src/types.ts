export type NavItemKey =
  | 'dashboard'
  | 'ai_bot'
  | 'bookmarks'
  | 'settings';

export interface LegalCardItem {
  id: 'constitution' | 'laws' | 'courts';
  title: string;
  subtitle: string;
  iconName: string;
  emoji: string;
  badge: string;
  meta: string;
}

export interface LegalArticle {
  number: string;
  title: string;
  part: string;
  description: string;
  keyCaseLaws: string[];
  tags: string[];
}

export interface LegalStatute {
  id: string;
  title: string;
  shortCode: string;
  year: number;
  category: 'Criminal' | 'Civil' | 'Commercial' | 'Constitutional' | 'Technology';
  description: string;
  totalSections: number;
  enactedBy: string;
  keySections: { section: string; title: string; summary: string }[];
}

export interface CourtTier {
  id: string;
  name: string;
  hindiName?: string;
  level: 'Apex' | 'State' | 'District' | 'Subordinate' | 'Tribunal';
  presidedBy: string;
  jurisdiction: string;
  benchesCount?: string;
  description: string;
  powers: string[];
}

export interface CaseRecord {
  cnrNumber: string;
  caseType: string;
  caseNumber: string;
  year: number;
  petitioner: string;
  respondent: string;
  court: string;
  bench: string;
  stage: string;
  nextHearingDate: string;
  status: 'Pending' | 'Disposed' | 'Reserved' | 'Listed';
  coram: string;
}

export interface LegalNotification {
  id: string;
  title: string;
  category: 'Supreme Court' | 'High Court' | 'Gazette' | 'Bar Council';
  time: string;
  unread: boolean;
  summary: string;
  linkText?: string;
}

export interface BookmarkItem {
  id: string;
  title: string;
  category: 'Article' | 'Statute' | 'Judgement' | 'Court Guide';
  reference: string;
  savedDate: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te';

export interface UserPortalSettings {
  darkMode: boolean;
  compactView: boolean;
  pushNotifications: boolean;
  language: SupportedLanguage;
}
