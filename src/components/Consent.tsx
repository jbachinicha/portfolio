"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";

/** GA4 Measurement ID. It is public by design: it ships in every page. */
const GA_ID = "G-Z2E28FLLG2";
const STORAGE_KEY = "analytics-consent";
const REOPEN_EVENT = "open-consent-settings";
const CHANGE_EVENT = "analytics-consent-change";

type Choice = "granted" | "denied";

// Kept alongside localStorage so a blocked or full store still holds the
// choice for the rest of the page view.
let memoryChoice: Choice | null = null;

function readChoice(): Choice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Storage can be blocked; fall through to the in-memory copy.
  }
  return memoryChoice;
}

function saveChoice(choice: Choice) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Ignored: the in-memory copy above still applies.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** localStorage as an external store, so React reads it without an effect. */
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

const getSnapshot = (): Choice | "none" => readChoice() ?? "none";
// Server render and hydration: unknown, so the banner never flashes for
// someone who already chose.
const getServerSnapshot = (): "unknown" => "unknown";

/** Remove Google's cookies if someone withdraws consent after accepting. */
function clearGaCookies() {
  const host = window.location.hostname;
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${host}`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}`;
    }
  }
}

/**
 * Consent banner plus Google Analytics. Nothing from Google is requested
 * until the visitor accepts. The choice is kept in localStorage, and the
 * footer's "Cookie settings" button reopens the banner to change it.
 * The analytics script itself only loads in production builds.
 */
export function Consent() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  const choice = stored === "granted" || stored === "denied" ? stored : null;
  const open = stored === "none" || (stored !== "unknown" && reopened);

  function decide(next: Choice) {
    const flag = `ga-disable-${GA_ID}`;
    if (next === "denied") {
      (window as unknown as Record<string, unknown>)[flag] = true;
      clearGaCookies();
    } else {
      delete (window as unknown as Record<string, unknown>)[flag];
    }
    saveChoice(next);
    setReopened(false);
  }

  return (
    <>
      {choice === "granted" && process.env.NODE_ENV === "production" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {open ? (
        <div
          role="region"
          aria-label="Analytics consent"
          className="fixed inset-x-4 bottom-4 z-40 rounded-lg border bg-sheet p-5 text-ink shadow-[0_18px_40px_-18px_rgb(2_36_24/0.45)] sm:right-auto sm:w-[25rem]"
        >
          <p className="text-[15px] leading-[1.55] text-ink-soft">
            I use Google Analytics to count visits. It sets cookies, and nothing loads unless you
            accept.
          </p>
          <div className="mt-4 flex gap-2.5">
            <button type="button" onClick={() => decide("granted")} className="btn btn-outline !px-5 !py-2.5">
              Accept
            </button>
            <button type="button" onClick={() => decide("denied")} className="btn btn-outline !px-5 !py-2.5">
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Footer control that reopens the banner so a choice can be changed. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}
