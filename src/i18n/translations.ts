import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  nav: {
    brandName: string;
    brandTag: string;
    dashboard: string;
    analytics: string;
    constitution: string;
    laws: string;
    case_tracker: string;
    legal_search: string;
    ai_bot: string;
    bookmarks: string;
    profile: string;
    settings: string;
    securePortal: string;
    version: string;
  };
  topNav: {
    searchPlaceholder: string;
    aiAssistant: string;
    notifications: string;
    markAllRead: string;
    noNotifications: string;
    counselRole: string;
    barRegistration: string;
    viewProfile: string;
    portalSettings: string;
    signOut: string;
  };
  dashboard: {
    satyameva: string;
    portalSubtitle: string;
    mainTitle: string;
    mainSubtitle: string;
    quickSearch: string;
    reloadPreview: string;
    constitutionTitle: string;
    constitutionSub: string;
    constitutionBadge: string;
    constitutionMeta: string;
    lawsTitle: string;
    lawsSub: string;
    lawsBadge: string;
    lawsMeta: string;
    courtsTitle: string;
    courtsSub: string;
    courtsBadge: string;
    courtsMeta: string;
    exploreProvisions: string;
    viewHierarchy: string;
    criminalReformsTitle: string;
    criminalReformsSub: string;
    criminalReformsDesc: string;
    caseTrackerTitle: string;
    caseTrackerSub: string;
    caseTrackerDesc: string;
    aiAssistantTitle: string;
    aiAssistantSub: string;
    aiAssistantDesc: string;
  };
  settings: {
    pageTitle: string;
    pageSubtitle: string;
    resetDefaults: string;
    appearance: string;
    darkModeTitle: string;
    darkModeSub: string;
    compactViewTitle: string;
    compactViewSub: string;
    notifications: string;
    pushNotificationsTitle: string;
    pushNotificationsSub: string;
    languageRegion: string;
    interfaceLanguageTitle: string;
    interfaceLanguageSub: string;
    dualDiglotNote: string;
    autoSyncBadge: string;
    toastThemeUpdated: string;
    toastCompactUpdated: string;
    toastNotificationUpdated: string;
    toastLanguageUpdated: string;
    toastDefaultsRestored: string;
    returnToDashboard: string;
  };
  analytics: {
    modalTitle: string;
    modalSubtitle: string;
    clearanceRate: string;
    clearanceGrowth: string;
    digitizedCases: string;
    digitizedNote: string;
    virtualCourts: string;
    virtualNote: string;
    efficiencyIndex: string;
    colHighCourt: string;
    colJudges: string;
    colFilings: string;
    colRatio: string;
  };
  constitution: {
    modalTitle: string;
    modalSubtitle: string;
    tabArticles: string;
    tabPreamble: string;
    tabSchedules: string;
    searchPlaceholder: string;
    badgePreamble: string;
    preambleHeadline: string;
    preambleText: string;
    bookmarkArticle: string;
    bookmarked: string;
    filterAll: string;
    filterFundamentalRights: string;
    filterDirectivePrinciples: string;
    filterJudiciary: string;
  };
  laws: {
    modalTitle: string;
    modalSubtitle: string;
    searchPlaceholder: string;
    tabAllActs: string;
    tabSanhitas: string;
    tabCommercial: string;
    sectionLookup: string;
    cognizable: string;
    bailable: string;
    compoundable: string;
    punishment: string;
    enactmentYear: string;
  };
  courtSystem: {
    modalTitle: string;
    modalSubtitle: string;
    supremeCourt: string;
    supremeCourtDesc: string;
    highCourts: string;
    highCourtsDesc: string;
    districtCourts: string;
    districtCourtsDesc: string;
    tribunals: string;
    tribunalsDesc: string;
    constitutionalBench: string;
    specialLeavePetition: string;
  };
  caseTracker: {
    modalTitle: string;
    modalSubtitle: string;
    searchPlaceholder: string;
    searchButton: string;
    petitioner: string;
    respondent: string;
    courtBench: string;
    nextHearing: string;
    caseStatus: string;
    stage: string;
    advocate: string;
    viewDailyOrder: string;
    recentDockets: string;
  };
  legalSearch: {
    modalTitle: string;
    modalSubtitle: string;
    searchPrompt: string;
    allFilters: string;
    filterArticles: string;
    filterStatutes: string;
    filterJudgments: string;
    filterCourts: string;
    recentSearches: string;
    noResults: string;
    quickTip: string;
  };
  aiBot: {
    modalTitle: string;
    modalSubtitle: string;
    welcomeMsg: string;
    inputPlaceholder: string;
    sendButton: string;
    disclaimer: string;
    suggestedQueries: string;
    suggestQ1: string;
    suggestQ2: string;
    suggestQ3: string;
    generating: string;
    tabBot: string;
    tabDataset: string;
    tabCrawler: string;
    tabInspector: string;
    exactProvisionHeader: string;
    simpleExplanationHeader: string;
    keyPointsHeader: string;
    relevantCasesHeader: string;
    sourceHeader: string;
    fallbackBadge: string;
    verifiedDatasetBadge: string;
    insufficientInfoTitle: string;
  };
  bookmarks: {
    modalTitle: string;
    modalSubtitle: string;
    savedCount: string;
    emptyTitle: string;
    emptySubtitle: string;
    removeBookmark: string;
    savedOn: string;
  };
  profile: {
    modalTitleProfile: string;
    modalTitleSettings: string;
    modalSubtitle: string;
    tabCounsel: string;
    tabSystem: string;
    fullName: string;
    barCouncilNo: string;
    chamberAddress: string;
    courtAlerts: string;
    courtAlertsDesc: string;
    citationStandard: string;
    citationStandardDesc: string;
    syncTitle: string;
    syncDesc: string;
    activeStatus: string;
    cancel: string;
    saveChanges: string;
    saved: string;
  };
  common: {
    close: string;
    cancel: string;
    save: string;
    saved: string;
    active: string;
    search: string;
    filter: string;
    back: string;
    remove: string;
    loading: string;
    view: string;
    details: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    nav: {
      brandName: 'JUSTICIA',
      brandTag: 'LAW PORTAL',
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      constitution: 'Constitution',
      laws: 'Laws & Statutes',
      case_tracker: 'Case Tracker',
      legal_search: 'Legal Search',
      ai_bot: 'Legal Bot',
      bookmarks: 'Bookmarks',
      profile: 'Profile',
      settings: 'Settings',
      securePortal: 'Secure Portal',
      version: 'v3.2 Official',
    },
    topNav: {
      searchPlaceholder: 'Search cases, statutes, articles...',
      aiAssistant: 'Legal Assistant',
      notifications: 'Notifications',
      markAllRead: 'Mark all as read',
      noNotifications: 'No unread notifications',
      counselRole: 'Senior Standing Counsel',
      barRegistration: 'D/1842/2014 • SCBA',
      viewProfile: 'Counsel Profile',
      portalSettings: 'Portal Settings',
      signOut: 'Sign Out / Lock Portal',
    },
    dashboard: {
      satyameva: 'Truth Alone Triumphs',
      portalSubtitle: 'National Legal Knowledge & Information Repository',
      mainTitle: 'INDIAN LEGAL SYSTEM',
      mainSubtitle:
        'Comprehensive, authoritative access to the Constitutional framework, Central statutes, Bharatiya Sanhitas, and the multi-tiered judicial hierarchy of the Republic of India.',
      quickSearch: 'Instant Citation & Statute Search',
      reloadPreview: 'Reload Preview Effect',
      constitutionTitle: 'CONSTITUTION OF INDIA',
      constitutionSub: 'Explore articles, schedules, amendments and constitutional provisions.',
      constitutionBadge: 'Supreme Law of the Land',
      constitutionMeta: '395 Articles • 12 Schedules • 106 Amendments',
      lawsTitle: 'LAWS OF INDIA',
      lawsSub: 'Browse Indian laws, acts, statutes and legal regulations.',
      lawsBadge: 'Central & State Statutes',
      lawsMeta: 'BNS 2023 • BNSS • BSA • CPC • Companies Act',
      courtsTitle: 'COURT SYSTEM',
      courtsSub: 'Explore the Supreme Court, High Courts, District Courts and judicial hierarchy.',
      courtsBadge: 'Judicial Hierarchy',
      courtsMeta: 'Apex Court • 25 High Courts • 670+ District Courts',
      exploreProvisions: 'Explore Provisions',
      viewHierarchy: 'View Judicial Hierarchy',
      criminalReformsTitle: 'Criminal Law Reforms (2024–26)',
      criminalReformsSub: 'BNS, BNSS & BSA Transition Tables',
      criminalReformsDesc:
        'Section-by-section comparison index between IPC 1860, CrPC 1973, and newly enacted Sanhitas.',
      caseTrackerTitle: 'National Case Docket Status',
      caseTrackerSub: 'Real-time CNR & Diary Lookup',
      caseTrackerDesc:
        'Track daily orders, interim stays, caveats, and next hearing dates across all High Courts.',
      aiAssistantTitle: 'Legal Research Bot',
      aiAssistantSub: 'Automated Statutory Citations',
      aiAssistantDesc:
        'Formulate legal propositions, draft writ petitions grounds, and cite binding Supreme Court precedents.',
    },
    settings: {
      pageTitle: 'Portal Settings',
      pageSubtitle: 'Manage your Justicia preferences and account configuration.',
      resetDefaults: 'Reset Defaults',
      appearance: 'APPEARANCE',
      darkModeTitle: 'Dark Mode',
      darkModeSub: 'Enable dark theme (recommended)',
      compactViewTitle: 'Compact View',
      compactViewSub: 'Reduce padding for more content visibility',
      notifications: 'NOTIFICATIONS',
      pushNotificationsTitle: 'Push Notifications',
      pushNotificationsSub: 'Hearing reminders, amendment alerts, case updates',
      languageRegion: 'LANGUAGE & REGION',
      interfaceLanguageTitle: 'Interface Language',
      interfaceLanguageSub:
        'Choose your preferred language for statutory terms, docket headings, and system navigation.',
      dualDiglotNote:
        'Constitution of India & Central Acts remain available in dual Diglot editions (English & Hindi).',
      autoSyncBadge: 'Automatic NJDG Sync',
      toastThemeUpdated: 'Theme updated',
      toastCompactUpdated: 'Compact view updated',
      toastNotificationUpdated: 'Push notification preference updated',
      toastLanguageUpdated: 'Interface language updated',
      toastDefaultsRestored: 'Preferences restored to recommended defaults',
      returnToDashboard: 'Return to Indian Legal System Dashboard',
    },
    analytics: {
      modalTitle: 'NATIONAL JUDICIAL ANALYTICS (NJDG INSIGHTS)',
      modalSubtitle: 'Case Clearance Rates • High Court Dockets • Legal Disposals',
      clearanceRate: 'Annual Case Clearance Rate',
      clearanceGrowth: '+3.2% from previous judicial calendar',
      digitizedCases: 'Digitized High Court Cases',
      digitizedNote: 'Across 25 High Court registries',
      virtualCourts: 'Virtual Courts Traffic & Petty Cases',
      virtualNote: 'Online adjudications completed',
      efficiencyIndex: 'High Court Efficiency & Disposal Index',
      colHighCourt: 'High Court',
      colJudges: 'Sanctioned Judges',
      colFilings: 'Monthly Filings',
      colRatio: 'Clearance Ratio',
    },
    constitution: {
      modalTitle: 'CONSTITUTION OF INDIA (SAMVIDHAN)',
      modalSubtitle: 'Supreme Lex of India • 395 Articles • 12 Schedules • 106 Amendments',
      tabArticles: 'Constitutional Articles',
      tabPreamble: 'The Preamble',
      tabSchedules: 'Schedules & Lists',
      searchPlaceholder: 'Search Article No., Title, or Keyword (e.g., Article 21, Liberty, Tax)...',
      badgePreamble: 'Preamble of the Sovereign Republic of India',
      preambleHeadline: 'WE, THE PEOPLE OF INDIA...',
      preambleText:
        'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation...',
      bookmarkArticle: 'Bookmark Article',
      bookmarked: 'Bookmarked',
      filterAll: 'All Articles',
      filterFundamentalRights: 'Part III - Fundamental Rights',
      filterDirectivePrinciples: 'Part IV - DPSP',
      filterJudiciary: 'Part V - Union Judiciary',
    },
    laws: {
      modalTitle: 'LAWS & STATUTES OF INDIA',
      modalSubtitle: 'Bharatiya Nyaya Sanhita, Central Acts, Codes & Bare Acts',
      searchPlaceholder: 'Search Statute, Section No., or Offence (e.g., Section 302, BNS 103)...',
      tabAllActs: 'All Central Acts',
      tabSanhitas: 'New Sanhitas (2023)',
      tabCommercial: 'Commercial & Civil',
      sectionLookup: 'Section Analysis & Penal Scope',
      cognizable: 'Cognizable',
      bailable: 'Non-Bailable',
      compoundable: 'Non-Compoundable',
      punishment: 'Punishment',
      enactmentYear: 'Year of Enactment',
    },
    courtSystem: {
      modalTitle: 'JUDICIAL SYSTEM & HIERARCHY OF INDIA',
      modalSubtitle: 'Integrated Single Judiciary • Apex Court to Subordinate Judiciary',
      supremeCourt: 'Supreme Court of India',
      supremeCourtDesc:
        'Apex court established under Article 124. Final court of appeal, guardian of fundamental rights with Article 32 writ powers.',
      highCourts: 'High Courts of States & UTs',
      highCourtsDesc:
        '25 High Courts serving States and Union Territories. Supervisory jurisdiction over subordinate courts under Article 227.',
      districtCourts: 'District & Sessions Courts',
      districtCourtsDesc:
        'Principal civil and criminal courts of original jurisdiction in each judicial district.',
      tribunals: 'Specialized Tribunals (NCLT, NGT, SAT)',
      tribunalsDesc:
        'Quasi-judicial bodies created for speedy adjudication of company, environmental, and financial disputes.',
      constitutionalBench: 'Constitutional Bench (5+ Judges)',
      specialLeavePetition: 'Special Leave Petition (Article 136)',
    },
    caseTracker: {
      modalTitle: 'NATIONAL CASE DOCKET TRACKER',
      modalSubtitle: 'Real-time CNR, Case Number & Cause List Aggregator',
      searchPlaceholder: 'Enter 16-Digit CNR Number or Case ID (e.g., DLHC010048292024)...',
      searchButton: 'Track Docket',
      petitioner: 'Petitioner',
      respondent: 'Respondent',
      courtBench: 'Court & Bench',
      nextHearing: 'Next Hearing Date',
      caseStatus: 'Docket Status',
      stage: 'Current Stage',
      advocate: 'Counsel on Record',
      viewDailyOrder: 'View Daily Order (PDF)',
      recentDockets: 'Recently Tracked Matters',
    },
    legalSearch: {
      modalTitle: 'UNIFIED LEGAL INTELLIGENCE SEARCH',
      modalSubtitle: 'Federated Search across Constitution, Acts, Precedents & Rules',
      searchPrompt: 'Search any legal provision, citation, case name, or doctrine...',
      allFilters: 'All Domains',
      filterArticles: 'Constitutional Articles',
      filterStatutes: 'Statutory Sections',
      filterJudgments: 'SC Precedents',
      filterCourts: 'Court Rules',
      recentSearches: 'Popular Inquiries',
      noResults: 'No legal records found matching your query.',
      quickTip: 'Tip: You can search neutral citations like "2024 INSC 482" or "Article 19(1)(a)".',
    },
    aiBot: {
      modalTitle: 'LEGAL RESEARCH ASSISTANT',
      modalSubtitle: 'Grounded Indian Jurisprudence, Bare Acts & Case Law Intelligence',
      welcomeMsg:
        'Namaste Counsel. I am your RAG-powered Legal Research Assistant for Indian Law. All responses are strictly grounded in retrieved legal documents, verified statutory datasets, and approved web crawler sources.',
      inputPlaceholder: 'Ask a legal query (e.g. "What is Article 21?", "Punishment under BNS Section 103")...',
      sendButton: 'Search & RAG Generate',
      disclaimer:
        'Disclaimer: Grounded RAG outputs are generated strictly from verified legal datasets and approved government sources.',
      suggestedQueries: 'Quick RAG Legal Inquiries',
      suggestQ1: 'What is Article 21?',
      suggestQ2: 'What is punishment under BNS Section 103?',
      suggestQ3: 'Procedure for anticipatory bail under BNSS Section 482 vs CrPC 438',
      generating: 'Searching legal dataset, reranking, and generating grounded response...',
      tabBot: 'RAG Legal Assistant',
      tabDataset: 'Legal Dataset Storage',
      tabCrawler: 'Legal Web Crawler Hub',
      tabInspector: 'RAG Execution Inspector',
      exactProvisionHeader: 'EXACT LEGAL PROVISION',
      simpleExplanationHeader: 'SIMPLE EXPLANATION',
      keyPointsHeader: 'KEY POINTS',
      relevantCasesHeader: 'RELATED CASES / PRECEDENTS',
      sourceHeader: 'VERIFIED SOURCE & CITATION',
      fallbackBadge: 'Web Crawler Fallback Activated',
      verifiedDatasetBadge: 'Verified Legal Dataset Match',
      insufficientInfoTitle: 'Sufficient Verified Information Not Found',
    },
    bookmarks: {
      modalTitle: 'MY LEGAL BOOKMARKS',
      modalSubtitle: 'Saved Articles, Sanhitas Sections & Case Precedents',
      savedCount: 'Saved Items',
      emptyTitle: 'No bookmarks saved yet.',
      emptySubtitle:
        'Explore the Constitution, Laws, or Case Tracker and click the bookmark icon to save references.',
      removeBookmark: 'Remove bookmark',
      savedOn: 'Saved on',
    },
    profile: {
      modalTitleProfile: 'COUNSEL ADVOCATE PROFILE',
      modalTitleSettings: 'PORTAL PREFERENCES & SETTINGS',
      modalSubtitle: 'Justicia Indian Legal Information System',
      tabCounsel: 'Counsel Details',
      tabSystem: 'System Preferences',
      fullName: 'Full Legal Name',
      barCouncilNo: 'Bar Council Registration Number',
      chamberAddress: 'Chamber / Official Address',
      courtAlerts: 'Supreme Court Cause List Alerts',
      courtAlertsDesc: 'Receive immediate notifications when your cases appear in the daily cause list.',
      citationStandard: 'Preferred Citation Standard',
      citationStandardDesc: 'Auto-format legal citations for Supreme Court and High Courts submissions.',
      syncTitle: 'e-Courts 3.0 Real-time Sync',
      syncDesc: 'Continuous synchronization with National Judicial Data Grid (NJDG).',
      activeStatus: 'Active',
      cancel: 'Cancel',
      saveChanges: 'Save Changes',
      saved: 'Saved!',
    },
    common: {
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      saved: 'Saved',
      active: 'Active',
      search: 'Search',
      filter: 'Filter',
      back: 'Back',
      remove: 'Remove',
      loading: 'Loading...',
      view: 'View',
      details: 'Details',
    },
  },
  hi: {
    nav: {
      brandName: 'जस्टिसिया',
      brandTag: 'विधि पोर्टल',
      dashboard: 'डैशबोर्ड',
      analytics: 'न्यायिक विश्लेषण',
      constitution: 'भारत का संविधान',
      laws: 'अधिनियम एवं विधियां',
      case_tracker: 'केस ट्रैकर',
      legal_search: 'विधिक खोज',
      ai_bot: 'लीगल बॉट',
      bookmarks: 'बुकमार्क',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      securePortal: 'सुरक्षित पोर्टल',
      version: 'v3.2 आधिकारिक',
    },
    topNav: {
      searchPlaceholder: 'केस, संविधि, अनुच्छेद खोजें...',
      aiAssistant: 'विधिक सहायक',
      notifications: 'सूचनाएं',
      markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
      noNotifications: 'कोई नई सूचना नहीं है',
      counselRole: 'वरिष्ठ स्थायी अधिवक्ता',
      barRegistration: 'D/1842/2014 • बार काउंसिल',
      viewProfile: 'अधिवक्ता प्रोफ़ाइल',
      portalSettings: 'पोर्टल सेटिंग्स',
      signOut: 'साइन आउट / पोर्टल लॉक करें',
    },
    dashboard: {
      satyameva: 'Truth Alone Triumphs',
      portalSubtitle: 'राष्ट्रीय विधिक ज्ञान एवं सूचना भंडार',
      mainTitle: 'भारतीय विधिक प्रणाली',
      mainSubtitle:
        'भारत गणराज्य के संवैधानिक ढांचे, केंद्रीय संविधियों, भारतीय संहिताओं और बहुस्तरीय न्यायिक पदानुक्रम तक प्रामाणिक एवं विस्तृत पहुंच।',
      quickSearch: 'त्वरित उद्धरण एवं संविधि खोज',
      reloadPreview: 'पूर्वावलोकन प्रभाव रीलोड करें',
      constitutionTitle: 'भारत का संविधान',
      constitutionSub: 'अनुच्छेदों, अनुसूचियों, संशोधनों और संवैधानिक प्रावधानों का अन्वेषण करें।',
      constitutionBadge: 'देश का सर्वोच्च कानून',
      constitutionMeta: '395 अनुच्छेद • 12 अनुसूचियां • 106 संशोधन',
      lawsTitle: 'भारतीय संविधियां एवं कानून',
      lawsSub: 'भारतीय कानूनों, अधिनियमों, संविधियों एवं विधिक विनियमों को ब्राउज़ करें।',
      lawsBadge: 'केंद्रीय एवं राज्य विधियां',
      lawsMeta: 'बीएनएस 2023 • बीएनएसएस • बीएसए • सीपीसी • कंपनी अधिनियम',
      courtsTitle: 'न्यायिक व्यवस्था एवं न्यायालय',
      courtsSub: 'सर्वोच्च न्यायालय, उच्च न्यायालयों, जिला न्यायालयों एवं पदानुक्रम का अन्वेषण करें।',
      courtsBadge: 'न्यायिक पदानुक्रम',
      courtsMeta: 'सर्वोच्च न्यायालय • 25 उच्च न्यायालय • 670+ जिला न्यायालय',
      exploreProvisions: 'प्रावधान देखें',
      viewHierarchy: 'न्यायिक पदानुक्रम देखें',
      criminalReformsTitle: 'आपराधिक कानून सुधार (2024–26)',
      criminalReformsSub: 'बीएनएस, बीएनएसएस एवं बीएसए संक्रमण सारणियां',
      criminalReformsDesc:
        'आईपीसी 1860, सीआरपीसी 1973 और नई संहिताओं के बीच धारा-वार तुलनात्मक सूचकांक।',
      caseTrackerTitle: 'राष्ट्रीय केस वाद सूची स्थिति',
      caseTrackerSub: 'रीयल-टाइम सीएनआर एवं डायरी संख्या खोज',
      caseTrackerDesc:
        'दैनिक आदेश, अंतरिम स्थगन, कैविएट और अगली सुनवाई तिथियों को ट्रैक करें।',
      aiAssistantTitle: 'लीगल रिसर्च बॉट',
      aiAssistantSub: 'स्वचालित वैधानिक उद्धरण एवं प्रारूपण',
      aiAssistantDesc:
        'विधिक प्रस्ताव तैयार करें, याचिका के आधार बनाएं और सर्वोच्च न्यायालय के दृष्टांत उद्धृत करें।',
    },
    settings: {
      pageTitle: 'पोर्टल सेटिंग्स',
      pageSubtitle: 'अपनी प्राथमिकताएं और खाता कॉन्फ़िगरेशन प्रबंधित करें।',
      resetDefaults: 'डिफ़ॉल्ट रीसेट करें',
      appearance: 'दिखावट (APPEARANCE)',
      darkModeTitle: 'डार्क मोड (Dark Mode)',
      darkModeSub: 'डार्क थीम सक्षम करें (अनुशंसित)',
      compactViewTitle: 'कॉम्पैक्ट व्यू (Compact View)',
      compactViewSub: 'अधिक सामग्री दृश्यता के लिए पैडिंग कम करें',
      notifications: 'अधिसूचनाएं (NOTIFICATIONS)',
      pushNotificationsTitle: 'पुश सूचनाएं (Push Notifications)',
      pushNotificationsSub: 'सुनवाई अनुस्मारक, संशोधन अलर्ट, केस अपडेट',
      languageRegion: 'भाषा और क्षेत्र (LANGUAGE & REGION)',
      interfaceLanguageTitle: 'इंटरफ़ेस भाषा',
      interfaceLanguageSub: 'विधिक शब्दों, वाद शीर्षकों और नेविगेशन के लिए अपनी पसंदीदा भाषा चुनें।',
      dualDiglotNote: 'भारत का संविधान एवं केंद्रीय अधिनियम द्विभाषी संस्करण (अंग्रेजी और हिंदी) में उपलब्ध हैं।',
      autoSyncBadge: 'स्वचालित एनजेडीजी सिंक',
      toastThemeUpdated: 'थीम सफलतापूर्वक अपडेट हो गई',
      toastCompactUpdated: 'कॉम्पैक्ट व्यू अपडेट किया गया',
      toastNotificationUpdated: 'पुश अधिसूचना प्राथमिकताएं अपडेट की गईं',
      toastLanguageUpdated: 'इंटरफ़ेस भाषा हिंदी में बदली गई',
      toastDefaultsRestored: 'प्राथमिकताएं अनुशंसित डिफ़ॉल्ट पर पुनर्स्थापित की गईं',
      returnToDashboard: 'भारतीय विधिक प्रणाली डैशबोर्ड पर वापस जाएं',
    },
    analytics: {
      modalTitle: 'राष्ट्रीय न्यायिक विश्लेषण (एनजेडीजी अंतर्दृष्टि)',
      modalSubtitle: 'केस निपटान दरें • उच्च न्यायालय वाद सूची • विधिक निपटान',
      clearanceRate: 'वार्षिक केस निपटान दर',
      clearanceGrowth: 'पिछले न्यायिक वर्ष से +3.2%',
      digitizedCases: 'डिजिटल उच्च न्यायालय केस',
      digitizedNote: '25 उच्च न्यायालय रजिस्ट्रियों में',
      virtualCourts: 'वर्चुअल कोर्ट ट्रैफिक एवं छोटे मामले',
      virtualNote: 'ऑनलाइन न्यायिक निपटान पूर्ण',
      efficiencyIndex: 'उच्च न्यायालय दक्षता एवं निपटान सूचकांक',
      colHighCourt: 'उच्च न्यायालय',
      colJudges: 'स्वीकृत न्यायाधीश',
      colFilings: 'मासिक दाखिले',
      colRatio: 'निपटान अनुपात',
    },
    constitution: {
      modalTitle: 'भारत का संविधान (संविधान)',
      modalSubtitle: 'भारत का सर्वोच्च कानून • 395 अनुच्छेद • 12 अनुसूचियां • 106 संशोधन',
      tabArticles: 'संवैधानिक अनुच्छेद',
      tabPreamble: 'प्रस्तावना (Preamble)',
      tabSchedules: 'अनुसूचियां एवं सूचियां',
      searchPlaceholder: 'अनुच्छेद संख्या, शीर्षक या कीवर्ड खोजें...',
      badgePreamble: 'संप्रभु भारत गणराज्य की प्रस्तावना',
      preambleHeadline: 'हम, भारत के लोग...',
      preambleText:
        'हम, भारत के लोग, भारत को एक सम्पूर्ण प्रभुत्व-सम्पन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य बनाने के लिए तथा उसके समस्त नागरिकों को: सामाजिक, आर्थिक और राजनीतिक न्याय; विचार, अभिव्यक्ति, विश्वास, धर्म और उपासना की स्वतंत्रता; प्रतिष्ठा और अवसर की समता प्राप्त कराने के लिए...',
      bookmarkArticle: 'अनुच्छेद बुकमार्क करें',
      bookmarked: 'बुकमार्क किया गया',
      filterAll: 'सभी अनुच्छेद',
      filterFundamentalRights: 'भाग III - मौलिक अधिकार',
      filterDirectivePrinciples: 'भाग IV - नीति निर्देशक तत्व',
      filterJudiciary: 'भाग V - संघ न्यायपालिका',
    },
    laws: {
      modalTitle: 'भारत के कानून एवं संविधियां',
      modalSubtitle: 'भारतीय न्याय संहिता, केंद्रीय अधिनियम एवं मूल संविधियां',
      searchPlaceholder: 'अधिनियम, धारा संख्या या अपराध खोजें (उदा. धारा 302, बीएनएस 103)...',
      tabAllActs: 'सभी केंद्रीय अधिनियम',
      tabSanhitas: 'नवीन संहिताएं (2023)',
      tabCommercial: 'वाणिज्यिक एवं दीवानी',
      sectionLookup: 'धारा विश्लेषण एवं दंडात्मक दायरा',
      cognizable: 'संज्ञेय',
      bailable: 'गैर-जमानती',
      compoundable: 'गैर-शमनीय',
      punishment: 'सजा / दंड',
      enactmentYear: 'अधिनियमन वर्ष',
    },
    courtSystem: {
      modalTitle: 'भारतीय न्यायिक प्रणाली एवं पदानुक्रम',
      modalSubtitle: 'एकीकृत एकल न्यायपालिका • शीर्ष अदालत से अधीनस्थ अदालतें',
      supremeCourt: 'भारत का सर्वोच्च न्यायालय',
      supremeCourtDesc:
        'अनुच्छेद 124 के तहत स्थापित शीर्ष अदालत। अपील की अंतिम अदालत, अनुच्छेद 32 रिट शक्तियों के साथ मौलिक अधिकारों का संरक्षक।',
      highCourts: 'राज्यों एवं केंद्र शासित प्रदेशों के उच्च न्यायालय',
      highCourtsDesc:
        '25 उच्च न्यायालय। अनुच्छेद 227 के तहत अधीनस्थ न्यायालयों पर अधीक्षण क्षेत्राधिकार।',
      districtCourts: 'जिला एवं सत्र न्यायालय',
      districtCourtsDesc: 'प्रत्येक न्यायिक जिले में मूल क्षेत्राधिकार के प्रमुख दीवानी और आपराधिक न्यायालय।',
      tribunals: 'विशेष अधिकरण (एनसीएलटी, एनजीटी, सैट)',
      tribunalsDesc: 'कंपनी, पर्यावरण और वित्तीय विवादों के त्वरित निपटान हेतु गठित निकाय।',
      constitutionalBench: 'संविधान पीठ (5+ न्यायाधीश)',
      specialLeavePetition: 'विशेष अनुमति याचिका (अनुच्छेद 136)',
    },
    caseTracker: {
      modalTitle: 'राष्ट्रीय केस वाद सूची ट्रैकर',
      modalSubtitle: 'रीयल-टाइम सीएनआर, केस नंबर एवं वाद सूची एग्रीगेटर',
      searchPlaceholder: '16-अंकीय सीएनआर नंबर या केस आईडी दर्ज करें...',
      searchButton: 'केस ट्रैक करें',
      petitioner: 'याचिकाकर्ता',
      respondent: 'प्रतिवादी',
      courtBench: 'न्यायालय एवं पीठ',
      nextHearing: 'अगली सुनवाई तिथि',
      caseStatus: 'केस स्थिति',
      stage: 'वर्तमान चरण',
      advocate: 'अधिवक्ता',
      viewDailyOrder: 'दैनिक आदेश देखें (पीडीएफ)',
      recentDockets: 'हाल ही में ट्रैक किए गए मामले',
    },
    legalSearch: {
      modalTitle: 'एकीकृत विधिक खोज प्रणाली',
      modalSubtitle: 'संविधान, अधिनियम, न्यायिक दृष्टांत एवं नियमों में संयुक्त खोज',
      searchPrompt: 'कोई भी विधिक प्रावधान, उद्धरण, केस का नाम या सिद्धांत खोजें...',
      allFilters: 'सभी प्रक्षेत्र',
      filterArticles: 'संवैधानिक अनुच्छेद',
      filterStatutes: 'वैधानिक धाराएं',
      filterJudgments: 'सर्वोच्च न्यायालय दृष्टांत',
      filterCourts: 'न्यायालय नियम',
      recentSearches: 'लोकप्रिय खोजें',
      noResults: 'आपके खोज से मेल खाता कोई रिकॉर्ड नहीं मिला।',
      quickTip: 'सुझाव: आप "2024 INSC 482" या "अनुच्छेद 21" जैसे उद्धरण खोज सकते हैं।',
    },
    aiBot: {
      modalTitle: 'विधिक अनुसंधान सहायक (RAG)',
      modalSubtitle: 'भारतीय न्यायशास्त्र, मूल संविधियां और सत्यापित लीगल डेटासेट',
      welcomeMsg:
        'नमस्ते। मैं आपका आरएजी (RAG) आधारित विधिक अनुसंधान सहायक हूं। सभी उत्तर केवल सत्यापित विधिक दस्तावेजों, संविधियों और अनुमोदित वेब क्रॉलर से प्राप्त जानकारी पर आधारित हैं।',
      inputPlaceholder: 'कानूनी प्रश्न पूछें (उदा. "अनुच्छेद 21 क्या है?", "बीएनएस धारा 103 में क्या सजा है?")...',
      sendButton: 'खोज एवं RAG विश्लेषण',
      disclaimer: 'अस्वीकरण: RAG आउटपुट केवल सत्यापित विधिक डेटासेट और अनुमोदित सरकारी स्रोतों पर आधारित हैं।',
      suggestedQueries: 'त्वरित RAG विधिक प्रश्न',
      suggestQ1: 'अनुच्छेद 21 क्या है?',
      suggestQ2: 'बीएनएस धारा 103 के तहत क्या सजा है?',
      suggestQ3: 'बीएनएसएस धारा 482 के तहत अग्रिम जमानत की प्रक्रिया',
      generating: 'विधिक डेटासेट में खोज, रीरैंकिंग और RAG उत्तर जनरेट हो रहा है...',
      tabBot: 'RAG विधिक सहायक',
      tabDataset: 'विधिक डेटासेट भंडारण',
      tabCrawler: 'लीगल वेब क्रॉलर हब',
      tabInspector: 'RAG निष्पादन निरीक्षक',
      exactProvisionHeader: 'सटीक विधिक प्रावधान',
      simpleExplanationHeader: 'सरल व्याख्या',
      keyPointsHeader: 'मुख्य बिंदु',
      relevantCasesHeader: 'संबंधित न्यायिक दृष्टांत',
      sourceHeader: 'सत्यापित स्रोत एवं उद्धरण',
      fallbackBadge: 'वेब क्रॉलर फॉलबैक सक्रिय',
      verifiedDatasetBadge: 'सत्यापित विधिक डेटासेट परिणाम',
      insufficientInfoTitle: 'पर्याप्त सत्यापित जानकारी नहीं मिली',
    },
    bookmarks: {
      modalTitle: 'मेरे विधिक बुकमार्क',
      modalSubtitle: 'सहेजे गए अनुच्छेद, संहिता धाराएं एवं न्यायिक दृष्टांत',
      savedCount: 'सहेजी गई वस्तुएं',
      emptyTitle: 'अभी तक कोई बुकमार्क नहीं सहेजा गया।',
      emptySubtitle: 'संविधान या कानून अनुभाग में जाकर बुकमार्क आइकन पर क्लिक करें।',
      removeBookmark: 'बुकमार्क हटाएं',
      savedOn: 'सहेजा गया',
    },
    profile: {
      modalTitleProfile: 'अधिवक्ता प्रोफ़ाइल',
      modalTitleSettings: 'पोर्टल प्राथमिकताएं एवं सेटिंग्स',
      modalSubtitle: 'जस्टिसिया भारतीय विधिक सूचना प्रणाली',
      tabCounsel: 'अधिवक्ता विवरण',
      tabSystem: 'सिस्टम प्राथमिकताएं',
      fullName: 'पूरा कानूनी नाम',
      barCouncilNo: 'बार काउंसिल पंजीकरण संख्या',
      chamberAddress: 'चैंबर / आधिकारिक पता',
      courtAlerts: 'सर्वोच्च न्यायालय वाद सूची अलर्ट',
      courtAlertsDesc: 'जब आपके मामले दैनिक वाद सूची में आते हैं तो तत्काल सूचना प्राप्त करें।',
      citationStandard: 'पसंदीदा उद्धरण मानक',
      citationStandardDesc: 'अदालती प्रस्तुतीकरण हेतु स्वचालित उद्धरण प्रारूप।',
      syncTitle: 'ई-कोर्ट 3.0 रीयल-टाइम सिंक',
      syncDesc: 'राष्ट्रीय न्यायिक डेटा ग्रिड (एनजेडीजी) के साथ सतत समन्वय।',
      activeStatus: 'सक्रिय',
      cancel: 'रद्द करें',
      saveChanges: 'परिवर्तन सहेजें',
      saved: 'सहेजा गया!',
    },
    common: {
      close: 'बंद करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      saved: 'सहेजा गया',
      active: 'सक्रिय',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      back: 'वापस',
      remove: 'हटाएं',
      loading: 'लोड हो रहा है...',
      view: 'देखें',
      details: 'विवरण',
    },
  },
  ta: {
    nav: {
      brandName: 'ஜஸ்டிசியா',
      brandTag: 'சட்ட போர்டல்',
      dashboard: 'முகப்பு',
      analytics: 'நீதித்துறை பகுப்பாய்வு',
      constitution: 'இந்திய அரசியலமைப்பு',
      laws: 'சட்டங்கள் & விதிகள்',
      case_tracker: 'வழக்கு கண்காணிப்பு',
      legal_search: 'சட்டத் தேடல்',
      ai_bot: 'சட்ட பாட்',
      bookmarks: 'புத்தகக்குறிகள்',
      profile: 'சுயவிவரம்',
      settings: 'அமைப்புகள்',
      securePortal: 'பாதுகாப்பான போர்டல்',
      version: 'v3.2 அதிகாரப்பூர்வ',
    },
    topNav: {
      searchPlaceholder: 'வழக்குகள், சட்டங்கள், பிரிவுகளைத் தேடுங்கள்...',
      aiAssistant: 'சட்ட உதவியாளர்',
      notifications: 'அறிவிப்புகள்',
      markAllRead: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
      noNotifications: 'புதிய அறிவிப்புகள் இல்லை',
      counselRole: 'மூத்த நிலையான வழக்கறிஞர்',
      barRegistration: 'D/1842/2014 • பார் கவுன்சில்',
      viewProfile: 'வழக்கறிஞர் சுயவிவரம்',
      portalSettings: 'போர்டல் அமைப்புகள்',
      signOut: 'வெளியேறு / பூட்டு',
    },
    dashboard: {
      satyameva: 'வாய்மையே வெல்லும்',
      portalSubtitle: 'தேசிய சட்ட அறிவு மற்றும் தகவல் களஞ்சியம்',
      mainTitle: 'இந்திய சட்ட அமைப்பு',
      mainSubtitle:
        'இந்தியக் குடியரசின் அரசியலமைப்பு கட்டமைப்பு, மத்திய சட்டங்கள், புதிய பாரதிய சன்ஹிதாக்கள் மற்றும் நீதித்துறை படிநிலைகளுக்கான விரிவான, நம்பகமான தளம்.',
      quickSearch: 'உடனடி சட்டப் பிரிவு தேடல்',
      reloadPreview: 'முன்னோட்டத்தை புதுப்பிக்கவும்',
      constitutionTitle: 'இந்திய அரசியலமைப்பு',
      constitutionSub: 'சரத்துக்கள், அட்டவணைகள், திருத்தங்கள் மற்றும் அரசியலமைப்பு விதிகளை ஆராயுங்கள்.',
      constitutionBadge: 'நாட்டின் உச்ச சட்டம்',
      constitutionMeta: '395 சரத்துக்கள் • 12 அட்டவணைகள் • 106 திருத்தங்கள்',
      lawsTitle: 'இந்திய சட்டங்கள் & சன்ஹிதாக்கள்',
      lawsSub: 'இந்திய சட்டங்கள், சட்டப்பிரிவுகள் மற்றும் விதிகளின் தொகுப்பை உலாவுக.',
      lawsBadge: 'மத்திய & மாநில சட்டங்கள்',
      lawsMeta: 'BNS 2023 • BNSS • BSA • CPC • நிறுவனங்கள் சட்டம்',
      courtsTitle: 'நீதிமன்ற அமைப்பு & படிநிலை',
      courtsSub: 'உச்ச நீதிமன்றம், உயர் நீதிமன்றங்கள், மாவட்ட நீதிமன்றங்களின் முழு விவரங்களை அறியவும்.',
      courtsBadge: 'நீதித்துறை படிநிலை',
      courtsMeta: 'உச்ச நீதிமன்றம் • 25 உயர் நீதிமன்றங்கள் • 670+ மாவட்ட நீதிமன்றங்கள்',
      exploreProvisions: 'விதிமுறைகளை ஆராய்க',
      viewHierarchy: 'படிநிலையைப் பார்க்கவும்',
      criminalReformsTitle: 'குற்றவியல் சட்ட சீர்திருத்தங்கள் (2024–26)',
      criminalReformsSub: 'BNS, BNSS & BSA ஒப்பீட்டு அட்டவணைகள்',
      criminalReformsDesc:
        'IPC 1860, CrPC 1973 மற்றும் புதிய சன்ஹிதாக்களுக்கு இடையேயான பிரிவு ஒப்பீட்டு அட்டவணை.',
      caseTrackerTitle: 'தேசிய வழக்கு நிலை கண்காணிப்பு',
      caseTrackerSub: 'நேரடி CNR & டைரி எண் தேடல்',
      caseTrackerDesc:
        'தினசரி உத்தரவுகள், இடைக்கால தடைகள் மற்றும் அடுத்த விசாரணை தேதிகளைக் கண்காணிக்கவும்.',
      aiAssistantTitle: 'சட்ட ஆராய்ச்சி பாட்',
      aiAssistantSub: 'தானியங்கி சட்ட மேற்கோள்கள் & வரைவு',
      aiAssistantDesc:
        'சட்ட வாதங்களை உருவாக்கவும், மனுக்களைத் தயாரிக்கவும், உச்ச நீதிமன்ற தீர்ப்புகளை மேற்கோள் காட்டவும்.',
    },
    settings: {
      pageTitle: 'போர்டல் அமைப்புகள்',
      pageSubtitle: 'உங்கள் ஜஸ்டிசியா விருப்பத்தேர்வுகள் மற்றும் கணக்கு அமைப்புகளை நிர்வகிக்கவும்.',
      resetDefaults: 'இயல்புநிலைக்கு மீட்டமை',
      appearance: 'தோற்றம் (APPEARANCE)',
      darkModeTitle: 'டார்க் மோட் (Dark Mode)',
      darkModeSub: 'இருண்ட தீமை இயக்கவும் (பரிந்துரைக்கப்படுகிறது)',
      compactViewTitle: 'காம்பாக்ட் வியூ (Compact View)',
      compactViewSub: 'அதிக தகவல்களைக் காண இடைவெளியைக் குறைக்கவும்',
      notifications: 'அறிவிப்புகள் (NOTIFICATIONS)',
      pushNotificationsTitle: 'புஷ் அறிவிப்புகள் (Push Notifications)',
      pushNotificationsSub: 'விசாரணை நினைவூட்டல்கள், சட்ட திருத்த எச்சரிக்கைகள், வழக்கு அப்டேட்கள்',
      languageRegion: 'மொழி & பிராந்தியம் (LANGUAGE & REGION)',
      interfaceLanguageTitle: 'இடைமுக மொழி (Interface Language)',
      interfaceLanguageSub: 'சட்டச் சொற்கள், வழக்கு தலைப்புகள் மற்றும் வழிசெலுத்தலுக்கு உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்.',
      dualDiglotNote: 'இந்திய அரசியலமைப்பு மற்றும் சட்டங்கள் இருமொழி பதிப்புகளில் கிடைக்கின்றன.',
      autoSyncBadge: 'தானியங்கி NJDG ஒத்திசைவு',
      toastThemeUpdated: 'தீம் வெற்றிகரமாக மாற்றப்பட்டது',
      toastCompactUpdated: 'காம்பாக்ட் வியூ புதுப்பிக்கப்பட்டது',
      toastNotificationUpdated: 'அறிவிப்பு விருப்பங்கள் சேமிக்கப்பட்டன',
      toastLanguageUpdated: 'இடைமுக மொழி தமிழுக்கு மாற்றப்பட்டது',
      toastDefaultsRestored: 'அமைப்புகள் இயல்புநிலைக்கு மாற்றப்பட்டன',
      returnToDashboard: 'இந்திய சட்ட அமைப்பு முகப்புக்குத் திரும்பு',
    },
    analytics: {
      modalTitle: 'தேசிய நீதித்துறை பகுப்பாய்வு (NJDG)',
      modalSubtitle: 'வழக்கு முடிப்பு விகிதங்கள் • உயர் நீதிமன்ற ஆவணங்கள்',
      clearanceRate: 'ஆண்டு வழக்கு முடிப்பு விகிதம்',
      clearanceGrowth: 'முந்தைய ஆண்டை விட +3.2%',
      digitizedCases: 'டிஜிட்டல் மயமாக்கப்பட்ட வழக்குகள்',
      digitizedNote: '25 உயர் நீதிமன்ற பதிவேடுகளில்',
      virtualCourts: 'மெய்நிகர் நீதிமன்றங்கள்',
      virtualNote: 'ஆன்லைன் வழக்குகள் முடிவடைந்தன',
      efficiencyIndex: 'உயர் நீதிமன்ற செயல்திறன் குறியீடு',
      colHighCourt: 'உயர் நீதிமன்றம்',
      colJudges: 'நீதிபதிகள்',
      colFilings: 'மாதாந்திர தாக்கல்',
      colRatio: 'முடிப்பு விகிதம்',
    },
    constitution: {
      modalTitle: 'இந்திய அரசியலமைப்பு (அரசியலமைப்பு)',
      modalSubtitle: 'இந்தியாவின் உச்ச சட்டம் • 395 சரத்துக்கள் • 12 அட்டவணைகள் • 106 திருத்தங்கள்',
      tabArticles: 'அரசியலமைப்பு சரத்துக்கள்',
      tabPreamble: 'முகப்புரை (Preamble)',
      tabSchedules: 'அட்டவணைகள்',
      searchPlaceholder: 'சரத்து எண், தலைப்பு தேடவும்...',
      badgePreamble: 'இந்தியக் குடியரசின் முகப்புரை',
      preambleHeadline: 'இந்திய மக்களாகிய நாம்...',
      preambleText: 'இந்திய மக்களாகிய நாம், இந்தியாவை ஒரு இறையாண்மை கொண்ட சோசலிச மதச்சார்பற்ற ஜனநாயகக் குடியரசாக உருவாக்க...',
      bookmarkArticle: 'சரத்தைப் புத்தகக் குறியிடு',
      bookmarked: 'சேமிக்கப்பட்டது',
      filterAll: 'அனைத்து சரத்துக்கள்',
      filterFundamentalRights: 'பகுதி III - அடிப்படை உரிமைகள்',
      filterDirectivePrinciples: 'பகுதி IV - அரசு நெறிமுறைகள்',
      filterJudiciary: 'பகுதி V - ஒன்றிய நீதித்துறை',
    },
    laws: {
      modalTitle: 'இந்திய சட்டங்கள் & சன்ஹிதாக்கள்',
      modalSubtitle: 'பாரதிய நியாய சன்ஹிதா, மத்திய சட்டங்கள்',
      searchPlaceholder: 'சட்டம், பிரிவு எண் தேடவும்...',
      tabAllActs: 'அனைத்து சட்டங்கள்',
      tabSanhitas: 'புதிய சன்ஹிதாக்கள் (2023)',
      tabCommercial: 'வணிக & சிவில்',
      sectionLookup: 'பிரிவு பகுப்பாய்வு',
      cognizable: 'கைது செய்யக்கூடிய',
      bailable: 'பிணையில் வர முடியாத',
      compoundable: 'சமரசம் செய்ய முடியாத',
      punishment: 'தண்டனை',
      enactmentYear: 'இயற்றப்பட்ட ஆண்டு',
    },
    courtSystem: {
      modalTitle: 'இந்திய நீதித்துறை அமைப்பு',
      modalSubtitle: 'உச்ச நீதிமன்றம் முதல் கீழ் நீதிமன்றங்கள் வரை',
      supremeCourt: 'இந்திய உச்ச நீதிமன்றம்',
      supremeCourtDesc: 'அரசியலமைப்பு பிரிவு 124 இன் கீழ் நிறுவப்பட்ட உச்ச நீதிமன்றம்.',
      highCourts: 'உயர் நீதிமன்றங்கள்',
      highCourtsDesc: 'மாநிலங்களுக்கான 25 உயர் நீதிமன்றங்கள்.',
      districtCourts: 'மாவட்ட நீதிமன்றங்கள்',
      districtCourtsDesc: 'மாவட்ட அளவிலான முதன்மை சிவில் மற்றும் குற்றவியல் நீதிமன்றங்கள்.',
      tribunals: 'சிறப்பு தீர்ப்பாயங்கள்',
      tribunalsDesc: 'நிறுவனம், சுற்றுச்சூழல் சார்ந்த சிறப்பு தீர்ப்பாயங்கள்.',
      constitutionalBench: 'அரசியலமைப்பு அமர்வு (5+ நீதிபதிகள்)',
      specialLeavePetition: 'சிறப்பு விடுப்பு மனு (பிரிவு 136)',
    },
    caseTracker: {
      modalTitle: 'தேசிய வழக்கு நிலை கண்காணிப்பு',
      modalSubtitle: 'CNR எண் மற்றும் வழக்கு தேடல்',
      searchPlaceholder: '16-இலக்க CNR எண்ணை உள்ளிடவும்...',
      searchButton: 'வழக்கைக் காண்க',
      petitioner: 'மனுதாரர்',
      respondent: 'எதிர்மனுதாரர்',
      courtBench: 'நீதிமன்றம் & அமர்வு',
      nextHearing: 'அடுத்த விசாரணை தேதி',
      caseStatus: 'வழக்கு நிலை',
      stage: 'தற்போதைய நிலை',
      advocate: 'வழக்கறிஞர்',
      viewDailyOrder: 'தினசரி உத்தரவு (PDF)',
      recentDockets: 'சமீபத்திய வழக்குகள்',
    },
    legalSearch: {
      modalTitle: 'ஒருங்கிணைந்த சட்டத் தேடல்',
      modalSubtitle: 'அரசியலமைப்பு, சட்டங்கள், தீர்ப்புகளில் தேடல்',
      searchPrompt: 'எந்தவொரு சட்டப் பிரிவு அல்லது தீர்ப்பையும் தேடவும்...',
      allFilters: 'அனைத்து பிரிவுகளும்',
      filterArticles: 'அரசியலமைப்பு சரத்துக்கள்',
      filterStatutes: 'சட்டப்பிரிவுகள்',
      filterJudgments: 'உச்ச நீதிமன்ற தீர்ப்புகள்',
      filterCourts: 'நீதிமன்ற விதிகள்',
      recentSearches: 'பிரபலமான தேடல்கள்',
      noResults: 'தேடலுக்குரிய தகவல்கள் கிடைக்கவில்லை.',
      quickTip: 'குறிப்பு: "Article 21" அல்லது "Section 103" என தேடலாம்.',
    },
    aiBot: {
      modalTitle: 'சட்ட ஆராய்ச்சி உதவியாளர் (RAG)',
      modalSubtitle: 'இந்திய சட்டவியல், சன்ஹிதாக்கள் & சரிபார்க்கப்பட்ட சட்டத் தரவுத்தளம்',
      welcomeMsg:
        'வணக்கம் வழக்கறிஞரே. உங்களது RAG சட்ட ஆராய்ச்சி உதவியாளர். எனது பதில்கள் அனைத்தும் சரிபார்க்கப்பட்ட சட்ட ஆவணங்கள் மற்றும் அங்கீகரிக்கப்பட்ட வலைத் தேடல்களிலிருந்து பெறப்பட்டவை.',
      inputPlaceholder: 'சட்டக் கேள்வியைக் கேளுங்கள் (எ.கா. "Article 21 என்றால் என்ன?", "BNS Section 103 தண்டனை")...',
      sendButton: 'தேடு & RAG பதில் உருவாக்கு',
      disclaimer: 'பொறுப்புத் துறப்பு: RAG பதில்கள் சரிபார்க்கப்பட்ட சட்டத் தரவுத்தளத்திலிருந்து மட்டுமே உருவாக்கப்படுகின்றன.',
      suggestedQueries: 'விரைவு RAG சட்டக் கேள்விகள்',
      suggestQ1: 'Article 21 என்றால் என்ன?',
      suggestQ2: 'BNS Section 103 இன் கீழ் தண்டனை என்ன?',
      suggestQ3: 'BNSS Section 482 இன் கீழ் முன்ஜாமீன் நடைமுறை',
      generating: 'சட்டத் தரவுத்தளத்தில் தேடி, RAG பதில் உருவாக்கப்படுகிறது...',
      tabBot: 'RAG சட்ட உதவியாளர்',
      tabDataset: 'சட்டத் தரவுத்தள சேமிப்பு',
      tabCrawler: 'சட்ட வலைத் தேடல் மையம்',
      tabInspector: 'RAG செயல்பாட்டுக் காட்டி',
      exactProvisionHeader: 'துல்லியமான சட்டப் பிரிவு',
      simpleExplanationHeader: 'எளிய விளக்கம்',
      keyPointsHeader: 'முக்கிய குறிப்புகள்',
      relevantCasesHeader: 'தொடர்புடைய முன்மாதிரி தீர்ப்புகள்',
      sourceHeader: 'சரிபார்க்கப்பட்ட சான்று & மேற்கோள்',
      fallbackBadge: 'வலைத் தேடல் மாற்று வழி இயக்கப்பட்டது',
      verifiedDatasetBadge: 'சரிபார்க்கப்பட்ட சட்டத் தரவுப் பொருத்தம்',
      insufficientInfoTitle: 'போதுமான சரிபார்க்கப்பட்ட தகவல்கள் கிடைக்கவில்லை',
    },
    bookmarks: {
      modalTitle: 'என் சட்டப் புத்தகக்குறிகள்',
      modalSubtitle: 'சேமிக்கப்பட்ட சரத்துக்கள் & தீர்ப்புகள்',
      savedCount: 'சேமிக்கப்பட்டவை',
      emptyTitle: 'புத்தகக்குறிகள் எதுவும் இல்லை.',
      emptySubtitle: 'சட்டங்களை உலாவி சேமிக்கவும்.',
      removeBookmark: 'நீக்குக',
      savedOn: 'சேமிக்கப்பட்ட நாள்',
    },
    profile: {
      modalTitleProfile: 'வழக்கறிஞர் சுயவிவரம்',
      modalTitleSettings: 'போர்டல் அமைப்புகள்',
      modalSubtitle: 'ஜஸ்டிசியா இந்திய சட்ட தகவல் அமைப்பு',
      tabCounsel: 'வழக்கறிஞர் விவரங்கள்',
      tabSystem: 'கணினி விருப்பங்கள்',
      fullName: 'முழு பெயர்',
      barCouncilNo: 'பார் கவுன்சில் பதிவு எண்',
      chamberAddress: 'அலுவலக முகவரி',
      courtAlerts: 'உச்ச நீதிமன்ற வழக்கு அறிவிப்புகள்',
      courtAlertsDesc: 'வழக்கு பட்டியலில் உங்கள் வழக்கு வரும்போது உடனடியாக அறிவிப்பு பெறவும்.',
      citationStandard: 'மேற்கோள் முறை',
      citationStandardDesc: 'தானியங்கி நீதிமன்ற மேற்கோள் வடிவம்.',
      syncTitle: 'e-Courts 3.0 நேரடி இணைப்பு',
      syncDesc: 'தேசிய நீதித்துறை தரவுத்தளத்துடன் நேரடி தொடர்பு.',
      activeStatus: 'செயலில் உள்ளது',
      cancel: 'ரத்து செய்',
      saveChanges: 'மாற்றங்களைச் சேமி',
      saved: 'சேமிக்கப்பட்டது!',
    },
    common: {
      close: 'மூடு',
      cancel: 'ரத்து செய்',
      save: 'சேமி',
      saved: 'சேமிக்கப்பட்டது',
      active: 'செயலில்',
      search: 'தேடு',
      filter: 'வடிகட்டு',
      back: 'பின்செல்',
      remove: 'நீக்கு',
      loading: 'ஏற்றுகிறது...',
      view: 'பார்',
      details: 'விவரங்கள்',
    },
  },
  te: {
    nav: {
      brandName: 'జస్టిషియా',
      brandTag: 'లా పోర్టల్',
      dashboard: 'డాష్‌బోర్డ్',
      analytics: 'న్యాయ విశ్లేషణ',
      constitution: 'భారత రాజ్యాంగం',
      laws: 'చట్టాలు & నిబంధనలు',
      case_tracker: 'కేస్ ట్రాకర్',
      legal_search: 'చట్టపరమైన శోధన',
      ai_bot: 'లీగల్ బాట్',
      bookmarks: 'బుక్‌మార్క్‌లు',
      profile: 'ప్రొఫైల్',
      settings: 'సెట్టింగ్‌లు',
      securePortal: 'సురక్షిత పోర్టల్',
      version: 'v3.2 అధికారిక',
    },
    topNav: {
      searchPlaceholder: 'కేసులు, చట్టాలు, సెక్షన్లను వెతకండి...',
      aiAssistant: 'లీగల్ అసిస్టెంట్',
      notifications: 'నోటిఫికేషన్లు',
      markAllRead: 'అన్నింటినీ చదివినట్లు గుర్తించు',
      noNotifications: 'కొత్త నోటిఫికేషన్లు లేవు',
      counselRole: 'సీనియర్ స్టాండింగ్ కౌన్సెల్',
      barRegistration: 'D/1842/2014 • బార్ కౌన్సిల్',
      viewProfile: 'అడ్వకేట్ ప్రొఫైల్',
      portalSettings: 'పోర్టల్ సెట్టింగ్‌లు',
      signOut: 'సైన్ అవుట్ / లాక్',
    },
    dashboard: {
      satyameva: 'సత్యమేవ జయతే',
      portalSubtitle: 'జాతీయ చట్టపరమైన జ్ఞాన మరియు సమాచార భాండాగారం',
      mainTitle: 'భారతీయ న్యాయ వ్యవస్థ',
      mainSubtitle: 'భారత విభాగానికి సంబంధించిన రాజ్యాంగం, కేంద్ర చట్టాలు, భారతీయ సంహితల అధికారిక సమాచారం.',
      quickSearch: 'తక్షణ సెక్షన్ శోధన',
      reloadPreview: 'రిలోడ్ ప్రివ్యూ',
      constitutionTitle: 'భారత రాజ్యాంగం',
      constitutionSub: 'ఆర్టికల్స్, షెడ్యూళ్ళు, సవరణలను అన్వేషించండి.',
      constitutionBadge: 'దేశ అత్యున్నత చట్టం',
      constitutionMeta: '395 ఆర్టికల్స్ • 12 షెడ్యూళ్ళు • 106 సవరణలు',
      lawsTitle: 'భారతీయ చట్టాలు & సంహితలు',
      lawsSub: 'భారతీయ చట్టాలు మరియు నిబంధనల సేకరణ.',
      lawsBadge: 'కేంద్ర & రాష్ట్ర చట్టాలు',
      lawsMeta: 'BNS 2023 • BNSS • BSA • CPC • కంపెనీల చట్టం',
      courtsTitle: 'న్యాయస్థాన వ్యవస్థ',
      courtsSub: 'సుప్రీం కోర్టు, హైకోర్టులు, జిల్లా కోర్టుల వివరాలు.',
      courtsBadge: 'న్యాయ వ్యవస్థ పద్ధతి',
      courtsMeta: 'సుప్రీం కోర్టు • 25 హైకోర్టులు • 670+ జిల్లా కోర్టులు',
      exploreProvisions: 'నిబంధనలను చూడండి',
      viewHierarchy: 'న్యాయ వ్యవస్థను చూడండి',
      criminalReformsTitle: 'నేర చట్ట సవరణలు (2024–26)',
      criminalReformsSub: 'BNS, BNSS & BSA పోలిక పట్టికలు',
      criminalReformsDesc: 'IPC 1860, CrPC 1973 మరియు కొత్త సంహితల పోలిక పట్టిక.',
      caseTrackerTitle: 'జాతీయ కేసుల ట్రాకర్',
      caseTrackerSub: 'CNR సంఖ్య ద్వారా శోధన',
      caseTrackerDesc: 'రోజువారీ ఉత్తర్వులు మరియు తదుపరి విచారణ తేదీలను ట్రాక్ చేయండి.',
      aiAssistantTitle: 'లీగల్ పరిశోధన బాట్',
      aiAssistantSub: 'ఆటోమేటెడ్ న్యాయ సలహాలు',
      aiAssistantDesc: 'సుప్రీం కోర్టు మైలురాయి తీర్పులను పొందండి.',
    },
    settings: {
      pageTitle: 'పోర్టల్ సెట్టింగ్‌లు',
      pageSubtitle: 'మీ జస్టిషియా ప్రాధాన్యతలను నిర్వహించండి.',
      resetDefaults: 'డిఫాల్ట్‌కు రీసెట్ చేయి',
      appearance: 'రూపం (APPEARANCE)',
      darkModeTitle: 'డార్క్ మోడ్ (Dark Mode)',
      darkModeSub: 'డార్క్ థీమ్‌ను ప్రారంభించండి (సిఫార్సు చేయబడింది)',
      compactViewTitle: 'కాంప్యాక్ట్ వ్యూ (Compact View)',
      compactViewSub: 'ఎక్కువ సమాచారం కోసం అంచుల దూరం తగ్గించండి',
      notifications: 'నోటిఫికేషన్లు (NOTIFICATIONS)',
      pushNotificationsTitle: 'పుష్ నోటిఫికేషన్లు',
      pushNotificationsSub: 'విచారణ రిమైండర్లు, చట్ట సవరణ హెచ్చరికలు',
      languageRegion: 'భాష & ప్రాంతం (LANGUAGE & REGION)',
      interfaceLanguageTitle: 'ఇంటర్‌ఫేస్ భాష',
      interfaceLanguageSub: 'చట్టపరమైన పదాలు మరియు నేవిగేషన్ కోసం మీ భాషను ఎంచుకోండి.',
      dualDiglotNote: 'భారత రాజ్యాంగం ద్విభాషా ప్రచురణలలో అందుబాటులో ఉంది.',
      autoSyncBadge: 'ఆటోమేటిక్ NJDG సింక్',
      toastThemeUpdated: 'థీమ్ నవీకరించబడింది',
      toastCompactUpdated: 'కాంప్యాక్ట్ వ్యూ నవీకరించబడింది',
      toastNotificationUpdated: 'నోటిఫికేషన్ సెట్టింగ్‌లు సేవ్ చేయబడ్డాయి',
      toastLanguageUpdated: 'భాష తెలుగులోకి మార్చబడింది',
      toastDefaultsRestored: 'సెట్టింగ్‌లు సాధారణ స్థితికి చేర్చబడ్డాయి',
      returnToDashboard: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
    },
    analytics: {
      modalTitle: 'జాతీయ న్యాయ విశ్లేషణ (NJDG)',
      modalSubtitle: 'కేసుల పరిష్కార రేటు • హైకోర్టుల రికార్డులు',
      clearanceRate: 'వార్షిక కేసుల పరిష్కార రేటు',
      clearanceGrowth: 'గత సంవత్సరంతో పోలిస్తే +3.2%',
      digitizedCases: 'డిజిటలైజ్ చేయబడిన కేసులు',
      digitizedNote: '25 హైకోర్టు రిజిస్ట్రీలలో',
      virtualCourts: 'వర్చువల్ కోర్టులు',
      virtualNote: 'ఆన్‌లైన్ విచారణలు పూర్తయ్యాయి',
      efficiencyIndex: 'హైకోర్టు సామర్థ్య సూచిక',
      colHighCourt: 'హైకోర్టు',
      colJudges: 'న్యాయమూర్తులు',
      colFilings: 'నెలవారీ దాఖలు',
      colRatio: 'పరిష్కార నిష్పత్తి',
    },
    constitution: {
      modalTitle: 'భారత రాజ్యాంగం (సంవిధాన్)',
      modalSubtitle: 'దేశ అత్యున్నత చట్టం • 395 ఆర్టికల్స్ • 12 షెడ్యూళ్ళు • 106 సవరణలు',
      tabArticles: 'రాజ్యాంగ ఆర్టికల్స్',
      tabPreamble: 'ప్రవేశిక (Preamble)',
      tabSchedules: 'షెడ్యూళ్ళు',
      searchPlaceholder: 'ఆర్టికల్ సంఖ్య, శీర్షిక వెతకండి...',
      badgePreamble: 'భారత గణతంత్ర ప్రవేశిక',
      preambleHeadline: 'భారత ప్రజలమైన మేము...',
      preambleText: 'భారత ప్రజలమైన మేము, భారత్‌ను ఒక సర్వసత్తాక సమాజవాద లౌకిక ప్రజాస్వామ్య గణతంత్రంగా నిర్మించుకోవడానికి...',
      bookmarkArticle: 'ఆర్టికల్‌ను బుక్‌మార్క్ చేయి',
      bookmarked: 'సేవ్ చేయబడింది',
      filterAll: 'అన్ని ఆర్టికల్స్',
      filterFundamentalRights: 'భాగం III - ప్రాథమిక హక్కులు',
      filterDirectivePrinciples: 'భాగం IV - ఆదేశిక సూత్రాలు',
      filterJudiciary: 'భాగం V - కేంద్ర న్యాయవ్యవస్థ',
    },
    laws: {
      modalTitle: 'భారతీయ చట్టాలు & సంహితలు',
      modalSubtitle: 'భారతీయ న్యాయ సంహిత, కేంద్ర చట్టాలు',
      searchPlaceholder: 'చట్టం, సెక్షన్ సంఖ్య వెతకండి...',
      tabAllActs: 'అన్ని చట్టాలు',
      tabSanhitas: 'కొత్త సంహితలు (2023)',
      tabCommercial: 'కమర్షియల్ & సివిల్',
      sectionLookup: 'సెక్షన్ విశ్లేషణ',
      cognizable: 'కాగ్నిజబుల్',
      bailable: 'బెయిలబుల్ కానిది',
      compoundable: 'రాజీ పడలేనిది',
      punishment: 'శిక్ష',
      enactmentYear: 'అమల్లోకి వచ్చిన సంవత్సరం',
    },
    courtSystem: {
      modalTitle: 'భారతీయ న్యాయవ్యవస్థ',
      modalSubtitle: 'సుప్రీం కోర్టు నుండి కింది కోర్టుల వరకు',
      supremeCourt: 'భారత సుప్రీం కోర్టు',
      supremeCourtDesc: 'ఆర్టికల్ 124 కింద ఏర్పాటైన అత్యున్నత న్యాయస్థానం.',
      highCourts: 'హైకోర్టులు',
      highCourtsDesc: 'రాష్ట్రాల కోసం 25 హైకోర్టులు.',
      districtCourts: 'జిల్లా కోర్టులు',
      districtCourtsDesc: 'జిల్లా స్థాయి సివిల్ మరియు క్రిమినల్ కోర్టులు.',
      tribunals: 'ప్రత్యేక ట్రిబ్యునల్స్',
      tribunalsDesc: 'కంపెనీ, పర్యావరణ సంబంధిత ప్రత్యేక ట్రిబ్యునల్స్.',
      constitutionalBench: 'రాజ్యాంగ ధర్మాసనం (5+ న్యాయమూర్తులు)',
      specialLeavePetition: 'స్పెషల్ లీవ్ పిటిషన్ (ఆర్టికల్ 136)',
    },
    caseTracker: {
      modalTitle: 'జాతీయ కేసుల ట్రాకర్',
      modalSubtitle: 'CNR సంఖ్య మరియు కేసు శోధన',
      searchPlaceholder: '16-అంకెల CNR సంఖ్యను నమోదు చేయండి...',
      searchButton: 'కేసు చూడండి',
      petitioner: 'పిటిషనర్',
      respondent: 'రెస్పాండెంట్',
      courtBench: 'కోర్టు & బెంచ్',
      nextHearing: 'తదుపరి విచారణ తేదీ',
      caseStatus: 'కేసు స్థితి',
      stage: 'ప్రస్తుత దశ',
      advocate: 'అడ్వకేట్',
      viewDailyOrder: 'రోజువారీ ఉత్తర్వు (PDF)',
      recentDockets: 'ఇటీవలి కేసులు',
    },
    legalSearch: {
      modalTitle: 'సమీకృత చట్ట శోధన',
      modalSubtitle: 'రాజ్యాంగం, చట్టాలు, తీర్పులలో శోధన',
      searchPrompt: 'ఏదైనా చట్టపరమైన నిబంధన లేదా తీర్పును వెతకండి...',
      allFilters: 'అన్ని విభాగాలు',
      filterArticles: 'రాజ్యాంగ ఆర్టికల్స్',
      filterStatutes: 'చట్టపరమైన సెక్షన్లు',
      filterJudgments: 'సుప్రీం కోర్టు తీర్పులు',
      filterCourts: 'కోర్టు నిబంధనలు',
      recentSearches: 'పాపులర్ శోధనలు',
      noResults: 'శోధనకు సరిపోలిన సమాచారం లభించలేదు.',
      quickTip: 'సూచన: "Article 21" లేదా "Section 103" అని శోధించండి.',
    },
    aiBot: {
      modalTitle: 'చట్ట పరిశోధన అసిస్టెంట్ (RAG)',
      modalSubtitle: 'భారతీయ చట్టాలు, సంహితలు & ధృవీకరించబడిన డేటాసెట్',
      welcomeMsg:
        'నమస్కారం అడ్వకేట్ గారు. మీ RAG లీగల్ రీసెర్చ్ అసిస్టెంట్. నా సమాధానాలన్నీ ధృవీకరించబడిన చట్టపరమైన పత్రాలు మరియు ఆమోదించబడిన వెబ్ సోర్సెస్ ఆధారంగా మాత్రమే ఇవ్వబడతాయి.',
      inputPlaceholder: 'చట్టపరమైన ప్రశ్న అడగండి (ఉదా. "Article 21 అంటే ఏమిటి?", "BNS Section 103 కింద శిక్ష")...',
      sendButton: 'వెతుకు & RAG జవాబు పొందు',
      disclaimer: 'గమనిక: RAG జవాబులు ధృవీకరించబడిన చట్టపరమైన డేటాసెట్ మరియు ప్రభుత్వం ఆమోదించిన సోర్సెస్ నుండి మాత్రమే జారీ చేయబడతాయి.',
      suggestedQueries: 'త్వరిత RAG చట్ట ప్రశ్నలు',
      suggestQ1: 'Article 21 అంటే ఏమిటి?',
      suggestQ2: 'BNS Section 103 కింద శిక్ష ఏమిటి?',
      suggestQ3: 'BNSS Section 482 కింద ముందస్తు బెయిల్ ప్రక్రియ',
      generating: 'డేటాసెట్‌లో శోధిస్తూ, RAG జవాబు తయారు చేయబడుతోంది...',
      tabBot: 'RAG లీగల్ అసిస్టెంట్',
      tabDataset: 'చట్టపరమైన డేటాసెట్ స్టోరేజ్',
      tabCrawler: 'లీగల్ వెబ్ క్రాలర్ హబ్',
      tabInspector: 'RAG ఎగ్జిక్యూషన్ ఇన్‌స్పెక్టర్',
      exactProvisionHeader: 'ఖచ్చితమైన చట్టపరమైన నిబంధన',
      simpleExplanationHeader: 'సులభమైన వివరణ',
      keyPointsHeader: 'ముఖ్యమైన అంశాలు',
      relevantCasesHeader: 'సంబంధిత మైలురాయి తీర్పులు',
      sourceHeader: 'ధృవీకరించబడిన సోర్స్ & సైటేషన్',
      fallbackBadge: 'వెబ్ క్రాలర్ ఫాల్‌బ్యాక్ సక్రియం చేయబడింది',
      verifiedDatasetBadge: 'ధృవీకరించబడిన డేటాసెట్ ఫలితం',
      insufficientInfoTitle: 'సరిపోలిన ధృవీకరించబడిన సమాచారం లభించలేదు',
    },
    bookmarks: {
      modalTitle: 'నా చట్టపరమైన బుక్‌మార్క్‌లు',
      modalSubtitle: 'సేవ్ చేయబడిన ఆర్టికల్స్ & తీర్పులు',
      savedCount: 'సేవ్ చేయబడినవి',
      emptyTitle: 'బుక్‌మార్క్‌లు ఏవీ లేవు.',
      emptySubtitle: 'చట్టాలను పరిశీలించి సేవ్ చేసుకోండి.',
      removeBookmark: 'తొలగించు',
      savedOn: 'సేవ్ చేసిన తేదీ',
    },
    profile: {
      modalTitleProfile: 'అడ్వకేట్ ప్రొఫైల్',
      modalTitleSettings: 'పోర్టల్ సెట్టింగ్‌లు',
      modalSubtitle: 'జస్టిషియా భారతీయ చట్ట సమాచార వ్యవస్థ',
      tabCounsel: 'అడ్వకేట్ వివరాలు',
      tabSystem: 'సిస్టమ్ ప్రాధాన్యతలు',
      fullName: 'పూర్తి పేరు',
      barCouncilNo: 'బార్ కౌన్సిల్ రిజిస్ట్రేషన్ సంఖ్య',
      chamberAddress: 'ఆఫీస్ చిరునామా',
      courtAlerts: 'సుప్రీం కోర్టు కేసు అలర్ట్లు',
      courtAlertsDesc: 'మీ కేసులు కాజ్ లిస్ట్‌లో వచ్చినప్పుడు తక్షణ నోటిఫికేషన్ పొందండి.',
      citationStandard: 'సైటేషన్ ఫార్మాట్',
      citationStandardDesc: 'కోర్టు దాఖలు కోసం ఆటోమేటిక్ ఫార్మాట్.',
      syncTitle: 'e-Courts 3.0 రియల్-టైమ్ సింక్',
      syncDesc: 'జాతీయ న్యాయ సమాచార గ్రిడ్‌తో ప్రత్యక్ష అనుసంధానం.',
      activeStatus: 'యాక్టివ్‌గా ఉంది',
      cancel: 'రద్దు చేయి',
      saveChanges: 'మార్పులను సేవ్ చేయి',
      saved: 'సేవ్ చేయబడింది!',
    },
    common: {
      close: 'మూసివేయి',
      cancel: 'రద్దు చేయి',
      save: 'సేవ్ చేయి',
      saved: 'సేవ్ చేయబడింది',
      active: 'యాక్టివ్',
      search: 'వెతుకు',
      filter: 'ఫిల్టర్',
      back: 'వెనక్కి',
      remove: 'తొలగించు',
      loading: 'లోడ్ అవుతోంది...',
      view: 'చూడు',
      details: 'వివరాలు',
    },
  },
};
