const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Official reference sources with DEEP LINKS (not home pages)
const SOURCES_MAP = {
  'how-to:email':            [{ title: 'Download your Gmail data – Google Account Help', url: 'https://support.google.com/accounts/answer/3024190', authority: 'Google LLC' }],
  'how-to:google':           [{ title: 'Google Account Security Checklist', url: 'https://support.google.com/accounts/answer/46526', authority: 'Google LLC' }],
  'how-to:pdf':              [{ title: 'Compress PDF files – Adobe Acrobat Support', url: 'https://helpx.adobe.com/acrobat/using/pdf-compression.html', authority: 'Adobe Systems Inc.' }],
  'how-to:windows':          [{ title: 'Windows 11 help & learning – Microsoft Support', url: 'https://support.microsoft.com/en-us/windows/windows-11-help', authority: 'Microsoft Corporation' }],
  'how-to:linux':            [{ title: 'Ubuntu Desktop Installation Guide', url: 'https://ubuntu.com/tutorials/install-ubuntu-desktop', authority: 'Canonical Ltd.' }],
  'how-to:internet':         [{ title: '1.1.1.1 Faster Internet – Cloudflare', url: 'https://one.one.one.one/dns/', authority: 'Cloudflare Inc.' }],
  'how-to:network':          [{ title: 'How to Fix Internet Problems – Cloudflare Help', url: 'https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/', authority: 'Cloudflare Inc.' }],
  'how-to:security':         [{ title: 'Cyber Security Advisories – CERT-In', url: 'https://www.cert-in.org.in/s2cMainServlet?pageid=PBLCTN&type=advisory', authority: 'Ministry of Electronics & IT (MeitY), Govt. of India' }],
  'how-to:whatsapp':         [{ title: 'How to Enable Two-Step Verification in WhatsApp', url: 'https://faq.whatsapp.com/1920866568353864', authority: 'Meta Platforms Inc.' }],
  'how-to:social-media':     [{ title: 'How to Turn On Two-Factor Authentication on Facebook', url: 'https://www.facebook.com/help/148233965247823', authority: 'Meta Platforms Inc.' }],
  'how-to:android':          [{ title: 'Secure your Android device – Google Support', url: 'https://support.google.com/android/answer/2819522', authority: 'Google LLC' }],
  'how-to:ios':              [{ title: 'Security and your Apple ID – Apple Support', url: 'https://support.apple.com/en-in/HT204837', authority: 'Apple Inc.' }],
  'how-to:browsers':         [{ title: 'Stay safe while browsing in Chrome – Google Help', url: 'https://support.google.com/chrome/answer/114836', authority: 'Google LLC' }],
  'how-to:smart-tv':         [{ title: 'Set up Google TV – Official Help', url: 'https://support.google.com/googletv/answer/10105765', authority: 'Google LLC' }],
  'how-to:printer':          [{ title: 'HP Printer Setup & Troubleshooting – HP Support', url: 'https://support.hp.com/us-en/printer/setup', authority: 'HP Inc.' }],
  'how-to:smart-home':       [{ title: 'Set up Google Nest – Google Nest Help', url: 'https://support.google.com/googlenest/answer/9249678', authority: 'Google LLC' }],
  'how-to:digital-payments': [{ title: 'How UPI Works – NPCI Official Product Overview', url: 'https://www.npci.org.in/what-we-do/upi/product-overview', authority: 'National Payments Corporation of India (NPCI)' }],
  'how-to:career':           [{ title: 'NCS Job Portal for Jobseekers', url: 'https://www.ncs.gov.in/jobseeker/pages/Dashboard.aspx', authority: 'Ministry of Labour & Employment, Govt. of India' }],
  'how-to:productivity':     [{ title: 'Microsoft Office Training Center', url: 'https://support.microsoft.com/en-us/office/office-training-center-b8f02f81-ec85-4493-a39b-4c48e6bc4bfb', authority: 'Microsoft Corporation' }],
  'how-to:git-github':       [{ title: 'GitHub Docs – Getting Started', url: 'https://docs.github.com/en/get-started', authority: 'GitHub Inc. (Microsoft)' }],
  'how-to:devops':           [{ title: 'Docker Get Started Guide', url: 'https://docs.docker.com/get-started/', authority: 'Docker Inc.' }],
  'how-to:ai':               [{ title: 'Google AI for Everyone – Google AI', url: 'https://ai.google/education/', authority: 'Google DeepMind' }],

  // FINANCE - deep links to specific pages
  'finance:tax':                [
    { title: 'Tax Slabs Under New Tax Regime – Income Tax India', url: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1#taxslabs', authority: 'Central Board of Direct Taxes (CBDT)' },
    { title: 'Union Budget 2025-26 Tax Provisions – Ministry of Finance', url: 'https://www.indiabudget.gov.in/doc/bh2.pdf', authority: 'Ministry of Finance, Govt. of India' }
  ],
  'finance:savings':            [
    { title: 'Interest Rates on Small Savings Schemes – Ministry of Finance', url: 'https://dea.gov.in/sites/default/files/SB%20Order%20No.%2001-2025.pdf', authority: 'Dept. of Economic Affairs, Ministry of Finance' },
    { title: 'Fixed Deposit Interest Rates – RBI Database', url: 'https://dbie.rbi.org.in/DBIE/dbie.rbi?site=statistics', authority: 'Reserve Bank of India (RBI)' }
  ],
  'finance:loans':              [
    { title: 'Current Repo Rate – RBI Monetary Policy', url: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx', authority: 'Reserve Bank of India (RBI)' },
    { title: 'Free CIBIL Credit Score – TransUnion CIBIL', url: 'https://www.cibil.com/freecibilscore', authority: 'TransUnion CIBIL Ltd.' }
  ],
  'finance:government-schemes': [
    { title: 'PM Kisan Samman Nidhi – Beneficiary Status', url: 'https://pmkisan.gov.in/BeneficiaryStatus.aspx', authority: 'Ministry of Agriculture & Farmers Welfare, Govt. of India' }
  ],
  'finance:insurance':          [{ title: 'Insurance Consumer Rights – IRDAI', url: 'https://www.irdai.gov.in/IIRDAI/cms/iirdai_docs/Home/Consumer-Education/consumer-rights.pdf', authority: 'IRDAI, Govt. of India' }],

  // HEALTH - deep links
  'health:fitness':             [
    { title: 'Physical Activity Fact Sheet – WHO', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', authority: 'World Health Organization (WHO)' },
    { title: 'Dietary Guidelines for Indians 2024 – ICMR-NIN', url: 'https://www.nin.res.in/DietaryGuidelines-forIndians/DietaryGuidelinesforIndians_Final.pdf', authority: 'ICMR-National Institute of Nutrition' }
  ],
  'health:nutrition':           [
    { title: 'ICMR-NIN Dietary Guidelines for Indians 2024 (PDF)', url: 'https://www.nin.res.in/DietaryGuidelines-forIndians/DietaryGuidelinesforIndians_Final.pdf', authority: 'National Institute of Nutrition (NIN-ICMR)' }
  ],
  'health:exercise':            [
    { title: 'Global Action Plan on Physical Activity 2018–2030 – WHO', url: 'https://www.who.int/publications/i/item/9789241514187', authority: 'World Health Organization (WHO)' }
  ],
  'health:weight-management':   [
    { title: 'Obesity & Overweight Fact Sheet – WHO', url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight', authority: 'World Health Organization (WHO)' }
  ],
  'health:sleep':               [
    { title: 'Brain Basics: Understanding Sleep – NIH', url: 'https://www.ninds.nih.gov/health-information/patient-caregiver-education/brain-basics/understanding-sleep', authority: 'U.S. National Institutes of Health (NIH)' }
  ],
  'health:mental-wellness':     [
    { title: 'Mental Health Action Plan 2013–2030 – WHO', url: 'https://www.who.int/publications/i/item/9789241506021', authority: 'World Health Organization (WHO)' },
    { title: 'National Mental Health Survey 2016 – NIMHANS', url: 'https://nimhans.ac.in/wp-content/uploads/2019/07/National-Mental-Health-Survey-of-India-2016.pdf', authority: 'NIMHANS, Bengaluru' }
  ],
  'health:wellness':            [
    { title: 'Physical Activity Guidelines – WHO Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', authority: 'World Health Organization (WHO)' }
  ],
  'health:fitness-equipment':   [
    { title: 'Physical Activity for Adults – WHO Recommendations', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', authority: 'World Health Organization (WHO)' }
  ],
  'health:workout-plans':       [
    { title: 'Physical Activity Guidelines for Americans – HHS', url: 'https://health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf', authority: 'U.S. Dept. of Health and Human Services' }
  ],

  // TECHNOLOGY
  'technology:ai':              [
    { title: 'Attention Is All You Need – Google Research Paper', url: 'https://arxiv.org/abs/1706.03762', authority: 'Google Brain / arXiv' },
    { title: 'GPT-4 Technical Report – OpenAI', url: 'https://arxiv.org/abs/2303.08774', authority: 'OpenAI' }
  ],
  'technology:programming':     [
    { title: 'Python 3.12 Release Notes – Python Docs', url: 'https://docs.python.org/3.12/whatsnew/3.12.html', authority: 'Python Software Foundation' },
    { title: 'MDN JavaScript Reference – Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference', authority: 'Mozilla Foundation' }
  ],
  'technology:mobile':          [
    { title: 'Android 15 Release Notes – Android Developers', url: 'https://developer.android.com/about/versions/15/summary', authority: 'Google LLC' },
    { title: 'iOS 18 Release Notes – Apple Developer', url: 'https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-18-release-notes', authority: 'Apple Inc.' }
  ],
  'technology:software':        [
    { title: 'Ubuntu 24.04 LTS Release Notes – Canonical', url: 'https://ubuntu.com/blog/canonical-releases-ubuntu-24-04-noble-numbat', authority: 'Canonical Ltd.' },
    { title: 'Docker Engine Documentation', url: 'https://docs.docker.com/engine/', authority: 'Docker Inc.' }
  ],
  'technology:apps':            [
    { title: 'Web Vitals – Core Web Vitals Guide – web.dev', url: 'https://web.dev/articles/vitals', authority: 'Google Chrome Developers' }
  ],

  // EDUCATION
  'education:exams':            [
    { title: 'JEE Main 2026 Official Information Brochure – NTA', url: 'https://jeemain.nta.ac.in/webinfo2024/Page/Page?PageId=1&LangId=P', authority: 'National Testing Agency (NTA), Govt. of India' }
  ],
  'education:scholarships':     [
    { title: 'NMMS Scholarship Scheme – NSP Official Portal', url: 'https://scholarships.gov.in/NMMS.html', authority: 'Ministry of Education, Govt. of India' }
  ],
  'education:loans':            [
    { title: 'PM Vidya Lakshmi Yojana – Vidya Lakshmi Portal', url: 'https://www.vidyalakshmi.co.in/Students/aboutscheme', authority: 'Ministry of Finance, Govt. of India' }
  ],

  // SHOPPING
  'shopping:electronics':       [
    { title: 'Consumer Electronics Mandatory BIS Certification – BIS India', url: 'https://www.bis.gov.in/index.php/mandatory-bis-certification-scheme-consumer-electronics/', authority: 'Bureau of Indian Standards (BIS)' }
  ],

  // TRAVEL
  'travel:heritage':            [
    { title: 'List of UNESCO World Heritage Sites in India – ASI', url: 'https://asi.nic.in/world-heritage-sites-in-india/', authority: 'Archaeological Survey of India, Ministry of Culture' },
    { title: 'South India Tourism – Incredible India', url: 'https://www.incredibleindia.org/content/incredible-india-v2/en/destinations/south-india.html', authority: 'Ministry of Tourism, Govt. of India' }
  ],

  // ENTERTAINMENT
  'entertainment:cinema':       [
    { title: 'Certified Films List – Central Board of Film Certification', url: 'https://www.cbfcindia.gov.in/main/certifiedfilmlist.html', authority: 'Ministry of Information and Broadcasting, Govt. of India' }
  ]
};

// Fallback by category only
const CATEGORY_FALLBACK = {
  'how-to':       [{ title: 'Google Search Help – Search Console', url: 'https://support.google.com/webmasters/answer/35769', authority: 'Google LLC' }],
  'finance':      [{ title: 'RBI Publications & Reports', url: 'https://www.rbi.org.in/Scripts/Publications.aspx', authority: 'Reserve Bank of India (RBI)' }],
  'health':       [{ title: 'National Health Mission Guidelines – MoHFW', url: 'https://nhm.gov.in/index4.php?lang=1&level=0&linkid=445&lid=3451', authority: 'Ministry of Health & Family Welfare, Govt. of India' }],
  'technology':   [{ title: 'IEEE Xplore Digital Library', url: 'https://ieeexplore.ieee.org/Xplore/home.jsp', authority: 'Institute of Electrical and Electronics Engineers (IEEE)' }],
  'education':    [{ title: 'National Scholarship Portal – Active Scholarships', url: 'https://scholarships.gov.in/public/schemeData/activeScheme.html', authority: 'Ministry of Education, Govt. of India' }],
  'shopping':     [{ title: 'Consumer VOICE India – Product Reviews', url: 'https://www.consumer-voice.org/category/products-reviews/', authority: 'Consumer VOICE (Registered NGO, India)' }],
  'travel':       [{ title: 'Incredible India – Official Tourism Destinations', url: 'https://www.incredibleindia.org/content/incredible-india-v2/en/destinations.html', authority: 'Ministry of Tourism, Govt. of India' }],
  'entertainment':[{ title: 'Digital Media Ethics Code – Ministry of I&B', url: 'https://mib.gov.in/sites/default/files/OTT%20Guidelines%2025.02.2021.pdf', authority: 'Ministry of Information & Broadcasting, Govt. of India' }],
};

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, slug: true, categorySection: true, subCategory: true }
  });

  let updated = 0;

  for (const article of articles) {
    const key = `${article.categorySection}:${article.subCategory || ''}`;
    let sources = SOURCES_MAP[key] || SOURCES_MAP[`${article.categorySection}:${(article.subCategory || '').split('-')[0]}`];

    if (!sources) {
      sources = CATEGORY_FALLBACK[article.categorySection];
    }

    if (!sources) continue;

    await prisma.article.update({
      where: { id: article.id },
      data: { sourcesJson: JSON.stringify(sources) }
    });
    updated++;
  }

  console.log(`Updated deep-link reference sources for ${updated} articles.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
