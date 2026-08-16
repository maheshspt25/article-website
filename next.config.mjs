/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// Content Security Policy (CSP) allowing Google Analytics, Microsoft Clarity, & Google AdSense
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://scripts.clarity.ms https://c.clarity.ms https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://adservice.google.com https://tpc.googlesyndication.com ${isDev ? "'unsafe-eval'" : ''};
  connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://c.clarity.ms https://scripts.clarity.ms https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net;
  frame-src 'self' https://googleads.g.doubleclick.net https://*.doubleclick.net https://pagead2.googlesyndication.com https://*.googlesyndication.com https://tpc.googlesyndication.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https: https://www.google-analytics.com https://*.google-analytics.com https://c.clarity.ms https://*.clarity.ms https://pagead2.googlesyndication.com https://*.doubleclick.net;
  media-src 'self' blob: https://translate.google.com;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
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
