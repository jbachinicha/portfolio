import { about, education, experience } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-sheet py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading title={about.heading} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 lg:col-span-4">
            {about.body.map((para) => (
              <p key={para} className="text-[1.0625rem] leading-[1.65] text-ink-soft text-pretty">
                {para}
              </p>
            ))}
            <p className="border-t pt-5 text-[15px] leading-snug text-muted">
              <span className="font-semibold text-ink">{education.degree}</span>
              <br />
              {education.school}, {education.period}
            </p>
          </div>

          <div className="border-t-[3px] border-ink lg:col-span-8">
            {experience.map((job) => (
              <article key={job.org} className="grid gap-4 border-b py-9 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-10">
                <div>
                  <h3 className="text-[1.35rem] leading-tight font-bold tracking-[-0.02em]">{job.org}</h3>
                  <p className="mt-1 text-[15px] text-muted">{job.period}</p>
                </div>
                <div>
                  <ul className="text-[15px] font-medium text-ink">
                    {job.roles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((pt) => (
                      <li key={pt} className="text-[1.0625rem] leading-[1.6] text-ink-soft text-pretty">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
