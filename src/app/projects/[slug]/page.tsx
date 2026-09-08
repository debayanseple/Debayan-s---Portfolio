import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { site } from '@/config/site'
import { assets } from '@/config/assets'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return site.studio.items.map((p) => ({ slug: (p as { slug: string }).slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = site.studio.items.find((p) => (p as { slug: string }).slug === slug) as
    | (typeof site.studio.items)[number] & { title: string; summary: string }
    | undefined
  if (!project) return { title: 'Project not found — DEBAYAN' }
  return {
    title: `${project.title} — DEBAYAN`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const index = site.studio.items.findIndex((p) => (p as { slug: string }).slug === slug)
  const project = site.studio.items[index] as
    | (typeof site.studio.items)[number] & {
        slug: string
        title: string
        summary: string
        tech: readonly string[]
        features: readonly string[]
        status: string
        github?: string | null
        live?: string | null
      }
    | undefined

  if (!project) notFound()

  const image = assets.studio[index] ?? null

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-[112rem] px-[max(1.5rem,7vw)] pb-[clamp(3rem,8vw,6rem)] pt-[clamp(2rem,6vw,4rem)]">
        <Link
          href="/#studio"
          className="eyebrow inline-flex items-center gap-[0.5em] text-ink/70 transition-colors hover:text-signal"
          style={{ fontSize: 'clamp(0.6875rem,1vw,0.8125rem)', letterSpacing: '0.14em' }}
        >
          <span className="block h-px w-[1.2em] bg-current" />
          Back to projects
        </Link>

        <div className="mt-[clamp(2rem,5vw,4rem)] grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p
              className="eyebrow m-0 text-signal"
              style={{ fontSize: 'clamp(0.6875rem,1vw,0.8125rem)', letterSpacing: '0.14em' }}
            >
              {project.author}
            </p>
            <h1
              className="display m-0 mt-[0.25em] text-ink"
              style={{ fontSize: 'clamp(2rem,4.5vw,4.5rem)', letterSpacing: '-0.03em', lineHeight: 0.92 }}
            >
              {project.title}
            </h1>
            <p className="body-copy copy m-0 mt-[1.2em] max-w-[52ch] text-graphite">{project.summary}</p>

            <div className="mt-[2em] flex flex-wrap gap-[0.6em]">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="eyebrow rounded-full border border-ink/15 bg-white px-[0.9em] py-[0.45em] text-ink"
                  style={{ fontSize: 'clamp(0.62rem,0.9vw,0.72rem)', letterSpacing: '0.1em' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <p
              className="eyebrow m-0 mt-[1.5em] text-ink/60"
              style={{ fontSize: 'clamp(0.6875rem,1vw,0.8125rem)', letterSpacing: '0.12em' }}
            >
              {project.status}
            </p>

            {(project.github || project.live) && (
              <div className="mt-[1.5em] flex flex-wrap gap-[0.8em]">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow inline-flex items-center gap-[0.5em] border border-ink/15 bg-white px-[1.1em] py-[0.65em] text-ink transition-colors hover:border-signal hover:text-signal"
                    style={{ fontSize: 'clamp(0.6875rem,1vw,0.8125rem)', letterSpacing: '0.12em' }}
                  >
                    Live demo
                    <span className="block h-px w-[0.9em] bg-current" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow inline-flex items-center gap-[0.5em] border border-ink/15 px-[1.1em] py-[0.65em] text-ink transition-colors hover:border-signal hover:text-signal"
                    style={{ fontSize: 'clamp(0.6875rem,1vw,0.8125rem)', letterSpacing: '0.12em' }}
                  >
                    GitHub
                    <span className="block h-px w-[0.9em] bg-current" />
                  </a>
                )}
              </div>
            )}

            <ul className="m-0 mt-[2em] flex list-none flex-col gap-[0.9em] p-0">
              {project.features.map((f) => (
                <li key={f} className="flex gap-[0.7em] text-[clamp(0.875rem,1.2vw,1.05rem)] leading-snug text-ink">
                  <span className="mt-[0.6em] block h-px w-[1.1em] shrink-0 bg-signal" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-[2.5em] flex flex-wrap gap-[1em]">
              <Link
                href="/#contact"
                className="eyebrow inline-flex items-center gap-[0.5em] bg-ink px-[1.2em] py-[0.75em] text-paper transition-colors hover:bg-signal"
                style={{ fontSize: 'clamp(0.6875rem,1vw,0.8125rem)', letterSpacing: '0.12em' }}
              >
                Discuss a project
                <span className="block h-px w-[0.9em] bg-current" />
              </Link>
              <Link
                href="/"
                className="eyebrow inline-flex items-center gap-[0.5em] border border-ink/15 px-[1.2em] py-[0.75em] text-ink transition-colors hover:border-signal hover:text-signal"
                style={{ fontSize: 'clamp(0.6875rem,1vw,0.8125rem)', letterSpacing: '0.12em' }}
              >
                Back home
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="overflow-hidden rounded-[18px] border border-ink/10 bg-white p-[1.2em] shadow-[0_10px_30px_-14px_rgba(38,32,22,0.35)]"
              style={{ transform: `rotate(${project.rotation}deg)` }}
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={project.title}
                  className="block h-auto w-full rounded-[10px] object-cover"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="flex aspect-[1.24] items-center justify-center bg-paper-deep text-ink/40">
                  <span className="eyebrow" style={{ fontSize: '0.9rem', letterSpacing: '0.14em' }}>
                    Image coming soon
                  </span>
                </div>
              )}
              <div className="polaroid-caption mt-[1em]" style={{ fontFamily: 'var(--font-hand)', fontSize: '1.05rem', lineHeight: 1.35 }}>
                <span className="block" style={{ transform: `rotate(${project.skew}deg)`, marginLeft: `${project.indent}%` }}>
                  {project.quote}
                  <span className="mt-[0.15em] block text-right">— {project.author}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
