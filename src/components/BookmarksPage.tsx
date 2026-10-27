import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  Search,
  BookOpen,
  Scale,
  Landmark,
  FileText,
  Copy,
  Check,
  Download,
  Filter,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { BookmarkItem } from '../types';
import { useSettings } from '../context/SettingsContext';

interface BookmarksPageProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onOpenConstitution?: () => void;
  onOpenLaws?: () => void;
  onOpenCourtSystem?: () => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarks,
  onRemoveBookmark,
  onOpenConstitution,
  onOpenLaws,
  onOpenCourtSystem,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(bookmarks.map((b) => b.category)))];

  const filteredBookmarks = bookmarks.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExportBookmarks = () => {
    const exportText = bookmarks
      .map(
        (b, i) =>
          `${i + 1}. [${b.category}] ${b.title}\n   Reference: ${b.reference}\n   Saved: ${b.savedDate}\n`
      )
      .join('\n');

    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `justicia-legal-bookmarks-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('constitution') || cat.includes('article')) return Scale;
    if (cat.includes('court') || cat.includes('jurisdiction')) return Landmark;
    if (cat.includes('sanhita') || cat.includes('act') || cat.includes('law')) return BookOpen;
    return FileText;
  };

  return (
    <div
      id="bookmarks-page-root"
      className={`min-h-[calc(100vh-64px)] flex flex-col ${
        isDark ? 'bg-[#38231F] text-[#F5F1E3]' : 'bg-[#F5F1E3] text-[#302522]'
      }`}
    >
      {/* 1. Page Header */}
      <div
        className={`px-6 py-6 border-b sticky top-0 z-10 backdrop-blur-md transition-colors ${
          isDark ? 'bg-[#4A2F2B]/90 border-[#775E57]' : 'bg-[#FFFCF5]/90 border-[#D8CEB6]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#A94F43] to-[#38231F] border border-[#D8CEB6]/60 flex items-center justify-center text-[#FFFCF5] shadow-md">
              <Bookmark className="w-6 h-6 text-[#FFFCF5]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1
                  className={`font-playfair text-xl sm:text-2xl font-bold tracking-wide ${
                    isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                  }`}
                >
                  SAVED LEGAL REPOSITORY
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6] uppercase tracking-wider">
                  {bookmarks.length} {bookmarks.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm mt-0.5 ${
                  isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                }`}
              >
                Constitutional Articles, Central Statutes, Criminal Codes & Judicial Precedents
              </p>
            </div>
          </div>

          {/* Export / Quick Actions */}
          {bookmarks.length > 0 && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleExportBookmarks}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-[#4A2F2B] border-[#775E57] text-[#F5F1E3] hover:text-[#F5F1E3] hover:border-[#C96F5D]'
                    : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#38231F] hover:text-[#A94F43] hover:border-[#A94F43] shadow-xs'
                }`}
                title="Export saved references to text file"
              >
                <Download className="w-4 h-4 text-[#A94F43]" />
                <span>Export Brief</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:max-w-md">
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved articles, statutory sections, or keywords..."
              className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border transition-all focus:outline-hidden ${
                isDark
                  ? 'bg-[#513C37] text-[#F5F1E3] placeholder-[#E4D8C5] border-[#775E57] focus:border-[#C96F5D]'
                  : 'bg-[#FFFCF5] text-[#302522] placeholder-[#76665C] border-[#D8CEB6] focus:border-[#A94F43] shadow-xs'
              }`}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 text-xs scrollbar-none">
            <span
              className={`font-semibold shrink-0 flex items-center gap-1 text-[11px] ${
                isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-[#A94F43]" />
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#A94F43] text-[#FFFFFF] border-[#A94F43] shadow-sm'
                    : isDark
                    ? 'bg-[#513C37] border-[#775E57] text-[#F5F1E3] hover:text-[#FFFFFF] hover:border-[#C96F5D]'
                    : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#38231F] hover:text-[#A94F43] hover:border-[#A94F43] shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Bookmarks Grid List */}
        {filteredBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookmarks.map((bm) => {
              const Icon = getCategoryIcon(bm.category);
              return (
                <div
                  key={bm.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group ${
                    isDark
                      ? 'bg-[#513C37] border-[#775E57] hover:border-[#C96F5D] hover:bg-[#5B4742]'
                      : 'bg-[#FFFCF5] border-[#D8CEB6] hover:border-[#A94F43] hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Category Pill & Saved Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6]">
                        <Icon className="w-3 h-3 text-[#A94F43]" />
                        <span>{bm.category}</span>
                      </span>
                      <span
                        className={`text-[10px] font-medium ${
                          isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
                        }`}
                      >
                        {bm.savedDate}
                      </span>
                    </div>

                    {/* Bookmark Title */}
                    <h3
                      className={`font-semibold text-sm leading-snug mb-2 ${
                        isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'
                      }`}
                    >
                      {bm.title}
                    </h3>

                    {/* Reference / Citation text */}
                    <div
                      className={`rounded-2xl border p-3 text-[11px] leading-relaxed ${
                        isDark
                          ? 'bg-[#4A2F2B] border-[#775E57] text-[#E4D8C5]'
                          : 'bg-[#F5F1E3] border-[#D8CEB6] text-[#38231F]'
                      }`}
                    >
                      <span className="font-semibold block mb-1 text-[#A94F43]">Reference</span>
                      {bm.reference}
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleCopyCitation(bm.reference, bm.id)}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium rounded-xl border px-2.5 py-1.5 transition-all ${
                        copiedId === bm.id
                          ? 'bg-[#F8E7E2] border-[#A94F43] text-[#A94F43]'
                          : isDark
                          ? 'bg-[#4A2F2B] border-[#775E57] text-[#E4D8C5] hover:border-[#C96F5D]'
                          : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#38231F] hover:border-[#A94F43]'
                      }`}
                    >
                      {copiedId === bm.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === bm.id ? 'Copied' : 'Copy'}
                    </button>

                    <button
                      onClick={() => onRemoveBookmark(bm.id)}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium rounded-xl border px-2.5 py-1.5 transition-all ${
                        isDark
                          ? 'bg-[#4A2F2B] border-[#775E57] text-[#E4D8C5] hover:border-[#C96F5D]'
                          : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#38231F] hover:border-[#A94F43]'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className={`max-w-md w-full text-center rounded-3xl border p-8 ${
              isDark ? 'bg-[#513C37] border-[#775E57] text-[#F5F1E3]' : 'bg-[#FFFCF5] border-[#D8CEB6] text-[#302522]'
            }`}>
              <Bookmark className="w-10 h-10 mx-auto mb-3 text-[#A94F43]" />
              <h3 className="font-playfair text-2xl font-bold mb-2">No saved references</h3>
              <p className={`text-sm ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>
                Save constitutional articles, statutory provisions, or court guides to build your legal brief.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
