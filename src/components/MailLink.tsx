"use client";

import { useEffect, useRef } from "react";
import { decodeEmail } from "@/lib/email";

type Props = {
  className?: string;
  children: React.ReactNode;
  /** Subject line prefilled on the mailto. */
  subject?: string;
};

/**
 * Mail link whose href is attached in the browser, so the address is absent
 * from the exported HTML. The DOM is touched via a ref rather than state to
 * avoid a hydration mismatch on the rendered markup.
 */
export function MailLink({ className, children, subject }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    el.href = `mailto:${decodeEmail()}${query}`;
  }, [subject]);

  return (
    // Falls back to the contact section for anyone with JS disabled.
    <a ref={ref} href="#contact" className={className}>
      {children}
    </a>
  );
}

/**
 * Renders the address itself, written in after mount. Reserves its line
 * height up front so revealing it does not shift the layout.
 */
export function MailAddress({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = decodeEmail();
  }, []);

  return <span ref={ref} className={className} aria-label="Email address" />;
}
