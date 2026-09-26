const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Official reference sources mapped by categorySection + subCategory
const SOURCES_MAP = {
  // HOW-TO categories
  'how-to:email':            [{ title: 'Google Account Help Center', url: 'https://support.google.com/accounts', authority: 'Google LLC' }],
  'how-to:google':           [{ title: 'Google Account Help Center', url: 'https://support.google.com/accounts', authority: 'Google LLC' }],
  'how-to:pdf':              [{ title: 'Adobe Acrobat Official Support', url: 'https://helpx.adobe.com/acrobat.html', authority: 'Adobe Systems Inc.' }],
  'how-to:windows':          [{ title: 'Microsoft Windows Support', url: 'https://support.microsoft.com/en-us/windows', authority: 'Microsoft Corporation' }],
  'how-to:linux':            [{ title: 'Ubuntu Official Documentation', url: 'https://help.ubuntu.com', authority: 'Canonical Ltd.' }],
  'how-to:internet':         [{ title: 'Cloudflare Internet Help', url: 'https://1.1.1.1/help', authority: 'Cloudflare Inc.' }],
  'how-to:network':          [{ title: 'Cloudflare Internet Help', url: 'https://1.1.1.1/help', authority: 'Cloudflare Inc.' }],
  'how-to:security':         [{ title: 'CERT-In Indian Cyber Security Advisory', url: 'https://www.cert-in.org.in', authority: 'Ministry of Electronics & IT (MeitY), Govt. of India' }],
  'how-to:whatsapp':         [{ title: 'WhatsApp Official Help Center', url: 'https://faq.whatsapp.com', authority: 'Meta Platforms Inc.' }],
  'how-to:social-media':     [{ title: 'Meta Safety & Privacy Center', url: 'https://www.facebook.com/help/security', authority: 'Meta Platforms Inc.' }],
  'how-to:android':          [{ title: 'Android Official Help', url: 'https://support.google.com/android', authority: 'Google LLC' }],
  'how-to:ios':              [{ title: 'Apple iPhone User Guide', url: 'https://support.apple.com/guide/iphone', authority: 'Apple Inc.' }],
  'how-to:browsers':         [{ title: 'Google Chrome Help Center', url: 'https://support.google.com/chrome', authority: 'Google LLC' }],
  'how-to:smart-tv':         [{ title: 'Google TV Official Support', url: 'https://support.google.com/googletv', authority: 'Google LLC' }],
  'how-to:printer':          [{ title: 'HP Official Printer Support', url: 'https://support.hp.com', authority: 'HP Inc.' }],
  'how-to:smart-home':       [{ title: 'Google Nest & Home Support', url: 'https://support.google.com/googlenest', authority: 'Google LLC' }],
  'how-to:digital-payments': [{ title: 'NPCI Official UPI Portal', url: 'https://www.npci.org.in/what-we-do/upi/product-overview', authority: 'National Payments Corporation of India (NPCI)' }],
  'how-to:career':           [{ title: 'National Career Service Portal', url: 'https://www.ncs.gov.in', authority: 'Ministry of Labour & Employment, Govt. of India' }],
  'how-to:productivity':     [{ title: 'Microsoft Office Support', url: 'https://support.microsoft.com/office', authority: 'Microsoft Corporation' }],
  'how-to:git-github':       [{ title: 'GitHub Official Documentation', url: 'https://docs.github.com', authority: 'GitHub Inc. (Microsoft)' }],
  'how-to:devops':           [{ title: 'Docker Official Documentation', url: 'https://docs.docker.com', authority: 'Docker Inc.' }],
  'how-to:ai':               [{ title: 'Google AI Official Blog', url: 'https://ai.google', authority: 'Google DeepMind' }],

  // FINANCE
  'finance:tax':                [
    { title: 'Income Tax Department India', url: 'https://www.incometax.gov.in', authority: 'Central Board of Direct Taxes (CBDT), Ministry of Finance' },
    { title: 'Ministry of Finance Notifications', url: 'https://finmin.nic.in', authority: 'Ministry of Finance, Govt. of India' }
  ],
  'finance:savings':            [
    { title: 'Reserve Bank of India Interest Rates', url: 'https://www.rbi.org.in/Scripts/PublicationsView.aspx', authority: 'Reserve Bank of India (RBI)' },
    { title: 'India Post Small Savings Rates', url: 'https://www.indiapost.gov.in/Financial/Pages/Content/post-office-saving-schemes.aspx', authority: 'Department of Posts, Govt. of India' }
  ],
  'finance:loans':              [
    { title: 'RBI Monetary Policy Report', url: 'https://www.rbi.org.in/Scripts/PublicationsView.aspx', authority: 'Reserve Bank of India (RBI)' },
    { title: 'TransUnion CIBIL Official Portal', url: 'https://www.cibil.com', authority: 'TransUnion CIBIL Ltd.' }
  ],
  'finance:government-schemes': [
    { title: 'PM-Kisan Official Portal', url: 'https://pmkisan.gov.in', authority: 'Ministry of Agriculture & Farmers Welfare, Govt. of India' }
  ],
  'finance:insurance':          [{ title: 'IRDAI Official Portal', url: 'https://www.irdai.gov.in', authority: 'Insurance Regulatory and Development Authority of India (IRDAI)' }],

  // HEALTH
  'health:fitness':             [
    { title: 'WHO Physical Activity Guidelines', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', authority: 'World Health Organization (WHO)' },
    { title: 'ICMR Dietary Guidelines for Indians', url: 'https://www.icmr.gov.in/publication.html', authority: 'Indian Council of Medical Research (ICMR)' }
  ],
  'health:nutrition':           [
    { title: 'ICMR-NIN Dietary Guidelines 2024', url: 'https://www.nin.res.in', authority: 'National Institute of Nutrition (NIN-ICMR)' }
  ],
  'health:exercise':            [
    { title: 'WHO Global Action Plan on Physical Activity', url: 'https://www.who.int/publications/i/item/9789241514187', authority: 'World Health Organization (WHO)' }
  ],
  'health:weight-management':   [
    { title: 'National Health Portal - Obesity Guidelines', url: 'https://www.nhp.gov.in/healthlyliving/obesity', authority: 'Ministry of Health & Family Welfare, Govt. of India' }
  ],
  'health:sleep':               [
    { title: 'NIH National Institute of Neurological Disorders and Stroke', url: 'https://www.ninds.nih.gov/health-information/patient-caregiver-education/brain-basics/understanding-sleep', authority: 'U.S. National Institutes of Health (NIH)' }
  ],
  'health:mental-wellness':     [
    { title: 'WHO Mental Health Action Plan', url: 'https://www.who.int/publications/i/item/9789241506021', authority: 'World Health Organization (WHO)' },
    { title: 'NIMHANS National Mental Health Survey', url: 'https://nimhans.ac.in', authority: 'National Institute of Mental Health & Neurosciences (NIMHANS)' }
  ],
  'health:wellness':            [
    { title: 'WHO Health and Wellness Guidelines', url: 'https://www.who.int/health-topics/physical-activity', authority: 'World Health Organization (WHO)' }
  ],

  // TECHNOLOGY
  'technology:ai':              [
    { title: 'Google AI Research Publications', url: 'https://ai.google/research/', authority: 'Google DeepMind' },
    { title: 'OpenAI Research Blog', url: 'https://openai.com/research', authority: 'OpenAI' }
  ],
  'technology:programming':     [
    { title: 'MDN Web Docs (Mozilla)', url: 'https://developer.mozilla.org', authority: 'Mozilla Foundation' },
    { title: 'Python Official Documentation', url: 'https://docs.python.org/3/', authority: 'Python Software Foundation' }
  ],
  'technology:mobile':          [
    { title: 'Android Developers Documentation', url: 'https://developer.android.com', authority: 'Google LLC' },
    { title: 'Apple Developer Documentation', url: 'https://developer.apple.com/documentation/', authority: 'Apple Inc.' }
  ],
  'technology:software':        [
    { title: 'Ubuntu Official Documentation', url: 'https://help.ubuntu.com', authority: 'Canonical Ltd.' },
    { title: 'Docker Official Documentation', url: 'https://docs.docker.com', authority: 'Docker Inc.' }
  ],
  'technology:apps':            [
    { title: 'web.dev Performance Documentation', url: 'https://web.dev/performance/', authority: 'Google Chrome Developers' }
  ],

  // EDUCATION
  'education:exams':            [
    { title: 'NTA Official JEE Portal', url: 'https://jeemain.nta.nic.in', authority: 'National Testing Agency (NTA), Govt. of India' }
  ],
  'education:scholarships':     [
    { title: 'National Scholarship Portal', url: 'https://scholarships.gov.in', authority: 'Ministry of Electronics & IT (MeitY), Govt. of India' }
  ],
  'education:loans':            [
    { title: 'Vidya Lakshmi Portal', url: 'https://www.vidyalakshmi.co.in', authority: 'Ministry of Finance, Govt. of India' }
  ],

  // SHOPPING
  'shopping:electronics':       [
    { title: 'BIS Consumer Electronics Standards', url: 'https://www.bis.gov.in', authority: 'Bureau of Indian Standards (BIS)' }
  ],

  // TRAVEL
  'travel:heritage':            [
    { title: 'Archaeological Survey of India', url: 'https://asi.nic.in', authority: 'Ministry of Culture, Govt. of India' },
    { title: 'Incredible India Official Tourism Portal', url: 'https://www.incredibleindia.org', authority: 'Ministry of Tourism, Govt. of India' }
  ],

  // ENTERTAINMENT
  'entertainment:cinema':       [
    { title: 'Central Board of Film Certification', url: 'https://www.cbfcindia.gov.in', authority: 'Ministry of Information and Broadcasting, Govt. of India' }
  ]
};

// Fallback by category only
const CATEGORY_FALLBACK = {
  'how-to':      [{ title: 'Google Account & Workspace Official Help', url: 'https://support.google.com', authority: 'Google LLC' }],
  'finance':     [{ title: 'Reserve Bank of India Official Portal', url: 'https://www.rbi.org.in', authority: 'Reserve Bank of India (RBI)' }],
  'health':      [{ title: 'Ministry of Health & Family Welfare', url: 'https://mohfw.gov.in', authority: 'Govt. of India' }],
  'technology':  [{ title: 'IEEE Technical Publications', url: 'https://ieeexplore.ieee.org', authority: 'Institute of Electrical and Electronics Engineers (IEEE)' }],
  'education':   [{ title: 'National Scholarship Portal', url: 'https://scholarships.gov.in', authority: 'Ministry of Education, Govt. of India' }],
  'shopping':    [{ title: 'Bureau of Indian Standards (BIS)', url: 'https://www.bis.gov.in', authority: 'BIS, Govt. of India' }],
  'travel':      [{ title: 'Incredible India Tourism Portal', url: 'https://www.incredibleindia.org', authority: 'Ministry of Tourism, Govt. of India' }],
  'entertainment':[{ title: 'Ministry of Information and Broadcasting', url: 'https://mib.gov.in', authority: 'Govt. of India' }],
};

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, slug: true, categorySection: true, subCategory: true, sourcesJson: true }
  });

  let updated = 0;

  for (const article of articles) {
    const key = `${article.categorySection}:${article.subCategory || ''}`;
    let sources = SOURCES_MAP[key] || SOURCES_MAP[`${article.categorySection}:${article.subCategory?.split('-')[0]}`];

    // Try broader category fallback
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

  console.log(`Updated official reference sources for ${updated} articles.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
