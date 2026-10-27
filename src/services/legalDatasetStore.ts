import { LegalDocument, DocumentType } from '../types/legalDataset';

const DATASET_STORAGE_KEY = 'justicia_legal_dataset_v1';
const DATASET_VERSION_KEY = 'justicia_legal_dataset_version';
const CURRENT_DATASET_VERSION = 2;

import rawData from '../data/ipc_dataset_full.json';

// Seed dataset generated directly from the integrated json containing full records
export const INITIAL_LEGAL_DOCUMENTS: LegalDocument[] = (rawData as any[]).map((entry, idx) => {
  const isConstitution = entry.act_code === 'COI';
  const prefix = isConstitution ? 'Article' : 'Section';
  const provisionId = `${prefix} ${entry.section_number}`;
  
  return {
    document_id: `doc-${(entry.act_code || 'unk').toLowerCase()}-${entry.section_number}-${idx}`,
    title: `${provisionId} - ${entry.section_title || 'Legal Provision'}`,
    document_type: isConstitution ? 'Constitution' : 'Statute',
    jurisdiction: 'India',
    court: '',
    law_name: entry.act_code || 'Unknown Act',
    act_name: entry.act_code || 'Unknown Act',
    article_or_section: provisionId,
    article_number: isConstitution ? String(entry.section_number) : undefined,
    section_number: !isConstitution ? String(entry.section_number) : undefined,
    chapter: `Chapter ${entry.chapter_number} - ${entry.chapter_title}`,
    part: isConstitution ? `Part ${entry.chapter_number}` : undefined,
    citation: `${provisionId}, ${entry.act_code}`,
    official_citation: `${provisionId}, ${entry.act_code}`,
    year: 2024,
    date: new Date().toISOString().split('T')[0],
    source: 'Official Integrated Dataset',
    source_name: 'Main Database',
    source_url: '',
    content: entry.text || '',
    summary: entry.section_title || 'Legal provision details',
    language: 'en',
    last_updated: new Date().toISOString(),
    content_hash: `hash_${entry.act_code}_${entry.section_number}_${idx}`,
    simple_explanation: (entry.text || '').substring(0, 300) + ((entry.text || '').length > 300 ? '...' : ''),
    scope_and_applicability: `Applicable across India under the mandate of ${entry.act_code}.`,
    important_conditions: [],
    exceptions_or_limitations: [],
    procedure: '',
    key_points: [
      `Governed under ${entry.act_code}`,
      `Structured within Chapter ${entry.chapter_number}: ${entry.chapter_title}`
    ],
    related_provisions: [],
    relevant_precedents: [],
    amendments_or_updates: ''
  };
});

class LegalDatasetStore {
  private documents: LegalDocument[] = [];

  constructor() {
    this.loadDataset();
  }

  private loadDataset(): void {
    try {
      const storedVersion = parseInt(localStorage.getItem(DATASET_VERSION_KEY) || '0', 10);
      const stored = localStorage.getItem(DATASET_STORAGE_KEY);
      if (stored && storedVersion >= CURRENT_DATASET_VERSION) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.documents = parsed;
          return;
        }
      }
    } catch {
      // Ignore parse error and fallback to initial seed
    }

    this.documents = [...INITIAL_LEGAL_DOCUMENTS];
    this.saveDataset();
  }

  private saveDataset(): void {
    try {
      localStorage.setItem(DATASET_STORAGE_KEY, JSON.stringify(this.documents));
      localStorage.setItem(DATASET_VERSION_KEY, String(CURRENT_DATASET_VERSION));
    } catch (e) {
      console.warn('Unable to persist dataset to localStorage:', e);
    }
  }

  public getAllDocuments(): LegalDocument[] {
    return [...this.documents];
  }

  public getDocumentById(id: string): LegalDocument | undefined {
    return this.documents.find((doc) => doc.document_id === id);
  }

  public addOrUpdateDocument(doc: LegalDocument): { success: boolean; isDuplicate: boolean; docId: string } {
    const existingIndex = this.documents.findIndex(
      (d) => d.content_hash === doc.content_hash || d.document_id === doc.document_id
    );

    if (existingIndex >= 0) {
      // Check if exact content hash exists
      if (this.documents[existingIndex].content_hash === doc.content_hash) {
        return { success: true, isDuplicate: true, docId: this.documents[existingIndex].document_id };
      }
      // Update existing document
      this.documents[existingIndex] = {
        ...doc,
        last_updated: new Date().toISOString(),
      };
      this.saveDataset();
      return { success: true, isDuplicate: false, docId: doc.document_id };
    }

    // New insertion
    this.documents.unshift({
      ...doc,
      last_updated: new Date().toISOString(),
    });
    this.saveDataset();
    return { success: true, isDuplicate: false, docId: doc.document_id };
  }

  public filterDocuments(type?: DocumentType, actName?: string, query?: string): LegalDocument[] {
    return this.documents.filter((doc) => {
      if (type && doc.document_type !== type) return false;
      if (actName && !doc.act_name.toLowerCase().includes(actName.toLowerCase())) return false;
      if (query) {
        const q = query.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesProvision = doc.article_or_section.toLowerCase().includes(q);
        const matchesContent = doc.content.toLowerCase().includes(q);
        const matchesCitation = doc.official_citation.toLowerCase().includes(q);
        return matchesTitle || matchesProvision || matchesContent || matchesCitation;
      }
      return true;
    });
  }

  public resetToSeedData(): void {
    this.documents = [...INITIAL_LEGAL_DOCUMENTS];
    this.saveDataset();
  }

  public getDatasetStats() {
    const totalDocs = this.documents.length;
    const typesCount: Record<string, number> = {};
    const courtsCount: Record<string, number> = {};

    this.documents.forEach((doc) => {
      typesCount[doc.document_type] = (typesCount[doc.document_type] || 0) + 1;
      if (doc.court) {
        courtsCount[doc.court] = (courtsCount[doc.court] || 0) + 1;
      }
    });

    return {
      totalDocs,
      typesCount,
      courtsCount,
      lastUpdated: this.documents.length > 0 ? this.documents[0].last_updated : null,
    };
  }
}

export const legalDatasetStore = new LegalDatasetStore();
