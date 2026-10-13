"use client";

import { useEffect, useRef, useState } from "react";
import { shownBuilds, type Build } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { ShotTabs, VideoPlayer } from "./WorkMedia";

const chip = "rounded-md border border-ink/15 bg-paper px-2.5 py-1 text-[14px] font-medium text-ink-soft";

/** Below `lg` the panels are a horizontal swipe track; from `lg` up only the picked one shows. */
const isTrack = () => window.matchMedia("(max-width: 1023px)").matches;

function scrollTrackTo(track: HTMLElement | null, id: string, behavior: ScrollBehavior) {
  if (!track || !isTrack()) return;
  const i = shownBuilds.findIndex((b) => b.id === id);
  track.scrollTo({ left: i * track.clientWidth, behavior });
}

function BuildPanel({ build, active }: { build: Build; active: boolean }) {
  // Only a tall video gets a narrow frame; wide media fills the column.
  const portrait = build.media.type === "video" && build.media.height > build.media.width;
  const narrow = portrait ? "mx-auto max-w-[20rem]" : "";

  return (
    <div
      id={build.id}
      role="tabpanel"
      aria-labelledby={`tab-${build.id}`}
      data-panel
      data-active={active ? "" : undefined}
      // Phones: every panel is a swipe slide. Desktop: only the picked one shows.
      className={`w-full min-w-0 shrink-0 snap-start snap-always px-[clamp(1.25rem,4vw,2.5rem)] lg:w-auto lg:px-0 ${
        active ? "lg:animate-rise" : "lg:hidden"
      }`}
    >
      <p className="text-[15px] text-muted">{build.kind}</p>
      <h3 className="mt-1.5 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.04] font-bold tracking-[-0.03em]">
        {build.title}
      </h3>

      <div className="mt-6 shadow-[0_32px_60px_-36px_rgb(12_26_20/0.4)]">
        {build.media.type === "shots" ? (
          <ShotTabs shots={build.media.shots} />
        ) : (
          <VideoPlayer {...build.media} className={narrow} />
        )}
      </div>
      {build.note ? <p className={`mt-3 text-[14px] text-muted ${narrow}`}>{build.note}</p> : null}

      <div className="mt-9 grid gap-9 md:grid-cols-2 md:gap-12">
        <div>
          <p className="text-[1.0625rem] leading-[1.65] text-ink-soft text-pretty">{build.summary}</p>
          {build.next ? <p className="mt-4 text-[15.5px] leading-snug text-ink-soft">{build.next}</p> : null}
        </div>

        <div>
          {/* Highlighter marks what already works. */}
          <ul className="space-y-2.5">
            {build.working.map((item) => (
              <li key={item} className="text-[1.0625rem] leading-[1.7] font-medium">
                <span className="mark">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
            {build.stack.map((s) => (
              <li key={s} className={chip}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [activeId, setActiveId] = useState(shownBuilds[0].id);
  const showcase = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeId);
  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  // Deep links (`/#jobhunt`) pick a build and bring the showcase into view. On desktop
  // the inactive panels are display:none, and on phones they are off to the side, so the
  // browser cannot scroll to them by itself.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!shownBuilds.some((b) => b.id === id)) return;
      setActiveId(id);
      requestAnimationFrame(() => scrollTrackTo(track.current, id, "auto"));
      // Let the browser's own hash scroll finish first, then take over.
      setTimeout(() => showcase.current?.scrollIntoView({ block: "start" }), 60);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Swiping: once the track settles, the slide in view becomes the picked build.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (!isTrack()) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const id = shownBuilds[Math.round(el.scrollLeft / el.clientWidth)]?.id;
        if (id && id !== activeRef.current) {
          setActiveId(id);
          window.history.replaceState(null, "", `#${id}`);
        }
      }, 90);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The track is as tall as the slide in view, not the tallest slide, so a short build
  // does not leave a gap under it.
  useEffect(() => {
    const el = track.current;
    const panel = document.getElementById(activeId);
    if (!el || !panel) return;
    const fit = () => {
      el.style.height = isTrack() ? `${panel.offsetHeight}px` : "";
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(panel);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [activeId]);

  // A video keeps playing after its slide is gone; stop whatever is no longer picked.
  useEffect(() => {
    showcase.current?.querySelectorAll<HTMLVideoElement>("[data-panel]:not([data-active]) video").forEach((v) => {
      v.pause();
    });
  }, [activeId]);

  function select(id: string) {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    scrollTrackTo(track.current, id, "smooth");
  }

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = shownBuilds.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (index + 1) % shownBuilds.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (index + last) % shownBuilds.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    e.preventDefault();
    select(shownBuilds[next].id);
    document.getElementById(`tab-${shownBuilds[next].id}`)?.focus();
  }

  return (
    <section id="work" className="scroll-mt-16 bg-sheet py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title="Selected work"
          lead="Everything here runs. Pick a build, click through the screens and press play to see how it behaves."
        />

        <div ref={showcase} className="mt-14 grid scroll-mt-24 gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
          <div
            role="tablist"
            aria-label="Builds"
            className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:self-start"
          >
            {shownBuilds.map((b, i) => {
              const selected = b.id === activeId;
              return (
                <button
                  key={b.id}
                  id={`tab-${b.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={b.id}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(b.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`rounded-md border px-3.5 py-3 text-left transition-colors sm:px-4 ${
                    selected
                      ? "border-primary bg-primary-wash"
                      : "border-rule hover:border-ink/40 hover:bg-paper lg:border-transparent"
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-[13px] font-bold text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.05rem] leading-tight font-bold tracking-[-0.01em]">{b.title}</span>
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-snug text-muted sm:pl-[1.85rem]">{b.kind}</span>
                </button>
              );
            })}
          </div>

          <div className="min-w-0">
            <p className="mb-5 flex items-center gap-2 text-[13px] text-muted lg:hidden" aria-hidden>
              <span>←</span>
              Swipe to see the next build
              <span>→</span>
            </p>
            <div
              ref={track}
              className="-mx-[clamp(1.25rem,4vw,2.5rem)] flex snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden overscroll-x-contain transition-[height] duration-300 [scrollbar-width:none] lg:mx-0 lg:block lg:snap-none lg:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {shownBuilds.map((b) => (
                <BuildPanel key={b.id} build={b} active={b.id === activeId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
