const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedFinanceTruthArticles() {
  console.log('🌱 Seeding authoritative Real-Truth Finance Guides...');

  let author = await prisma.author.findFirst();
  if (!author) {
    author = await prisma.author.create({
      data: {
        name: 'InfoMitra Financial Editorial Desk',
        slug: 'financial-editorial-desk',
        designation: 'Certified Tax & Financial Research Desk',
        bio: 'Fact-checked financial research desk drawing directly from Income Tax Department, Reserve Bank of India, and Ministry of Finance gazettes.'
      }
    });
  }

  const articles = [
    {
      title: 'New Tax Regime vs Old Tax Regime Slabs (2026): Complete Income Tax Calculator Guide',
      slug: 'income-tax-new-vs-old-regime-guide-2026',
      summary: 'Official breakdown of the New Tax Regime (0-3L Nil, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30%), ₹75,000 standard deduction, and Old Regime 80C deductions.',
      categorySection: 'finance',
      subCategory: 'tax',
      readingTime: '9 min read',
      content: `<h2>New Tax Regime vs. Old Tax Regime Comparison</h2>
<p>The Income Tax Department of India enforces the <strong>New Tax Regime</strong> as the default tax option for salaried individuals and HUFs. Salaried employees receive a standard deduction of <strong>₹75,000</strong> under the New Regime.</p>

<h3>Official New Tax Regime Tax Slabs</h3>
<ul>
  <li><strong>Up to ₹3,00,000:</strong> Nil (0% Tax)</li>
  <li><strong>₹3,00,001 to ₹7,00,000:</strong> 5% (Tax rebate under Sec 87A makes tax ₹0 for income up to ₹7.0 Lakhs)</li>
  <li><strong>₹7,00,001 to ₹10,00,000:</strong> 10%</li>
  <li><strong>₹10,00,001 to ₹12,00,000:</strong> 15%</li>
  <li><strong>₹12,00,001 to ₹15,00,000:</strong> 20%</li>
  <li><strong>Above ₹15,00,000:</strong> 30%</li>
</ul>

<h3>Old Tax Regime Deductions (Section 80C, 80D, HRA)</h3>
<p>The Old Tax Regime allows deductions under Section 80C (up to ₹1.5 Lakhs for PPF, EPF, ELSS, LIC), Section 80D (health insurance premiums up to ₹25,000/₹50,000), HRA exemption, and home loan interest (up to ₹2 Lakhs under Section 24b).</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Calculate Total Annual Gross Salary', description: 'Include basic pay, HRA, special allowances, and annual performance bonuses.' },
        { step: 2, title: 'Apply Standard Deduction', description: 'Deduct flat ₹75,000 standard deduction for salaried individuals.' },
        { step: 3, title: 'Evaluate Section 80C & 80D Investments', description: 'If total deductions exceed ₹3.75 Lakhs, Old Regime may offer lower overall tax liability.' },
        { step: 4, title: 'Select Tax Regime on Income Tax Portal', description: 'File ITR-1 or ITR-2 on incometax.gov.in before the July 31 deadline.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Is Section 80C deduction available under the New Tax Regime?', a: 'No, Section 80C deductions (PPF, ELSS, LIC) are not available under the New Tax Regime.' },
        { q: 'What is the taxable threshold with Section 87A rebate?', a: 'Under the New Regime, income up to ₹7,00,000 receives a Section 87A rebate resulting in net zero tax.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'Income Tax Department Official Tax Slabs', url: 'https://incometax.gov.in/', authority: 'Income Tax Department of India' },
        { title: 'Ministry of Finance Tax Notifications', url: 'https://finmin.nic.in/', authority: 'Ministry of Finance' }
      ]),
      disclaimer: 'Tax Disclaimer: Tax laws are subject to change. Consult a Chartered Accountant (CA) for personalized tax filing advice.'
    },

    {
      title: 'EPF Interest Rate 8.25% & PPF Interest Rate 7.10%: Small Savings Schemes Guide',
      slug: 'epf-825-ppf-710-interest-rates-guide-2026',
      summary: 'Official EPF 8.25% and PPF 7.10% compound interest calculation guide, tax-free compounding rules, and maturity withdrawal guidelines.',
      categorySection: 'finance',
      subCategory: 'savings',
      readingTime: '7 min read',
      content: `<h2>Employees Provident Fund (EPF) &amp; Public Provident Fund (PPF) Overview</h2>
<p>The Ministry of Labor &amp; Employment and Ministry of Finance maintain the EPF interest rate at <strong>8.25% per annum</strong> and the PPF interest rate at <strong>7.10% per annum</strong>.</p>

<h3>Key Features Comparison</h3>
<ul>
  <li><strong>EPF Rate:</strong> 8.25% p.a. (Mandatory 12% contribution by employee + 12% by employer).</li>
  <li><strong>PPF Rate:</strong> 7.10% p.a. (Compounded annually, 15-year lock-in period).</li>
  <li><strong>Tax Status:</strong> EEE (Exempt-Exempt-Exempt) status for PPF deposits up to ₹1.5 Lakhs per year.</li>
</ul>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Check UAN & EPF Balance', description: 'Log in to the EPFO Member e-Sewa portal (epfindia.gov.in) using your 12-digit UAN.' },
        { step: 2, title: 'Deposit PPF before 5th of Every Month', description: 'Deposit funds in PPF between 1st and 5th of the month to earn interest for that entire month.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Is EPF interest taxable above ₹2.5 Lakhs?', a: 'Yes, annual employee EPF contribution exceeding ₹2.5 Lakhs attracts tax on the interest earned on the excess contribution.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'EPFO Member Portal', url: 'https://www.epfindia.gov.in/', authority: 'EPFO India' }
      ]),
      disclaimer: 'Financial Disclaimer: Small savings interest rates are declared quarterly by the Government of India.'
    },

    {
      title: 'GST Slabs & Tax Rates (0%, 5%, 18%, 40%): Complete Goods & Services Tax Guide',
      slug: 'gst-tax-slabs-rates-exemption-list-2026',
      summary: 'Official breakdown of Indian GST slabs (0% essential, 5% mass items, 18% standard, 40% luxury/sin goods), 3% gold rate, and HSN code lookup rules.',
      categorySection: 'finance',
      subCategory: 'tax',
      readingTime: '8 min read',
      content: `<h2>Indian Goods and Services Tax (GST) Architecture</h2>
<p>The Goods and Services Tax (GST) Council structures indirect taxes across four principal tax slabs: <strong>0% (Nil), 5%, 18%, and 40%</strong>, along with special rates for gold (3%) and rough diamonds (0.25%).</p>

<h3>GST Slab Classification</h3>
<ul>
  <li><strong>0% Slab:</strong> Essential unbranded staples, fresh milk, curd, unbranded food grains, and life-saving medicines.</li>
  <li><strong>5% Slab:</strong> Packaged food items, footwear under ₹1,000, apparel under ₹1,000, and essential medical supplies.</li>
  <li><strong>18% Slab:</strong> Standard rate covering consumer electronics, IT services, financial services, telecom, and hotel stays.</li>
  <li><strong>40% Slab:</strong> Sin &amp; luxury goods including aerated sugary drinks, luxury motor vehicles, and tobacco products.</li>
</ul>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Identify Product HSN/SAC Code', description: 'Search the official GST Portal (gst.gov.in) to locate the 4 to 8 digit HSN/SAC code for your goods or service.' },
        { step: 2, title: 'Split Tax into CGST & SGST', description: 'For intra-state sales, divide tax equally between CGST (50%) and SGST (50%). For inter-state sales, charge IGST (100%).' }
      ]),
      faqJson: JSON.stringify([
        { q: 'What is the GST registration threshold limit?', a: 'GST registration is mandatory for businesses with annual turnover exceeding ₹40 Lakhs for goods (₹20 Lakhs for special category states) and ₹20 Lakhs for services.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'CBIC Official GST Council Portal', url: 'https://www.gst.gov.in/', authority: 'Central Board of Indirect Taxes and Customs (CBIC)' }
      ]),
      disclaimer: 'Tax Disclaimer: Consult a GST practitioner for GST filing compliance and Input Tax Credit (ITC) reconciliation.'
    },

    {
      title: 'RBI Repo Rate 5.25% & Home Loan EMI Impact: Borrowing Cost Analysis',
      slug: 'rbi-repo-rate-home-loan-emi-impact-2026',
      summary: 'Analysis of the Reserve Bank of India (RBI) Monetary Policy Repo Rate at 5.25%, repo rate linked lending rates (RLLR), and home loan EMI calculations.',
      categorySection: 'finance',
      subCategory: 'loans',
      readingTime: '7 min read',
      content: `<h2>Understanding RBI Repo Rate &amp; Lending Benchmarks</h2>
<p>The Reserve Bank of India (RBI) Monetary Policy Committee (MPC) maintains the key policy <strong>Repo Rate at 5.25%</strong>. All commercial banks link home loan interest rates to the Repo Rate Linked Lending Rate (RLLR).</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Check Floating vs Fixed Loan Terms', description: 'Verify if your home loan is tied to RLLR (Repo Rate Linked Lending Rate) or MCLR.' },
        { step: 2, title: 'Calculate EMI Sensitivity', description: 'A 25 bps (0.25%) reduction in repo rate reduces monthly EMI by approximately ₹15 per Lakh borrowed on a 20-year tenure.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'What is the difference between RLLR and MCLR?', a: 'RLLR shifts immediately with RBI repo rate decisions, whereas MCLR updates on a pre-fixed 6-month or 1-year reset cycle.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'Reserve Bank of India Monetary Policy Statements', url: 'https://rbi.org.in/', authority: 'Reserve Bank of India (RBI)' }
      ]),
      disclaimer: 'Loan Disclaimer: Loan interest rates depend on individual credit scores (CIBIL) and bank risk margins.'
    },

    {
      title: 'How to Improve CIBIL Credit Score Fast: 7 Proven Steps for 750+ Score',
      slug: 'how-to-improve-cibil-credit-score-fast-2026',
      summary: 'Actionable steps to improve your CIBIL credit score above 750: credit utilization ratio (<30%), payment history, credit mix, and disputing bureau errors.',
      categorySection: 'finance',
      subCategory: 'loans',
      readingTime: '7 min read',
      content: `<h2>Understanding CIBIL Credit Score Range (300 to 900)</h2>
<p>A CIBIL credit score of <strong>750 or above</strong> is considered excellent by banks and NBFCs, qualifying borrowers for the lowest interest rates on home, car, and personal loans.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Pay 100% Bill Dues On-Time', description: 'Set up auto-debit for credit card statement bills and loan EMIs to maintain a 100% clean payment track record.' },
        { step: 2, title: 'Maintain Credit Utilization Ratio below 30%', description: 'Keep total credit card spending under 30% of your total credit limit across all cards.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Does checking your own CIBIL score reduce it?', a: 'No, checking your own credit score is a soft inquiry and has zero impact on your CIBIL score.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'TransUnion CIBIL India Official Portal', url: 'https://www.cibil.com/', authority: 'TransUnion CIBIL' }
      ]),
      disclaimer: 'Credit Disclaimer: CIBIL score recalculation cycles occur monthly following lender data uploads.'
    },

    {
      title: 'PM Kisan Samman Nidhi Scheme: Status Check, eKYC & Beneficiary List Guide',
      slug: 'pm-kisan-samman-nidhi-status-eKYC-guide-2026',
      summary: 'Step-by-step guide to checking PM-Kisan status, completing mandatory Aadhaar face eKYC, updating bank land seeding, and viewing beneficiary lists.',
      categorySection: 'finance',
      subCategory: 'government-schemes',
      readingTime: '6 min read',
      content: `<h2>Overview of Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)</h2>
<p>Under the PM-KISAN scheme, eligible farmer families receive <strong>₹6,000 per year</strong> paid in three equal installments of ₹2,000 directly into Aadhaar-seeded bank accounts (DBT).</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Visit Official PM-Kisan Portal', description: 'Go to pmkisan.gov.in and click on Farmers Corner.' },
        { step: 2, title: 'Complete OTP/Face eKYC', description: 'Enter Aadhaar number and submit OTP sent to Aadhaar-linked mobile number.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Why is PM-Kisan installment stopped for some farmers?', a: 'Installments pause if Aadhaar eKYC is incomplete, land seeding is unverified, or bank account is not linked with Aadhaar.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'PM-Kisan Official Portal', url: 'https://pmkisan.gov.in/', authority: 'Ministry of Agriculture & Farmers Welfare' }
      ]),
      disclaimer: 'Scheme Disclaimer: Verify beneficiary details exclusively through official government portals.'
    },

    {
      title: 'Mutual Fund SIP Investing for Beginners: Rupee Cost Averaging & Compounding',
      slug: 'sip-mutual-fund-investing-beginners-guide-2026',
      summary: 'Comprehensive guide on starting Systematic Investment Plans (SIP) in mutual funds: equity vs debt, rupee cost averaging, step-up SIPs, and NAV compounding.',
      categorySection: 'finance',
      subCategory: 'savings',
      readingTime: '8 min read',
      content: `<h2>The Power of Systematic Investment Plans (SIP)</h2>
<p>A Systematic Investment Plan (SIP) allows investors to invest small sums (as low as ₹500/month) into mutual funds at regular intervals, leveraging <strong>Rupee Cost Averaging</strong> and compound growth.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Complete One-Time Video KYC', description: 'Submit PAN card, Aadhaar, and bank account proof on SEBI-registered mutual fund portals.' },
        { step: 2, title: 'Select Nifty 50 / Sensex Index Funds', description: 'Beginners should prioritize low-cost broad market index funds with expense ratios below 0.20%.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Can a SIP be paused or stopped anytime?', a: 'Yes, SIPs are flexible and can be paused or cancelled at any time without penalty fees.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'AMFI India Mutual Fund Investor Education', url: 'https://www.amfiindia.com/', authority: 'Association of Mutual Funds in India (AMFI)' }
      ]),
      disclaimer: 'Investment Disclaimer: Mutual fund investments are subject to market risks. Read all scheme related documents carefully.'
    },

    {
      title: 'Bank Fixed Deposit (FD) Interest Rates Comparison: Public vs Private Banks',
      slug: 'bank-fd-fixed-deposit-interest-rates-comparison-2026',
      summary: 'Comparison of bank fixed deposit (FD) interest rates across SBI, HDFC, ICICI, and Small Finance Banks with DICGC ₹5 Lakh deposit insurance protection rules.',
      categorySection: 'finance',
      subCategory: 'savings',
      readingTime: '7 min read',
      content: `<h2>Fixed Deposit Interest Rates &amp; Safety Framework</h2>
<p>Bank Fixed Deposits (FDs) offer guaranteed capital protection backed by the Reserve Bank of India subsidiary <strong>Deposit Insurance and Credit Guarantee Corporation (DICGC)</strong>, which insures deposits up to <strong>₹5,00,000</strong> per bank.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Check DICGC Insurance Coverage', description: 'Ensure your total principal plus interest in a single bank stays under the ₹5 Lakh DICGC insurance limit.' },
        { step: 2, title: 'Submit Form 15G / 15H to Avoid TDS', description: 'Submit Form 15G (for under 60) or Form 15H (for senior citizens) if total taxable income is below basic exemption.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'What is the TDS threshold for FD interest?', a: 'TDS applies if total annual interest income from bank FDs exceeds ₹40,000 (₹50,000 for senior citizens).' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'DICGC Deposit Insurance Official Guidelines', url: 'https://www.dicgc.org.in/', authority: 'DICGC / RBI' }
      ]),
      disclaimer: 'Banking Disclaimer: FD interest rates are subject to change by respective banks without prior notice.'
    }
  ];

  for (const art of articles) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        ...art,
        authorId: author.id,
        published: true,
        featured: true
      },
      create: {
        ...art,
        authorId: author.id,
        published: true,
        featured: true
      }
    });
    console.log(`✅ Seeded Real-Truth Finance Guide: ${art.title} (${art.subCategory}/${art.slug})`);
  }
}

seedFinanceTruthArticles()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
