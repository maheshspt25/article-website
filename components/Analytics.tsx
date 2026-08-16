'use client';

import Script from 'next/script';

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const adsensePubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'ca-pub-1860301116647636';

  return (
    <>
      {/* Google Analytics GA4 - Non-blocking lazyOnload */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                cookie_domain: 'none',
                cookie_flags: 'max-age=7200;secure;samesite=lax'
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity - Non-blocking lazyOnload */}
      {clarityId && (
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
            window.clarity("consent");
          `}
        </Script>
      )}

      {/* Google AdSense Auto-Ads - Non-blocking lazyOnload */}
      {adsensePubId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePubId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
