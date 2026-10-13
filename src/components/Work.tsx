"use client";

import { useEffect, useRef, useState } from "react";
import { shownBuilds, type Build } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { ShotTabs, VideoPlayer } from "./WorkMedia";

const chip = "rounded-md border border-ink/15 bg-paper px-2.5 py-1 text-[14px] font-medium text-ink-soft";

function BuildPanel({ build, active }: { build: Build; active: boolean }) {
  // Only a tall video gets a narrow frame; wide media fills the column.
  const portrait = build.media.type === "video" && build.media.height > build.media.width;
  const narrow = portrait ? "mx-auto max-w-[20rem]" : "";

  return (
    <div
      id={build.id}
      role="tabpanel"
      aria-labelledby={`tab-${build.id}`}
      hidden={!active}
      className="animate-rise min-w-0"
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
  const tabs = useRef<HTMLDivElement>(null);

  // Deep links (`/#jobhunt`) pick a build and bring the showcase into view. Inactive
  // panels are display:none, so the browser cannot scroll to them by itself.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!shownBuilds.some((b) => b.id === id)) return;
      setActiveId(id);
      // Let the browser's own hash scroll finish first, then take over.
      setTimeout(() => showcase.current?.scrollIntoView({ block: "start" }), 60);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // A hidden video keeps playing; stop whatever is no longer on screen. On phones the
  // tabs sit in a scrolling row, so bring the picked one into view along the row only.
  useEffect(() => {
    const row = tabs.current;
    const tab = document.getElementById(`tab-${activeId}`);
    if (row && tab && row.scrollWidth > row.clientWidth) {
      const offset = tab.getBoundingClientRect().left - row.getBoundingClientRect().left;
      row.scrollTo({ left: row.scrollLeft + offset - 20 });
    }
    showcase.current?.querySelectorAll<HTMLElement>('[role="tabpanel"][hidden] video').forEach((v) => {
      (v as HTMLVideoElement).pause();
    });
  }, [activeId]);

  function select(id: string) {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
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
            ref={tabs}
            role="tablist"
            aria-label="Builds"
            className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 scroll-pl-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-10 sm:px-10 lg:mx-0 lg:flex-col lg:self-start lg:overflow-visible lg:px-0 lg:pb-0"
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
                  className={`min-w-[10.5rem] shrink-0 snap-start rounded-md border px-4 py-3 text-left transition-colors lg:w-full lg:shrink ${
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
                  <span className="mt-1 block pl-[1.85rem] text-[13.5px] leading-snug text-muted">{b.kind}</span>
                </button>
              );
            })}
          </div>

          <div className="min-w-0">
            {shownBuilds.map((b) => (
              <BuildPanel key={b.id} build={b} active={b.id === activeId} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
