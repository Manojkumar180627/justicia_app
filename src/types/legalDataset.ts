export type DocumentType =
  | 'Constitution'
  | 'Central Act'
  | 'Sanhita'
  | 'Supreme Court Judgment'
  | 'High Court Judgment'
  | 'Statute'
  | 'Amendment'
  | 'Notification'
  | 'Section';

export interface LegalDocument {
  document_id: string;
  title: string;
  document_type: DocumentType;
  jurisdiction: string;
  court?: string;
  law_name?: string;
  act_name: string;
  article_or_section: string;
  article_number?: string;
  section_number?: string;
  chapter?: string;
  part?: string;
  case_name?: string;
  citation?: string;
  year: number;
  date: string;
  source: string;
  source_name?: string;
  source_url: string;
  official_citation: string;
  content: string;
  summary?: string;
  language: 'en' | 'hi' | 'ta' | 'te';
  last_updated: string;
  content_hash: string;

  // Detailed structured legal fields
  simple_explanation?: string;
  scope_and_applicability?: string;
  important_conditions?: string[];
  exceptions_or_limitations?: string[];
  punishment_or_penalty?: string;
  procedure?: string;
  key_points?: string[];
  related_provisions?: string[];
  relevant_precedents?: string[];
  amendments_or_updates?: string;
}

export interface ApprovedSource {
  id: string;
  name: string;
  domain: string;
  category: 'Official Government' | 'Supreme Court' | 'High Court' | 'Verified Legal Repository';
  trustScore: number;
  robotsTxtCompliant: boolean;
  rateLimitMs: number;
  active: boolean;
  lastCrawled?: string;
  documentsCrawledCount: number;
}

export interface CrawlerLog {
  id: string;
  timestamp: string;
  sourceId: string;
  sourceName: string;
  targetUrl: string;
  status: 'SUCCESS' | 'DUPLICATE_SKIPPED' | 'RATE_LIMITED' | 'ROBOTS_RESTRICTED' | 'FAILED';
  httpStatus?: number;
  documentId?: string;
  documentTitle?: string;
  contentHash?: string;
  message: string;
}

export interface SearchQueryOptions {
  query: string;
  documentType?: DocumentType;
  actName?: string;
  articleOrSection?: string;
  language?: 'en' | 'hi' | 'ta' | 'te';
  limit?: number;
}

export interface SearchResult {
  document: LegalDocument;
  score: number;
  matchType: 'EXACT_PROVISION' | 'ARTICLE_SECTION_MATCH' | 'CASE_NAME_MATCH' | 'KEYWORD_FULLTEXT' | 'SEMANTIC_SIMILARITY';
  snippet: string;
  highlights: string[];
}

export interface RAGTraceStep {
  step: string;
  status: 'COMPLETED' | 'FALLBACK_ACTIVATED' | 'NO_MATCH';
  details: string;
  timestamp: string;
  data?: any;
}

export interface RAGResponse {
  query: string;
  legalTopic?: string;
  directAnswer?: string;
  groundedAnswer: string;
  exactLegalProvision?: string;
  simpleExplanation: string;
  scopeAndApplicability?: string;
  importantConditions?: string[];
  exceptionsOrLimitations?: string[];
  punishmentOrPenalty?: string;
  procedure?: string;
  keyPoints: string[];
  relatedProvisions?: string[];
  relevantPrecedents: string[];
  amendmentsOrUpdates?: string;
  additionalInfo?: string;
  citations: string[];
  sources: {
    title: string;
    repository: string;
    provision: string;
    citation: string;
    url: string;
    retrievalDate: string;
    isVerifiedDataset: boolean;
  }[];
  retrievedDocuments: SearchResult[];
  confidenceScore: number;
  isFallbackUsed: boolean;
  sufficientInformationFound: boolean;
  traceSteps: RAGTraceStep[];
}
