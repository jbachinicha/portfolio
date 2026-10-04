import Script from "next/script";

/** GA4 Measurement ID. It is public by design: it ships in every page. */
const GA_ID = "G-Z2E28FLLG2";

/**
 * Google Analytics (gtag.js). Loads after the page is interactive so it never
 * competes with the hero, and only in production builds so `npm run dev`
 * does not add hits to the live property.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
