import {
  LegalArticle,
  LegalStatute,
  CourtTier,
  CaseRecord,
  LegalNotification,
  BookmarkItem,
} from '../types';
import ipcData from './ipc_dataset_full.json';

import { legalDatasetStore } from '../services/legalDatasetStore';

export const CONSTITUTION_ARTICLES: LegalArticle[] = legalDatasetStore
  .filterDocuments('Constitution')
  .map((doc) => ({
    number: doc.article_or_section,
    title: doc.summary || doc.title,
    part: doc.part || doc.chapter || 'Constitution of India',
    description: doc.content || doc.simple_explanation || '',
    keyCaseLaws: doc.relevant_precedents || [],
    tags: doc.key_points || [],
  }));

const allDocs = legalDatasetStore.getAllDocuments();
const actsSet = new Set(allDocs.filter(d => d.document_type === 'Statute').map(d => d.act_name));

export const STATUTES_DATA: LegalStatute[] = Array.from(actsSet).map((actName) => {
  const actDocs = allDocs.filter((d) => d.act_name === actName && d.document_type === 'Statute');
  return {
    id: actName.toLowerCase().replace(/\s/g, '-'),
    title: actName,
    shortCode: actName,
    year: 2024,
    category: 'Criminal',
    description: `Complete, verified statutory provisions for ${actName} derived from the RAG database.`,
    totalSections: actDocs.length,
    enactedBy: 'Legislature of India',
    keySections: actDocs.map((doc) => ({
      section: doc.article_or_section,
      title: doc.title,
      summary: doc.content,
    })),
  };
});

export const COURT_TIERS: CourtTier[] = [
  {
    id: 'supreme-court',
    name: 'Supreme Court of India',
    hindiName: 'भारत का सर्वोच्च न्यायालय',
    level: 'Apex',
    presidedBy: 'Chief Justice of India + up to 33 Judges',
    jurisdiction:
      'Original (Art. 131), Appellate (Art. 132-136), Advisory (Art. 143), and Review Jurisdiction (Art. 137). Final court of appeal for the Republic of India.',
    benchesCount: 'Seat: Tilak Marg, New Delhi',
    description:
      'Inaugurated on 28 January 1950 under Part V, Chapter IV of the Indian Constitution. The law declared by the Supreme Court is binding on all courts within the territory of India (Article 141).',
    powers: [
      'Guardian of Fundamental Rights (Art. 32 Writs)',
      'Basic Structure Custodian & Judicial Review',
      'Special Leave Petitions (Art. 136)',
      'Complete Justice Powers (Art. 142)',
    ],
  },
  {
    id: 'high-courts',
    name: 'High Courts of India (25 Courts)',
    hindiName: 'उच्च न्यायालय',
    level: 'State',
    presidedBy: 'Chief Justice of High Court & Puisne Judges',
    jurisdiction:
      'Writ Jurisdiction under Art. 226/227, Civil & Criminal Appeals, Original Jurisdiction in certain Presidency towns (Delhi, Bombay, Calcutta, Madras).',
    benchesCount: '25 High Courts across 28 States & 8 UTs',
    description:
      'The highest judicial authority in a State or group of States/UTs. They exercise superintendence over all subordinate courts and tribunals across their territorial jurisdiction.',
    powers: [
      'Writ Jurisdiction wider than Art. 32 (Art. 226)',
      'Superintendence over all Subordinate Courts (Art. 227)',
      'Court of Record with Power to Punish for Contempt (Art. 215)',
      'First & Second Appeals in Civil/Criminal Matters',
    ],
  },
  {
    id: 'district-courts',
    name: 'District & Sessions Courts',
    hindiName: 'जिला एवं सत्र न्यायालय',
    level: 'District',
    presidedBy: 'Principal District & Sessions Judge',
    jurisdiction:
      'Original & appellate jurisdiction in both civil and criminal matters across each judicial district in India.',
    benchesCount: '670+ Judicial Districts across India',
    description:
      'The principal court of original civil jurisdiction in the district (District Court) and the highest criminal court in the district (Sessions Court) empowered to pass any sentence authorized by law including capital punishment (subject to High Court confirmation).',
    powers: [
      'Trial of major criminal offenses & capital offenses',
      'Unlimited pecuniary jurisdiction in original civil suits',
      'Appeals from Civil Judges (Senior Division) and Magistrates',
      'Granting of Regular & Anticipatory Bail',
    ],
  },
  {
    id: 'subordinate-judiciary',
    name: 'Subordinate & Magisterial Courts',
    hindiName: 'अधीनस्थ न्यायालय',
    level: 'Subordinate',
    presidedBy: 'Civil Judges (Junior/Senior Div.) & Judicial Magistrates (CJM / JMFC)',
    jurisdiction:
      'Civil suits according to pecuniary limits; summary and cognizable trials up to 7 years imprisonment (CJM) or 3 years (JMFC).',
    benchesCount: 'Taluk / Tehsil level courts nationwide',
    description:
      'The grassroots level of the Indian judicial pyramid where the majority of litigation originates, including Lok Adalats and Gram Nyayalayas for expedited rural dispute resolution.',
    powers: [
      'Cognizance of Police Reports and Private Complaints',
      'Summary trials and committal of sessions cases',
      'Injunctions and small cause property disputes',
      'Cheque bounce matters under Section 138 NI Act',
    ],
  },
  {
    id: 'tribunals',
    name: 'Specialized Judicial Tribunals',
    hindiName: 'विशिष्ट अधिकरण',
    level: 'Tribunal',
    presidedBy: 'Judicial & Technical Members / Retired Judges',
    jurisdiction:
      'Domain-specific disputes: Company law (NCLT/NCLAT), Environment (NGT), Armed forces (AFT), Administrative services (CAT/SAT), Tax (ITAT/CESTAT).',
    benchesCount: 'Benches in major metropolitan judicial circuits',
    description:
      'Quasi-judicial and specialized appellate authorities established under Articles 323A and 323B to relieve docket load and provide specialized domain adjudication.',
    powers: [
      'Insolvency & Bankruptcy Code (IBC) adjudication',
      'Environmental clearances and polluter-pays directives',
      'Central civil services service conditions and pension disputes',
    ],
  },
];

export const RECENT_NOTIFICATIONS: LegalNotification[] = [
  {
    id: 'notif-1',
    title: 'Supreme Court Constitution Bench: Digital Evidence Directives',
    category: 'Supreme Court',
    time: '15 mins ago',
    unread: true,
    summary:
      'Standard Operating Procedure issued for mandatory electronic hash validation under BSA 2023 for all Trial Courts.',
    linkText: 'View Order in SLP (Crl) No. 4120/2026',
  },
  {
    id: 'notif-2',
    title: 'Ministry of Law & Justice: High Court Judge Elevation Gazette',
    category: 'Gazette',
    time: '2 hours ago',
    unread: true,
    summary:
      'President of India appoints 6 new judges to the High Court of Judicature at Bombay and Delhi High Court.',
    linkText: 'Gazette Notification No. S.O. 1892(E)',
  },
  {
    id: 'notif-3',
    title: 'Bar Council of India: All India Bar Exam (AIBE) Notification',
    category: 'Bar Council',
    time: '5 hours ago',
    unread: false,
    summary:
      'Updated schedule for verification of state rolls and syllabus alignment with new criminal statutes.',
    linkText: 'BCI Circular 44/2026',
  },
  {
    id: 'notif-4',
    title: 'Delhi High Court: Commercial Division e-Filing Protocol',
    category: 'High Court',
    time: '1 day ago',
    unread: false,
    summary:
      'Mandatory PDF/A format with digital signatures now enforced for all pleadings in commercial suits above ₹3 Lakhs.',
    linkText: 'Practice Direction 08/2026',
  },
];

export const INITIAL_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'bm-1',
    title: 'Article 21: Right to Privacy & Bodily Autonomy',
    category: 'Article',
    reference: 'Constitution of India • Part III',
    savedDate: 'Today, 09:30 AM',
  },
  {
    id: 'bm-2',
    title: 'Bharatiya Nyaya Sanhita – Section 103 (Murder & Lynching)',
    category: 'Statute',
    reference: 'BNS 2023 • Act 45 of 2023',
    savedDate: 'Yesterday',
  },
  {
    id: 'bm-3',
    title: 'K.S. Puttaswamy v. Union of India (2017) 10 SCC 1',
    category: 'Judgement',
    reference: '9-Judge Bench • Supreme Court of India',
    savedDate: '3 days ago',
  },
  {
    id: 'bm-4',
    title: 'Standard Format for Commercial Summary Plaints under Order 37',
    category: 'Court Guide',
    reference: 'CPC 1908 • High Court Practice Rules',
    savedDate: '1 week ago',
  },
];

export const MOCK_CASES: CaseRecord[] = [];
