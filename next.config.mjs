/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// Strict Content Security Policy (CSP) with Google Analytics & Microsoft Clarity permissions
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://c.clarity.ms ${isDev ? "'unsafe-eval'" : ''};
  connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://stats.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://c.clarity.ms;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https: https://www.google-analytics.com https://c.clarity.ms;
  media-src 'self' blob: https://translate.google.com;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
