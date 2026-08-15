import { Metadata } from 'next';

export const SITE_NAME = 'InfoMitra Portal';
export const DEFAULT_DESCRIPTION = 'India\'s leading SEO-first information portal for latest government jobs, private careers, exam dates, education scholarships, technology guides, financial tools, and how-to solutions.';

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }
  return 'https://infomitra.com';
}

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/images/og-default.jpg',
  noIndex = false,
  type = 'website',
  keywords = 'government jobs, sarkari result, admit card, exam dates, how to guides, tech tutorials, finance tools, EMI calculator, SIP calculator, age calculator, passport photo maker'
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  keywords?: string;
}): Metadata {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Jobs, Education, Tech & Financial Guides`;

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_IN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
      creator: '@InfoMitraDesk',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-placeholder',
      yandex: 'yandex-verification-placeholder',
    },
  };
}

// JSON-LD Generators
export function generateOrganizationJsonLd() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      'https://twitter.com/InfoMitraDesk',
      'https://facebook.com/InfoMitraDesk',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support & Editorial',
      email: 'editorial@infomitra.com',
    },
  };
}

export function generateWebSiteJsonLd() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateWebApplicationJsonLd(tool: { name: string; description: string; slug: string }) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `${baseUrl}/tools/${tool.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

export function generateJobPostingJsonLd(job: {
  title: string;
  organization: string;
  description: string;
  createdAt: Date;
  applicationEndDate?: Date | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryDisplay?: string | null;
  locationName: string;
  slug: string;
}) {
  const baseUrl = getBaseUrl();
  const validUntil = job.applicationEndDate
    ? job.applicationEndDate.toISOString()
    : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.createdAt.toISOString(),
    validThrough: validUntil,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.organization,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.locationName,
        addressCountry: 'IN',
      },
    },
    baseSalary: job.salaryMin && job.salaryMax ? {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: 'MONTH',
      },
    } : undefined,
    directApply: true,
    url: `${baseUrl}/jobs/${job.slug}`,
  };
}

export function generateArticleJsonLd(article: {
  title: string;
  summary: string;
  slug: string;
  categorySection: string;
  createdAt: Date;
  updatedAt: Date;
  authorName?: string;
}) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url: `${baseUrl}/${article.categorySection}/${article.slug}`,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: article.authorName || 'Editorial Desk',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
  };
}

export function generateFaqJsonLd(faqs: { q: string; a: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
