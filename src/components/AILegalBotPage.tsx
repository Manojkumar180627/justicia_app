import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  Scale,
  Search,
  Globe,
  Database,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Clock,
  Layers,
  Zap,
  Filter,
  Check,
  Building2,
  Copy,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { RAGResponse, LegalDocument, ApprovedSource, CrawlerLog, DocumentType } from '../types/legalDataset';
import { legalRAGPipeline } from '../services/legalRAGPipeline';
import { legalDatasetStore } from '../services/legalDatasetStore';
import { legalCrawlerEngine } from '../services/legalCrawlerService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  text?: string;
  ragResponse?: RAGResponse;
}

export const AILegalBotPage: React.FC = () => {
  const { t, settings } = useSettings();
  const language = settings.language;
  const isDark = settings.darkMode;
  const [activeTab, setActiveTab] = useState<'bot' | 'dataset' | 'crawler' | 'inspector'>('bot');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTraceResponse, setActiveTraceResponse] = useState<RAGResponse | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dataset Browser State
  const [datasetDocs, setDatasetDocs] = useState<LegalDocument[]>([]);
  const [datasetSearch, setDatasetSearch] = useState('');
  const [datasetTypeFilter, setDatasetTypeFilter] = useState<string>('ALL');
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);

  // Crawler Hub State
  const [approvedSources, setApprovedSources] = useState<ApprovedSource[]>([]);
  const [crawlerLogs, setCrawlerLogs] = useState<CrawlerLog[]>([]);
  const [manualCrawlUrl, setManualCrawlUrl] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize data
  useEffect(() => {
    refreshDataset();
    refreshCrawlerData();

    // Default welcome message
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: t.aiBot.welcomeMsg,
      },
    ]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const refreshDataset = () => {
    const docs = legalDatasetStore.getAllDocuments();
    setDatasetDocs(docs);
    if (docs.length > 0 && !selectedDoc) {
      setSelectedDoc(docs[0]);
    }
  };

  const refreshCrawlerData = () => {
    setApprovedSources(legalCrawlerEngine.getApprovedSources());
    setCrawlerLogs(legalCrawlerEngine.getLogs());
  };

  // RAG Query Handler
  const handleSendQuery = async (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);

    try {
      // Execute multi-stage RAG Pipeline
      const ragRes = await legalRAGPipeline.executePipeline(query, language);
      setActiveTraceResponse(ragRes);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragResponse: ragRes,
      };

      setMessages((prev) => [...prev, botMsg]);
      refreshDataset();
      refreshCrawlerData();
    } catch (err) {
      console.error('RAG Pipeline Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Manual Crawl Action
  const handleManualCrawl = async () => {
    if (!manualCrawlUrl || !selectedSourceId || isCrawling) return;
    setIsCrawling(true);

    try {
      await legalCrawlerEngine.crawlApprovedSource(selectedSourceId, manualCrawlUrl, {
        title: `Manual Crawled Act Provision - ${new Date().toLocaleDateString()}`,
        document_type: 'Statute',
        act_name: 'Custom Statutory Notification',
        article_or_section: 'Section Custom',
        official_citation: 'Gazette Extra Citation',
        content: `Extracted official statutory text from ${manualCrawlUrl}. Verified compliance with robots.txt and official government repository standards.`,
        simple_explanation: 'On-demand indexed statutory record added to local legal dataset.',
      });

      refreshDataset();
      refreshCrawlerData();
      setManualCrawlUrl('');
    } finally {
      setIsCrawling(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#38231F] text-[#F5F1E3]' : 'bg-[#F5F1E3] text-[#302522]'
    }`}>
      {/* Top Banner Header */}
      <div className={`border-b sticky top-0 z-30 px-4 lg:px-8 py-4 backdrop-blur-md transition-colors ${
        isDark ? 'border-[#775E57] bg-[#4A2F2B]/90' : 'border-[#D8CEB6] bg-[#FFFCF5]/90 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-[#F8E7E2] border-[#D8CEB6] text-[#A94F43]' : 'bg-[#F8E7E2] border-[#D8CEB6] text-[#A94F43]'
            }`}>
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-[#F5F1E3]' : 'text-[#302522]'}`}>{t.aiBot.modalTitle}</h1>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1 ${
                  isDark ? 'bg-[#F8E7E2] border-[#D8CEB6] text-[#A94F43]' : 'bg-[#F8E7E2] border-[#D8CEB6] text-[#A94F43]'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> RAG Grounded
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'}`}>{t.aiBot.modalSubtitle}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={`flex items-center gap-1 p-1 border rounded-xl ${
            isDark ? 'bg-[#38231F] border-[#775E57]' : 'bg-[#F5F1E3] border-[#D8CEB6]'
          }`}>
            <button
              onClick={() => setActiveTab('bot')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'bot'
                  ? isDark
                    ? 'bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#A94F43] border border-[#D8CEB6] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742]'
                  : 'text-[#76665C] hover:text-[#302522] hover:bg-[#E8E1C8]'
              }`}
            >
              <span>{t.aiBot.tabBot}</span>
            </button>
            <button
              onClick={() => setActiveTab('dataset')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dataset'
                  ? isDark
                    ? 'bg-[#F8E7E2] text-[#A94F43] border border-[#D8CEB6] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#A94F43] border border-[#D8CEB6] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#E4D8C5] hover:text-[#F5F1E3] hover:bg-[#5B4742]'
                  : 'text-[#76665C] hover:text-[#302522] hover:bg-[#E8E1C8]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{t.aiBot.tabDataset}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {datasetDocs.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6">
        {/* TAB 1: RAG AI Legal Assistant (Chat Interface) */}
        {activeTab === 'bot' && (
          <div className={`flex flex-col h-[calc(100vh-160px)] border rounded-2xl overflow-hidden shadow-2xl transition-colors ${
            isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {/* Suggested Quick Inquiries Bar */}
            <div className={`p-3 border-b flex items-center gap-2 overflow-x-auto text-xs ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`font-medium flex items-center gap-1 shrink-0 ${
                isDark ? 'text-amber-400' : 'text-[#996515]'
              }`}>
                <Zap className="w-3.5 h-3.5" /> {t.aiBot.suggestedQueries}:
              </span>
              <button
                onClick={() => handleSendQuery('What is Article 21?')}
                className={`px-2.5 py-1 rounded-lg border shrink-0 transition ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                }`}
              >
                Article 21 (Privacy)
              </button>
              <button
                onClick={() => handleSendQuery('What is punishment under BNS Section 103?')}
                className={`px-2.5 py-1 rounded-lg border shrink-0 transition ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                }`}
              >
                BNS Section 103 (Murder & Lynching)
              </button>
              <button
                onClick={() => handleSendQuery('Procedure for anticipatory bail under BNSS Section 482 vs CrPC 438')}
                className={`px-2.5 py-1 rounded-lg border shrink-0 transition ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                }`}
              >
                BNSS Section 482 (Anticipatory Bail)
              </button>
              <button
                onClick={() => handleSendQuery('Kesavananda Bharati v State of Kerala basic structure ratio')}
                className={`px-2.5 py-1 rounded-lg border shrink-0 transition ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                }`}
              >
                Kesavananda Bharati (Basic Structure)
              </button>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'user' ? (
                    <div className={`max-w-2xl border rounded-2xl rounded-tr-none p-4 shadow-md transition-colors ${
                      isDark
                        ? 'bg-amber-500/10 border-amber-500/30 text-slate-100'
                        : 'bg-amber-50 border-amber-300 text-slate-900'
                    }`}>
                      <div className={`flex items-center justify-between text-[11px] font-semibold mb-1 ${
                        isDark ? 'text-amber-400' : 'text-[#996515]'
                      }`}>
                        <span>LEARNED COUNSEL QUERY</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-sm font-medium">{msg.text}</p>
                    </div>
                  ) : (
                    <div className={`w-full max-w-4xl border rounded-2xl p-5 lg:p-6 shadow-xl space-y-5 transition-colors ${
                      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}>
                      {/* Bot Message Header */}
                      <div className={`flex items-center justify-between border-b pb-3 ${
                        isDark ? 'border-slate-800' : 'border-slate-200'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg border ${
                            isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-amber-100 text-[#996515] border-amber-300'
                          }`}>
                            <Scale className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className={`text-sm font-bold flex items-center gap-2 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              VIDHI AI RAG RESEARCH OUTPUT
                              {msg.ragResponse?.isFallbackUsed && (
                                <span className={`px-2 py-0.5 border rounded text-[10px] font-semibold flex items-center gap-1 ${
                                  isDark ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' : 'bg-sky-50 border-sky-200 text-sky-700'
                                }`}>
                                  <Globe className="w-3 h-3" /> Web Crawler Fallback
                                </span>
                              )}
                            </h3>
                            <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Grounding Confidence: {((msg.ragResponse?.confidenceScore || 0) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{msg.timestamp}</span>
                      </div>

                      {/* Welcome message text fallback */}
                      {msg.text && <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{msg.text}</p>}

                      {/* Grounded RAG Response Display */}
                      {msg.ragResponse && (
                        <>
                          {/* Zero-Hallucination Warning if Insufficient Information */}
                          {!msg.ragResponse.sufficientInformationFound ? (
                            <div className={`p-4 border rounded-xl text-sm space-y-2 ${
                              isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                            }`}>
                              <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                                <AlertTriangle className="w-4 h-4" />
                                <span>{t.aiBot.insufficientInfoTitle}</span>
                              </div>
                              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{msg.ragResponse.groundedAnswer}</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* 1. LEGAL TOPIC & DIRECT ANSWER HEADER */}
                              {msg.ragResponse.legalTopic && (
                                <div className={`border rounded-xl p-3.5 flex flex-col gap-1 ${
                                  isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50/80 border-amber-200'
                                }`}>
                                  <div className={`text-[11px] uppercase tracking-wider font-bold ${
                                    isDark ? 'text-amber-400' : 'text-[#996515]'
                                  }`}>Legal Topic</div>
                                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{msg.ragResponse.legalTopic}</div>
                                  {msg.ragResponse.directAnswer && (
                                    <div className={`text-xs mt-1 font-medium italic border-t pt-1.5 ${
                                      isDark ? 'text-slate-300 border-amber-500/20' : 'text-slate-700 border-amber-200'
                                    }`}>
                                      "{msg.ragResponse.directAnswer}"
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* 2. EXACT LEGAL PROVISION CARD */}
                              {msg.ragResponse.exactLegalProvision && (
                                <div className={`border rounded-xl p-4 space-y-2 ${
                                  isDark ? 'bg-[#090D16] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                                }`}>
                                  <div className="flex items-center justify-between text-xs font-bold text-amber-500 tracking-wider">
                                    <span className="flex items-center gap-1.5">
                                      <FileText className="w-4 h-4" />
                                      {t.aiBot.exactProvisionHeader}
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(msg.ragResponse!.exactLegalProvision!, msg.id)}
                                      className={`flex items-center gap-1 text-[11px] ${
                                        isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                                      }`}
                                    >
                                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                                    </button>
                                  </div>
                                  <pre className={`text-xs font-mono p-3.5 rounded-lg border whitespace-pre-wrap leading-relaxed ${
                                    isDark ? 'bg-slate-900/90 text-slate-200 border-slate-800' : 'bg-slate-100 text-slate-900 border-slate-200'
                                  }`}>
                                    {msg.ragResponse.exactLegalProvision}
                                  </pre>
                                </div>
                              )}

                              {/* 3. SIMPLE EXPLANATION & GROUNDED ANALYSIS */}
                              <div className={`border rounded-xl p-4 space-y-2 ${
                                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                              }`}>
                                <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                                  <BookOpen className="w-4 h-4" /> {t.aiBot.simpleExplanationHeader}
                                </h4>
                                <div className={`text-sm whitespace-pre-line leading-relaxed ${
                                  isDark ? 'text-slate-200' : 'text-slate-800'
                                }`}>
                                  {msg.ragResponse.groundedAnswer}
                                </div>
                              </div>

                              {/* 4. SCOPE & APPLICABILITY */}
                              {msg.ragResponse.scopeAndApplicability && (
                                <div className={`border rounded-xl p-3.5 space-y-1 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/60 border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-blue-500 tracking-wider uppercase">Scope & Applicability</h4>
                                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{msg.ragResponse.scopeAndApplicability}</p>
                                </div>
                              )}

                              {/* 5. IMPORTANT CONDITIONS */}
                              {msg.ragResponse.importantConditions && msg.ragResponse.importantConditions.length > 0 && (
                                <div className={`border rounded-xl p-3.5 space-y-1.5 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/60 border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-wider uppercase">Important Conditions</h4>
                                  <ul className={`list-disc list-inside text-xs space-y-1 ${
                                    isDark ? 'text-slate-300' : 'text-slate-700'
                                  }`}>
                                    {msg.ragResponse.importantConditions.map((cond, i) => (
                                      <li key={i}>{cond}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* 6. EXCEPTIONS OR LIMITATIONS */}
                              {msg.ragResponse.exceptionsOrLimitations && msg.ragResponse.exceptionsOrLimitations.length > 0 && (
                                <div className={`border rounded-xl p-3.5 space-y-1.5 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/60 border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase">Exceptions & Limitations</h4>
                                  <ul className={`list-disc list-inside text-xs space-y-1 ${
                                    isDark ? 'text-slate-300' : 'text-slate-700'
                                  }`}>
                                    {msg.ragResponse.exceptionsOrLimitations.map((exc, i) => (
                                      <li key={i}>{exc}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* 7. PUNISHMENT OR PENALTY */}
                              {msg.ragResponse.punishmentOrPenalty && (
                                <div className={`border rounded-xl p-3.5 space-y-1 ${
                                  isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 tracking-wider uppercase">Punishment / Penalty</h4>
                                  <p className={`text-xs font-semibold ${isDark ? 'text-rose-200' : 'text-rose-800'}`}>{msg.ragResponse.punishmentOrPenalty}</p>
                                </div>
                              )}

                              {/* 8. PROCEDURE */}
                              {msg.ragResponse.procedure && (
                                <div className={`border rounded-xl p-3.5 space-y-1 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/60 border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Legal Procedure</h4>
                                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{msg.ragResponse.procedure}</p>
                                </div>
                              )}

                              {/* 9. KEY POINTS BULLET GRID */}
                              {msg.ragResponse.keyPoints.length > 0 && (
                                <div className={`border rounded-xl p-4 space-y-2 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-sky-600 dark:text-sky-400 tracking-wider flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4" /> {t.aiBot.keyPointsHeader}
                                  </h4>
                                  <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-xs ${
                                    isDark ? 'text-slate-300' : 'text-slate-700'
                                  }`}>
                                    {msg.ragResponse.keyPoints.map((pt, i) => (
                                      <li key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${
                                        isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                                      }`}>
                                        <span className="text-amber-500 font-bold">•</span>
                                        <span>{pt}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* 10. RELATED PROVISIONS */}
                              {msg.ragResponse.relatedProvisions && msg.ragResponse.relatedProvisions.length > 0 && (
                                <div className={`border rounded-xl p-3.5 space-y-2 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/60 border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">Related Provisions</h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {msg.ragResponse.relatedProvisions.map((rel, i) => (
                                      <span key={i} className={`px-2.5 py-1 rounded text-[11px] border ${
                                        isDark ? 'bg-slate-800 text-cyan-300 border-slate-700' : 'bg-white text-cyan-800 border-slate-300'
                                      }`}>
                                        {rel}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* 11. RELEVANT PRECEDENTS & CASES */}
                              {msg.ragResponse.relevantPrecedents.length > 0 && (
                                <div className={`border rounded-xl p-4 space-y-2 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider flex items-center gap-1.5">
                                    <Scale className="w-4 h-4" /> {t.aiBot.relevantCasesHeader}
                                  </h4>
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    {msg.ragResponse.relevantPrecedents.map((prec, idx) => (
                                      <span
                                        key={idx}
                                        className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-medium ${
                                          isDark
                                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                                            : 'bg-purple-50 border-purple-200 text-purple-800'
                                        }`}
                                      >
                                        <ChevronRight className="w-3 h-3 text-purple-500" /> {prec}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* 12. AMENDMENTS OR UPDATES */}
                              {msg.ragResponse.amendmentsOrUpdates && (
                                <div className={`border rounded-xl p-3.5 space-y-1 ${
                                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/60 border-slate-200'
                                }`}>
                                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">Amendments & Historical Updates</h4>
                                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{msg.ragResponse.amendmentsOrUpdates}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isGenerating && (
                <div className="flex justify-start">
                  <div className={`border rounded-2xl p-4 flex items-center gap-3 text-sm shadow-lg ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
                    <span>{t.aiBot.generating}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className={`p-4 border-t ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                  placeholder={t.aiBot.inputPlaceholder}
                  className={`flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-amber-500/50'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                  }`}
                />
                <button
                  onClick={() => handleSendQuery()}
                  disabled={isGenerating || !inputQuery.trim()}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition text-sm shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  <span>{t.aiBot.sendButton}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className={`text-[11px] mt-2 text-center ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{t.aiBot.disclaimer}</p>
            </div>
          </div>
        )}

        {/* TAB 2: Legal Dataset Storage Browser */}
        {activeTab === 'dataset' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Filter & Document List Panel */}
            <div className={`lg:col-span-5 border rounded-2xl p-4 flex flex-col h-[calc(100vh-180px)] transition-colors ${
              isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h3 className={`text-sm font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <Database className="w-4 h-4 text-amber-500" />
                  Legal Dataset Index
                </h3>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{datasetDocs.length} Verified Records</span>
              </div>

              {/* Search & Filter bar */}
              <div className="space-y-2 mb-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={datasetSearch}
                    onChange={(e) => setDatasetSearch(e.target.value)}
                    placeholder="Filter by Article, Section, Act, or Title..."
                    className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none transition ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-amber-500/50'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                  {['ALL', 'Constitution', 'Sanhita', 'Supreme Court Judgment'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDatasetTypeFilter(type)}
                      className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
                        datasetTypeFilter === type
                          ? isDark
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                            : 'bg-amber-100 text-[#996515] border border-amber-300 font-bold'
                          : isDark
                          ? 'bg-slate-900 text-slate-400 hover:text-slate-200'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {datasetDocs
                  .filter((doc) => {
                    if (datasetTypeFilter !== 'ALL' && doc.document_type !== datasetTypeFilter) return false;
                    if (!datasetSearch) return true;
                    const q = datasetSearch.toLowerCase();
                    return (
                      doc.title.toLowerCase().includes(q) ||
                      doc.article_or_section.toLowerCase().includes(q) ||
                      doc.act_name.toLowerCase().includes(q)
                    );
                  })
                  .map((doc) => (
                    <div
                      key={doc.document_id}
                      onClick={() => setSelectedDoc(doc)}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        selectedDoc?.document_id === doc.document_id
                          ? isDark
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-200 shadow-md'
                            : 'bg-amber-50 border-amber-300 text-slate-900 shadow-xs'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 text-slate-300'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                        <span className="text-amber-500">{doc.article_or_section}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {doc.document_type}
                        </span>
                      </div>
                      <h4 className={`text-xs font-semibold line-clamp-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{doc.title}</h4>
                      <p className={`text-[11px] mt-1 line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{doc.official_citation}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Detailed Document Metadata Inspector */}
            <div className={`lg:col-span-7 border rounded-2xl p-6 flex flex-col h-[calc(100vh-180px)] overflow-y-auto transition-colors ${
              isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              {selectedDoc ? (
                <div className="space-y-6">
                  {/* Document Header & 16-Field Metadata Grid */}
                  <div className={`border-b pb-4 space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 border text-xs font-bold rounded-lg ${
                        isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-50 border-amber-200 text-[#996515]'
                      }`}>
                        {selectedDoc.document_type} • {selectedDoc.year}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">ID: {selectedDoc.document_id}</span>
                    </div>
                    <h2 className={`text-lg font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedDoc.title}</h2>
                    <p className={`text-xs flex items-center gap-1 font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <FileText className="w-3.5 h-3.5 text-amber-500" /> {selectedDoc.official_citation}
                    </p>
                  </div>

                  {/* 16 Metadata Fields Display Grid */}
                  <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Act / Code Name</span>
                      <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedDoc.act_name}</span>
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Article / Section</span>
                      <span className="text-amber-500 font-bold">{selectedDoc.article_or_section}</span>
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Jurisdiction</span>
                      <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedDoc.jurisdiction}</span>
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Court / Authority</span>
                      <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedDoc.court || 'N/A'}</span>
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Source Repository</span>
                      <span className={`font-medium truncate block ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedDoc.source}</span>
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Content Hash (SHA-256)</span>
                      <span className={`font-mono text-[10px] truncate block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{selectedDoc.content_hash}</span>
                    </div>
                  </div>

                  {/* Verbatim Statutory Content */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-amber-500 tracking-wider uppercase">Verbatim Statutory Text</h3>
                    <pre className={`text-xs font-mono p-4 rounded-xl border whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto ${
                      isDark ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-100 text-slate-900 border-slate-200'
                    }`}>
                      {selectedDoc.content}
                    </pre>
                  </div>

                  {/* Key Points */}
                  {selectedDoc.key_points && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-sky-600 dark:text-sky-400 tracking-wider uppercase">Key Legal Elements</h3>
                      <ul className="space-y-1.5">
                        {selectedDoc.key_points.map((kp, idx) => (
                          <li key={idx} className={`text-xs flex items-start gap-2 p-2 rounded-lg border ${
                            isDark ? 'bg-slate-900/40 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}>
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`flex flex-col items-center justify-center h-full space-y-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Database className="w-8 h-8 opacity-40" />
                  <p className="text-sm">Select a document from the dataset index to view full metadata.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Legal Web Crawler Hub */}
        {activeTab === 'crawler' && (
          <div className="space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`border rounded-2xl p-4 flex items-center gap-4 transition-colors ${
                isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`p-3 border rounded-xl ${
                  isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}>
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Approved Allowlist Domains</span>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{approvedSources.length} Verified Portals</h3>
                </div>
              </div>
              <div className={`border rounded-2xl p-4 flex items-center gap-4 transition-colors ${
                isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`p-3 border rounded-xl ${
                  isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-50 border-amber-200 text-[#996515]'
                }`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>robots.txt Compliance</span>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>100% Enforced</h3>
                </div>
              </div>
              <div className={`border rounded-2xl p-4 flex items-center gap-4 transition-colors ${
                isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`p-3 border rounded-xl ${
                  isDark ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' : 'bg-sky-50 border-sky-200 text-sky-700'
                }`}>
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Crawler Audit Trail Logs</span>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{crawlerLogs.length} Events Logged</h3>
                </div>
              </div>
            </div>

            {/* Approved Sources Allowlist Table */}
            <div className={`border rounded-2xl p-6 space-y-4 transition-colors ${
              isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div>
                  <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    Approved Government & Legal Sources Allowlist
                  </h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    The Legal Web Crawler strictly ingests content only from domains on this allowlist with rate limiting.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className={`w-full text-left text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <thead className={`uppercase font-bold text-[10px] border-b ${
                    isDark ? 'bg-slate-900/80 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">Repository / Portal</th>
                      <th className="py-3 px-4">Domain</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Trust Score</th>
                      <th className="py-3 px-4">Rate Limit</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    {approvedSources.map((src) => (
                      <tr key={src.id} className={`transition ${isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}`}>
                        <td className={`py-3 px-4 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{src.name}</td>
                        <td className="py-3 px-4 font-mono text-amber-500 font-medium">{src.domain}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {src.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{(src.trustScore * 100).toFixed(0)}%</td>
                        <td className={`py-3 px-4 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{src.rateLimitMs}ms</td>
                        <td className="py-3 px-4">
                          {src.active ? (
                            <span className={`px-2 py-0.5 border rounded text-[10px] font-bold ${
                              isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            }`}>
                              ACTIVE
                            </span>
                          ) : (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-600'
                            }`}>
                              DISABLED
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              legalCrawlerEngine.toggleSourceActive(src.id);
                              refreshCrawlerData();
                            }}
                            className="text-xs text-amber-500 hover:underline font-semibold cursor-pointer"
                          >
                            {src.active ? 'Disable' : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Audit Log Stream */}
            <div className={`border rounded-2xl p-6 space-y-4 transition-colors ${
              isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Terminal className="w-4 h-4 text-sky-500" />
                  Crawler Audit Trail Logs
                </h3>
                <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Live Timestamped Records</span>
              </div>

              <div className={`p-4 rounded-xl border font-mono text-xs max-h-72 overflow-y-auto space-y-2 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 text-slate-100 border-slate-800'
              }`}>
                {crawlerLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 border-b border-slate-800/60 pb-2">
                    <span className="text-slate-500 text-[11px] shrink-0">{log.timestamp.split('T')[1]?.slice(0, 8)}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : log.status === 'DUPLICATE_SKIPPED'
                          ? 'bg-sky-500/20 text-sky-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RAG Pipeline Execution Inspector */}
        {activeTab === 'inspector' && (
          <div className={`border rounded-2xl p-6 space-y-6 transition-colors ${
            isDark ? 'bg-[#0E131F] border-slate-800' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div>
                <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Terminal className="w-5 h-5 text-amber-500" />
                  RAG Execution Inspector & Trace Log
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Transparent step-by-step trace showing query classification, retrieval scores, crawler fallback, and answer synthesis.
                </p>
              </div>
            </div>

            {activeTraceResponse ? (
              <div className="space-y-6">
                <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <span className={`block uppercase font-bold text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Inspected Query</span>
                    <span className="text-amber-500 font-bold text-sm">"{activeTraceResponse.query}"</span>
                  </div>
                  <div className="text-right">
                    <span className={`block uppercase font-bold text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>RAG Grounding Score</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      {(activeTraceResponse.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Pipeline Steps Flow */}
                <div className="space-y-3">
                  {activeTraceResponse.traceSteps.map((step, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border space-y-2 ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          {step.step}
                        </span>
                        <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{step.timestamp}</span>
                      </div>
                      <p className={`text-xs pl-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{step.details}</p>

                      {step.data && (
                        <pre className={`ml-6 text-[11px] font-mono p-2.5 rounded border overflow-x-auto ${
                          isDark ? 'text-amber-300/90 bg-slate-900/90 border-slate-800' : 'text-amber-900 bg-amber-50/60 border-amber-200'
                        }`}>
                          {JSON.stringify(step.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center py-16 space-y-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                <Terminal className="w-10 h-10 opacity-30" />
                <p className="text-sm">No query execution trace logged yet. Run a RAG search in the Assistant tab.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
