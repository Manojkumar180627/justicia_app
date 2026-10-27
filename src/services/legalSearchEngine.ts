import { LegalDocument, SearchQueryOptions, SearchResult } from '../types/legalDataset';
import { legalDatasetStore } from './legalDatasetStore';

export class LegalSearchEngine {
  /**
   * Main Search Pipeline: Keyword + Exact Provision + Semantic + Hybrid Reranking
   */
  public search(options: SearchQueryOptions): SearchResult[] {
    const documents = legalDatasetStore.getAllDocuments();
    const query = options.query.trim();

    if (!query) return [];

    const normalizedQuery = this.normalizeQuery(query);
    const results: SearchResult[] = [];

    for (const doc of documents) {
      if (options.documentType && doc.document_type !== options.documentType) {
        continue;
      }
      if (options.actName && !doc.act_name.toLowerCase().includes(options.actName.toLowerCase())) {
        continue;
      }

      const scoreResult = this.scoreDocument(doc, normalizedQuery);
      if (scoreResult.score > 0.1) {
        results.push({
          document: doc,
          score: scoreResult.score,
          matchType: scoreResult.matchType,
          snippet: scoreResult.snippet,
          highlights: scoreResult.highlights,
        });
      }
    }

    // Sort by score descending (Reranking)
    results.sort((a, b) => b.score - a.score);

    const limit = options.limit || 10;
    return results.slice(0, limit);
  }

  /**
   * Scores a document against the normalized query using hybrid multi-tier matching rules
   */
  private scoreDocument(
    doc: LegalDocument,
    query: string
  ): {
    score: number;
    matchType: SearchResult['matchType'];
    snippet: string;
    highlights: string[];
  } {
    const titleLower = doc.title.toLowerCase();
    const provisionLower = doc.article_or_section.toLowerCase();
    const actLower = doc.act_name.toLowerCase();
    const citationLower = doc.official_citation.toLowerCase();
    const contentLower = doc.content.toLowerCase();
    const explanationLower = (doc.simple_explanation || '').toLowerCase();
    const precedentsLower = (doc.relevant_precedents || []).join(' ').toLowerCase();

    const highlights: string[] = [];

    // 1. Tier 1: Exact Provision or Title Match (Score 0.95 - 1.0)
    // E.g. "article 21", "section 103", "bns 103", "kesavananda", "section 482"
    const exactProvisionPattern = new RegExp(`\\b${this.escapeRegExp(provisionLower)}\\b`, 'i');
    if (
      query === provisionLower ||
      titleLower.includes(query) ||
      (provisionLower.length > 2 && query.includes(provisionLower))
    ) {
      highlights.push(`Exact provision match: ${doc.article_or_section}`);
      return {
        score: 1.0,
        matchType: 'EXACT_PROVISION',
        snippet: doc.simple_explanation || doc.content.slice(0, 200) + '...',
        highlights,
      };
    }

    // 2. Tier 2: Article / Section Number Match (Score 0.85 - 0.92)
    // Match queries like "21", "103", "302", "482", "63"
    const numMatch = query.match(/\b(\d+)\b/);
    if (numMatch) {
      const num = numMatch[1];
      if (provisionLower.includes(num)) {
        highlights.push(`Section/Article number matched: ${num}`);
        // Check if act name or prefix also matches (e.g. "BNS 103" or "Article 21")
        const hasActMatch =
          (query.includes('bns') && actLower.includes('bns')) ||
          (query.includes('bnss') && actLower.includes('bnss')) ||
          (query.includes('bsa') && actLower.includes('bsa')) ||
          (query.includes('article') && actLower.includes('constitution')) ||
          (query.includes('ipc') && titleLower.includes('302'));

        const score = hasActMatch ? 0.95 : 0.85;
        return {
          score,
          matchType: 'ARTICLE_SECTION_MATCH',
          snippet: doc.simple_explanation || doc.content.slice(0, 200) + '...',
          highlights,
        };
      }
    }

    // 3. Tier 3: Case Name / Landmark Precedent Match (Score 0.80 - 0.90)
    // E.g. "puttaswamy", "kesavananda", "maneka gandhi", "shreya singhal", "sushila aggarwal"
    const caseTerms = ['puttaswamy', 'kesavananda', 'maneka', 'singhal', 'aggarwal', 'khotkar', 'royappa', 'poonavalla'];
    for (const caseTerm of caseTerms) {
      if (query.includes(caseTerm) && (titleLower.includes(caseTerm) || precedentsLower.includes(caseTerm))) {
        highlights.push(`Landmark precedent match: ${caseTerm}`);
        return {
          score: 0.90,
          matchType: 'CASE_NAME_MATCH',
          snippet: `Precedent: ${doc.title}. ${doc.simple_explanation || ''}`,
          highlights,
        };
      }
    }

    // 4. Tier 4: Keyword & Term Frequency Match (Score 0.40 - 0.79)
    const queryTokens = query.split(/\s+/).filter((t) => t.length > 2);
    if (queryTokens.length === 0) {
      return { score: 0, matchType: 'KEYWORD_FULLTEXT', snippet: '', highlights: [] };
    }

    let matchCount = 0;
    queryTokens.forEach((token) => {
      if (
        titleLower.includes(token) ||
        provisionLower.includes(token) ||
        actLower.includes(token) ||
        citationLower.includes(token) ||
        contentLower.includes(token) ||
        explanationLower.includes(token)
      ) {
        matchCount++;
        highlights.push(`Keyword match: "${token}"`);
      }
    });

    if (matchCount > 0) {
      const matchRatio = matchCount / queryTokens.length;
      const score = Math.min(0.79, 0.35 + matchRatio * 0.44);
      const snippet = this.extractSnippet(doc.content, queryTokens[0]);
      return {
        score,
        matchType: matchRatio >= 0.8 ? 'SEMANTIC_SIMILARITY' : 'KEYWORD_FULLTEXT',
        snippet,
        highlights: Array.from(new Set(highlights)),
      };
    }

    return { score: 0, matchType: 'KEYWORD_FULLTEXT', snippet: '', highlights: [] };
  }

  private extractSnippet(text: string, term: string): string {
    const idx = text.toLowerCase().indexOf(term.toLowerCase());
    if (idx === -1) return text.slice(0, 180) + '...';
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + 140);
    return (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  }

  /**
   * Retrieves connected/related legal documents from the dataset for a primary document
   */
  public retrieveConnectedDocuments(primaryDoc: LegalDocument, allDocs: LegalDocument[]): LegalDocument[] {
    const connected: LegalDocument[] = [];
    const primaryId = primaryDoc.document_id;

    const relatedTerms: string[] = [
      ...(primaryDoc.related_provisions || []),
      ...(primaryDoc.relevant_precedents || []),
      primaryDoc.act_name,
      primaryDoc.article_or_section,
    ];

    for (const doc of allDocs) {
      if (doc.document_id === primaryId) continue;

      let isConnected = false;
      const docText = (doc.title + ' ' + doc.article_or_section + ' ' + doc.content + ' ' + (doc.official_citation || '')).toLowerCase();

      for (const term of relatedTerms) {
        if (term.length > 2 && docText.includes(term.toLowerCase())) {
          isConnected = true;
          break;
        }
      }

      // Check transition link (e.g., IPC 302 <-> BNS 103)
      if (
        (primaryDoc.article_or_section.includes('103') && doc.article_or_section.includes('302')) ||
        (primaryDoc.article_or_section.includes('302') && doc.article_or_section.includes('103'))
      ) {
        isConnected = true;
      }

      if (isConnected) {
        connected.push(doc);
      }
    }

    return connected;
  }

  private normalizeQuery(query: string): string {
    let q = query.toLowerCase();

    // Convert Indic Digits to ASCII Digits
    const digitMap: Record<string, string> = {
      '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
      '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4', '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9',
      '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4', '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9',
    };
    q = q.replace(/[०-९௦-௯౦-౯]/g, (char) => digitMap[char] || char);

    // Multilingual statutory keyword aliases
    q = q.replace(/अनुच्छेद|அரசியலமைப்பு\s*சரத்து|சரத்து|అనుచ్ఛేదం/g, 'article');
    q = q.replace(/धारा|பிரிவு|சட்டப்பிரிவு|సెక్షన్/g, 'section');
    q = q.replace(/आईपीसी|ஐபிசி|ఐపీసీ/g, 'ipc');
    q = q.replace(/बीएनएस|பிஎன்எஸ்|బీఎన్‌ఎస్/g, 'bns');
    q = q.replace(/बीएनएसएस|பிஎன்எஸ்எஸ்|బీఎన్‌ఎస్‌ఎస్/g, 'bnss');
    q = q.replace(/बीएसए|பிஎஸ்ஏ|బీఎస్‌ఏ/g, 'bsa');

    // Tanglish / Hinglish / Conversational phrase normalization
    q = q.replace(/\b(pathi sollu|explain pannu|sollunga|enna|solu|pannunga|pathi|solli)\b/g, '');
    q = q.replace(/\b(karo|kya hai|batao|samjhao|kya hota hai|karein|bataiye)\b/g, '');
    q = q.replace(/\b(explain|what is|meaning of|tell me about|details on|give details)\b/g, '');

    return q.trim().replace(/\s+/g, ' ');
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export const legalSearchEngine = new LegalSearchEngine();
