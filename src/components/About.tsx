import { about, education, experience } from "@/content/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-sheet py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Heading and summary stay in view beside the longer timeline, like the capability rows. */}
        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <h2 className="text-[clamp(2.1rem,3.6vw,3.1rem)] leading-[1.04] font-bold tracking-[-0.035em] text-balance">
            {about.heading}
          </h2>
          <div className="mt-8 max-w-[34rem] space-y-5">
            {about.body.map((para) => (
              <p key={para} className="text-[1.0625rem] leading-[1.65] text-ink-soft text-pretty">
                {para}
              </p>
            ))}
          </div>
          <p className="mt-8 max-w-[34rem] border-t pt-5 text-[15px] leading-snug text-muted">
            <span className="font-semibold text-ink">{education.degree}</span>
            <br />
            {education.school}, {education.period}
          </p>
        </div>

        <div className="border-t-[3px] border-ink lg:col-span-7">
          {experience.map((job) => (
            <article key={job.org} className="border-b py-9">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[1.35rem] leading-tight font-bold tracking-[-0.02em]">{job.org}</h3>
                <p className="text-[15px] text-muted">{job.period}</p>
              </div>
              <ul className="mt-3 text-[15px] font-medium text-ink">
                {job.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <ul className="mt-5 space-y-2.5">
                {job.points.map((pt) => (
                  <li key={pt} className="text-[1.0625rem] leading-[1.6] text-ink-soft text-pretty">
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
