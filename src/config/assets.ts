/**
 * ---------------------------------------------------------------------------
 * ASSET REGISTRY
 * ---------------------------------------------------------------------------
 * One place to swap placeholders for finals. Every entry is `null` today; the
 * component that consumes it already reserves the exact box the real asset
 * will occupy, so setting a path here changes pixels, never layout.
 *
 *   1. Drop the file into /public/assets/…
 *   2. Set the path below.
 *   3. Done. No component edits, no reflow.
 * ---------------------------------------------------------------------------
 */

export const assets = {
  /**
   * Hero face illustration living inside the word PORTFOLIO.
   *
   * `layers` is the preferred hand-off: export the illustration as four
   * transparent PNG/SVGs sharing ONE canvas (same width/height, nothing
   * re-cropped) and the blink / smile / eye-dart rig drives them directly.
   *
   *   base   — head, hair, brows, nose, beard. Everything that never moves.
   *   eyes   — the eye whites + irises only.
   *   lids   — the eyelid shape used for the blink (drawn over `eyes`).
   *   mouth  — neutral mouth only; the smile is a transform of this layer.
   *
   * `flat` is the fallback: a single image. It renders perfectly but can only
   * breathe (micro parallax + drift) — it cannot blink.
   */
  heroFace: {
    flat: '/assets/hero-face.png' as string | null,
    layers: null as { base: string; eyes: string; lids: string; mouth: string } | null,
  },

  /**
   * Section 02, left frame.
   *
   * A video wins over a still; the frame's geometry comes from tokens.ts
   * either way, so swapping between them moves nothing on the page. To change
   * the artwork later, change `video` (and regenerate `poster` from its first
   * frame) — nothing else on the site refers to the file.
   *
   * The current plate matches the 144 : 335 aspect ratio with a soft vignette
   * fade at the base so it dissolves directly into the page stock.
   */
  frame: {
    video: null as string | null,
    poster: null as string | null,
    image: '/assets/about-debayan-cropped.webp' as string | null,
    fit: 'cover' as 'cover' | 'contain',
    /** Cropped to 144:335 (660×1536) — matches frame, so cover fills without stretch/crop of figure. */
    position: '50% 50%',
    /**
     * Transparent WebP already carries alpha — no luminance key needed.
     * Paper ruling shows directly behind the figure.
     */
    key: null as { low: number; high: number } | null,
  },

  /**
   * Cut-out bust for the black strip, standing in front of the moving type.
   *
   * Supply a transparent PNG — the surroundings must be transparent, not
   * white, or the letters will be covered by a rectangle instead of passing
   * behind the body.
   *
   * `sticker` generates the reference's red die-cut edge from the image's own
   * alpha. Turn it off if the artwork you supply already carries its own
   * outline or red treatment, so it does not get a second one.
   */
  nameCutout: {
    src: '/assets/name-cutout.webp' as string | null,
    /**
     * The asset's own pixel size, so the box is reserved before the file
     * arrives.
     */
    width: 1080,
    height: 1160,
    sticker: true,
  },

  /**
   * Small round avatar inside the floating contact note.
   *
   * Cropped from the same studio portrait the section-03 cut-out came from —
   * head centred, a little wider than the skull so the face still reads at
   * 48px. The original backdrop is kept rather than the transparent cut-out:
   * inside a 48px circle a floating head on a beige disc reads as a mistake,
   * a photograph reads as a photograph.
   */
  avatar: '/assets/avatar.webp' as string | null,

  /**
   * THE STU — three photographs, left to right. Drop files into
   * /public/assets/projects/ and list them here.
   *
   * The Polaroid geometry is fixed by the card, not by the image: 1.24
   * landscape, cropped with object-fit: cover. Nudge `objectPosition` in
   * site.studio.items if a subject sits off centre.
   */
  studio: [
    '/assets/Sdesk.png',
    '/assets/serviceops.png',
    '/assets/Garuda.png',
    '/assets/Drsuranjana-site.png',
    '/assets/Stock.png',
    '/assets/Danceacademy-web.png',
    '/assets/Zerotheorys.png',
    '/assets/urban-assist.png',
    '/assets/Seple-KB.png',
  ] as (string | null)[],

  /**
   * Signature graphic for the footer — the designer signing the last page.
   * Until it arrives, the name is set in the hand font with a red tick, so
   * the page is already signed and the slot already has its place.
   */
  signature: null as string | null,
} as const
