'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'
import PolaroidImage from './PolaroidImage'
import PolaroidCaption from './PolaroidCaption'
import type { Polaroid } from './PolaroidCard'

type Props = {
  items: readonly Polaroid[]
  open: number | null
  onClose: () => void
}

/**
 * The larger view. Deliberately not a modal system — one overlay, the same
 * Polaroid at a size you can actually look at, Escape or a click outside to
 * dismiss. When there is a real work section, `PolaroidCard` takes an `href`
 * instead and this never opens.
 *
 * It still does the three things a dialog has to do: it traps nothing but
 * takes focus, it restores focus to the card that opened it, and it stops the
 * page scrolling underneath.
 */
export default function Lightbox({ items, open, onClose }: Props) {
  const reduced = usePrefersReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const opener = useRef<Element | null>(null)
  const item = open === null ? null : items[open]

  useEffect(() => {
    if (open === null) return
    opener.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      ;(opener.current as HTMLElement | null)?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-[6vw]"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.4, ease: ease.soft }}
          onClick={onClose}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(24, 22, 17, 0.82)' }} />

          <motion.div
            className="relative w-[min(86vw,30rem)]"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 6 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: ease.paper }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="polaroid-card flex flex-col" style={{ ['--rot' as string]: '0deg' }}>
              <figure className="m-0 flex flex-col">
                <PolaroidImage
                  src={item.src}
                  alt={`Studio photograph ${(open ?? 0) + 1}`}
                  index={open ?? 0}
                  objectPosition={item.objectPosition}
                />
                <PolaroidCaption quote={item.quote} author={item.author} skew={item.skew} indent={item.indent} />
              </figure>
              {item.href && (
                <Link
                  href={item.href}
                  className="eyebrow group/link mt-[0.9em] inline-flex items-center gap-[0.45em] self-start border border-ink/15 px-[0.85em] py-[0.45em] text-[clamp(0.6rem,1.5cqw,0.72rem)] tracking-[0.12em] text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
                  style={{ fontStretch: '125%' }}
                >
                  View details
                  <span className="block h-px w-[0.9em] bg-current transition-transform duration-300 group-hover/link:translate-x-[3px]" />
                </Link>
              )}
            </div>
          </motion.div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="on-noir absolute right-[4vw] top-[4vw] flex h-10 w-10 items-center justify-center text-white/70 transition-colors duration-200 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
