const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tools = [
    {
      name: 'Passport Photo & Signature Maker',
      slug: 'passport-photo-maker',
      category: 'Image Tools',
      description: 'Format photos & signatures to exact size limits for UPSC, SSC, Banking, and State PSC applications.',
      icon: 'Camera',
      isFeatured: true
    },
    {
      name: 'Text Case Converter & Line Cleaner',
      slug: 'text-case-converter',
      category: 'Writing Tools',
      description: 'Convert text case (UPPER, lower, Title Case, camelCase), remove duplicate lines and spaces.',
      icon: 'Type',
      isFeatured: true
    },
    {
      name: 'College Attendance & Bunk Calculator',
      slug: 'attendance-calculator',
      category: 'Education Tools',
      description: 'Calculate attendance % and see how many classes you can bunk or MUST attend to reach target.',
      icon: 'Calculator',
      isFeatured: true
    },
    {
      name: 'FD & PPF Compound Growth Calculator',
      slug: 'fd-ppf-calculator',
      category: 'Finance Calculators',
      description: 'Calculate maturity value, total interest earned, and wealth compounding for FD and PPF.',
      icon: 'PiggyBank',
      isFeatured: true
    },
    {
      name: 'JSON & CSV 2-Way Converter',
      slug: 'json-csv-converter',
      category: 'Developer Tools',
      description: 'Convert JSON arrays to CSV spreadsheets and CSV data to clean JSON objects in real-time.',
      icon: 'Code',
      isFeatured: true
    },
    {
      name: 'SEO Meta Tag & SERP Preview Generator',
      slug: 'seo-meta-generator',
      category: 'SEO Tools',
      description: 'Generate Google-compliant meta titles, meta descriptions, OpenGraph tags, and preview live SERP snippets.',
      icon: 'Search',
      isFeatured: true
    },
    {
      name: 'Live RegEx Pattern Tester',
      slug: 'regex-tester',
      category: 'Developer Tools',
      description: 'Test regular expressions in real-time with pattern matching, capture groups, and flags (g, i, m).',
      icon: 'Code',
      isFeatured: true
    },
    {
      name: 'Unix Timestamp & Epoch Converter',
      slug: 'unix-timestamp-converter',
      category: 'Developer Tools',
      description: 'Convert Unix epoch timestamps (seconds) to human-readable UTC and local dates in real-time.',
      icon: 'Clock',
      isFeatured: true
    },
    {
      name: 'Group Bill Splitter & Tip Calculator',
      slug: 'split-bill-calculator',
      category: 'Everyday Calculators',
      description: 'Split restaurant bills, travel expenses, and party costs evenly with tip & discount calculations.',
      icon: 'Users',
      isFeatured: true
    },
    {
      name: 'Fuel Cost & Mileage Calculator',
      slug: 'fuel-cost-calculator',
      category: 'Automobile Tools',
      description: 'Calculate total trip fuel cost, required fuel liters, and running cost per kilometer for cars and bikes.',
      icon: 'Fuel',
      isFeatured: true
    }
  ];

  for (const t of tools) {
    await prisma.tool.upsert({
      where: { slug: t.slug },
      update: t,
      create: t
    });
    console.log(`Seeded tool: ${t.name} (${t.slug})`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
