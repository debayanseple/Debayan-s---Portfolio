'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { usePrefersReducedMotion, useElementPointer } from '@/lib/hooks'
import PolaroidImage from './PolaroidImage'
import PolaroidCaption from './PolaroidCaption'

export type Polaroid = {
  slug?: string
  title?: string
  quote: string
  author: string
  /** Resting angle, in degrees. */
  rotation: number
  /** Vertical stagger, as a percentage of the card's own height. */
  drop: number
  /** Shadow weight, 0–1. Varied per card so the three do not sit at one depth. */
  shade: number
  /** Slant on the written block, in degrees. */
  skew: number
  /** Horizontal drift on the written block, as a percentage. */
  indent: number
  src?: string | null
  objectPosition?: string
  /** Dedicated page for this project. When set, a link button appears. */
  href?: string | null
  tech?: readonly string[]
  summary?: string
  status?: string
  features?: readonly string[]
  github?: string | null
  live?: string | null
}

type Props = {
  item: Polaroid
  index: number
  variants: Variants
  onOpen: (index: number) => void
}

/**
 * One photograph on the paper.
 *
 * Three nested elements because three different clocks are running: the
 * stagger is static config, the tilt is a rAF loop reading the cursor, and the
 * lift is a CSS transition on hover. Put them on one element and the
 * transition smooths the already-smoothed tilt into lag.
 *
 * The card is a button — clicking opens the larger view — but it carries no
 * button chrome whatsoever. Give it an `href` later and it becomes a link to
 * the piece instead, with no change to anything visual.
 */
export default function PolaroidCard({ item, index, variants, onOpen }: Props) {
  const reduced = usePrefersReducedMotion()
  const place = useRef<HTMLDivElement>(null)
  useElementPointer(place, !reduced)

  return (
    /* The stagger sits on its own wrapper. Framer drives a transform on the
       element it animates, so a static transform on the same node would be
       overwritten the moment the entrance runs. */
    <div className="polaroid-slot" style={{ transform: `translateY(${item.drop}%)` }}>
      <motion.div ref={place} className="polaroid-place" variants={variants} custom={index}>
        <div className="polaroid-tilt">
          <div className="polaroid-card flex flex-col" style={cardVars(item) as React.CSSProperties}>
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={`Open photograph ${index + 1}: ${item.quote}`}
              className="block w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-left"
            >
              <PolaroidImage
                src={item.src}
                alt={item.title ? `${item.title} — photograph ${index + 1}` : `Studio photograph ${index + 1}`}
                index={index}
                objectPosition={item.objectPosition}
              />
              <PolaroidCaption
                quote={item.quote}
                author={item.author}
                skew={item.skew}
                indent={item.indent}
              />
            </button>
            {item.href && (
              <Link
                href={item.href}
                onClick={(e) => e.stopPropagation()}
                className="eyebrow group/link mt-[0.9em] inline-flex items-center gap-[0.45em] self-start border border-ink/15 px-[0.85em] py-[0.45em] text-[clamp(0.6rem,1.5cqw,0.72rem)] tracking-[0.12em] text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
                style={{ fontStretch: '125%' }}
              >
                View details
                <span className="block h-px w-[0.9em] bg-current transition-transform duration-300 group-hover/link:translate-x-[3px]" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function cardVars(item: Polaroid) {
  return {
    ['--rot' as string]: `${item.rotation}deg`,
    ['--shade' as string]: item.shade,
  }
}
