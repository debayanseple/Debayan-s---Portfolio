/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT
 * ---------------------------------------------------------------------------
 * Every piece of copy on the site lives here. Change text without touching a
 * single component. Layout is driven by geometry (see `tokens.ts`), never by
 * the length of the content that happens to be sitting in it today.
 * ---------------------------------------------------------------------------
 */

export const site = {
  /** Shown letter-by-letter in the hero. Keep it short — it is the poster. */
  displayWord: 'PORTFOLIO',
  /** Index of the character in `displayWord` that the face illustration replaces. */
  faceLetterIndex: 5, // P-O-R-T-F-[O]-L-I-O

  eyebrow: 'UI/UX designer &\nFrontend Developer',
  year: '2026',

  firstName: 'DEBAYAN',
  /**
   * The signature form the hero reveals as the visitor starts scrolling —
   * deliberately separate from `firstName`, which the introduction, the poster
   * and the contact note all use.
   */
  signatureName: 'DEBAYAN CHAKRABORTY',
  /** Leave empty until a surname is supplied — the black strip adapts either way. */
  lastName: 'CHAKRABORTY',

  /**
   * An invitation, not a job application. "Available to talk" rather than
   * "available for hire" is the whole difference between a personal site and
   * a job board, and it is carried by four words.
   */
  connect: {
    status: 'is available to talk',
    cta: "Let's connect",
    /** Points at the CONTACT section. Swap for a mailto: if you prefer. */
    href: '#contact',
  },

  intro: {
    heading: 'HELLO',
    lede: "Hi, I'm DEBAYAN — UI/UX Designer & Frontend Developer.",
    paragraphs: [
      'UI/UX Designer & Frontend Developer with 2+ years of hands-on experience designing and building production-grade web applications, Deluge scripts, analytics dashboards and responsive websites.',
      'I have published 4 live Android/iOS applications on the Google Play Store, built natively with Zoho Creator, and delivered end-to-end integrations across the Zoho ecosystem — including Zoho Books, Desk, Flow, RPA, Catalyst, WorkDrive and Knowledge Base.',
      'My work focuses on UI/UX, frontend development, API integrations and analytics — connecting business operations into unified workflows that have helped reduce operational overhead by ~40%. Based in Kolkata, India.',
    ],
  },

  education: {
    heading: 'EDUCATION',
    items: [
      {
        degree: 'B.Tech — Electrical, Electronics & Communications Engineering',
        detail: 'Swami Vivekananda Institute of Science and Technology, Kolkata | 2018 – 2022',
      },
    ],
  },

  skills: {
    heading: 'SKILLS',
    /**
     * Three columns, two rows — 6 icons as supplied.
     * Files carry their own background; no recolour or invented container.
     */
    items: [
      { label: 'Figma', short: 'Fg', src: '/assets/FIGMA-ICON.png', scale: 1 },
      { label: 'Photoshop', short: 'Ps', src: '/assets/photoshop-new.png', scale: 1 },
      { label: 'Canva', short: 'Ca', src: '/assets/canva.webp', scale: 1 },
      { label: 'Illustrator', short: 'Ai', src: '/assets/illustrator.webp', scale: 1 },
      { label: 'Zoho', short: 'Zo', src: '/assets/zoho-icon.jpg', scale: 1 },
      { label: 'React', short: 'Re', src: '/assets/react-3d.webp', scale: 1 },
    ] as { label: string; short: string; src: string | null; scale: number }[],
  },

  /**
   * Selected Work — repurposed from THE STU. Every angle, drop, shadow weight
   * and slant is a value here rather than a random seed, because randomness
   * reads as a bug and a decision reads as a hand. Rotations follow the
   * brief: -5 / +1.2 / +4.
   */
  studio: {
    heading: 'PROJECTS',
    items: [
      {
        slug: 'sdesk-360',
        title: 'SDesk 360',
        quote: 'SDesk 360 — IoT-enabled auto-ticketing portal for connected devices.',
        author: 'Zoho Creator • Deluge • IoT — Live on Play Store',
        rotation: -5,
        drop: 0,
        shade: 0.2,
        skew: -0.9,
        indent: 1,
        objectPosition: '50% 50%',
        href: '/projects/sdesk-360' as string | null,
        tech: ['Zoho Creator', 'Deluge Script', 'IoT', 'REST APIs'],
        status: 'Live on Google Play Store',
        summary:
          'An IoT-enabled auto-ticketing portal that automatically creates and manages service tickets from connected devices. Built natively with Zoho Creator and Deluge for SEPLE.',
        features: [
          'Auto-ticketing from IoT telemetry (ThingsBoard → Creator)',
          'Approval chains & multi-condition Deluge workflows',
          'Role-based assignment for service engineers',
          'Published on Play Store & App Store',
        ],
        live: 'https://play.google.com/store/apps/details?id=com.seple.desk',
      },
      {
        slug: 'service-ops-2',
        title: 'Service Ops 2.0',
        quote: 'Service Ops 2.0 — Complaint & AMC management for service operations.',
        author: 'Zoho Creator • Deluge • Analytics — Live on Play Store',
        rotation: 1.2,
        drop: 11,
        shade: 0.6,
        skew: 0.7,
        indent: 0,
        objectPosition: '56% 38%',
        href: '/projects/service-ops-2' as string | null,
        tech: ['Zoho Creator', 'Deluge Script', 'Zoho Analytics'],
        status: 'Live on Google Play Store',
        summary:
          'Complaint and AMC management application for service engineers and operations teams — centralising service lifecycle and reporting.',
        features: [
          'Complaint & AMC lifecycle management',
          'Engineer dispatch & SLA tracking',
          'Embedded Zoho Analytics dashboards',
          'Filtered & hierarchy-based views',
        ],
      },
      {
        slug: 'garuda-fleet',
        title: 'Garuda — Fleet Management',
        quote: 'Garuda — Fleet management with location tracking for company vehicles.',
        author: 'Zoho Creator • Deluge — Live on Play Store',
        rotation: 4,
        drop: 3,
        shade: 0.35,
        skew: -0.5,
        indent: 2,
        objectPosition: '50% 50%',
        href: '/projects/garuda-fleet' as string | null,
        tech: ['Zoho Creator', 'Deluge Script', 'Location Tracking'],
        status: 'Live on Google Play Store',
        summary:
          'Fleet management application for managing company vehicles and supporting real-time location tracking for SEPLE logistics.',
        features: [
          'Vehicle registry & assignment',
          'Location tracking integration',
          'Maintenance & fuel logs',
          'Operations dashboard',
        ],
      },
      {
        slug: 'dr-suranjana-roy',
        title: 'Dr. Suranjana Roy — Clinic Portfolio',
        quote: 'Dr. Suranjana Roy — Oral & Maxillofacial Surgeon portfolio.',
        author: 'TanStack Start • React 19 • Tailwind v4',
        rotation: -3,
        drop: 2,
        shade: 0.25,
        skew: 0.6,
        indent: 0,
        objectPosition: '50% 50%',
        href: '/projects/dr-suranjana-roy' as string | null,
        tech: ['TanStack Start', 'React 19', 'Tailwind v4', 'Radix UI', 'Zod', 'Vite'],
        status: 'Live — dr-suranajana-roy.vercel.app',
        summary:
          'Modern, responsive portfolio and clinic website for Dr. Suranjana Roy, MDS — Oral & Maxillofacial Surgeon (Siliguri & Kolkata). Presents services, academic work, case studies and online appointment requests.',
        features: [
          'Landing — hero, services, about/education, publications, contact',
          'Case studies listing + detail pages (/case-studies/:slug)',
          'Book appointment form → Google Apps Script webhook (server-only)',
          'SEO-ready per-route title/meta + accessible Radix UI',
        ],
        github: 'https://github.com/debayanseple/Dr-Suranajana-Roy-.git',
        live: 'https://dr-suranajana-roy.vercel.app',
      },
      {
        slug: 'stock-tracker',
        title: 'Stock — Portfolio Tracker',
        quote: 'Stock — Real-time portfolio & barcode scanning.',
        author: 'TanStack Start • Supabase • Recharts',
        rotation: 2,
        drop: 9,
        shade: 0.45,
        skew: -0.7,
        indent: 1,
        objectPosition: '50% 50%',
        href: '/projects/stock-tracker' as string | null,
        tech: ['TanStack Start', 'Supabase', 'Recharts', 'ZXing', 'Tailwind v4'],
        status: 'Live — stockline-one.vercel.app',
        summary:
          'Stock portfolio tracker built with TanStack Start + Supabase — real-time data, charts and barcode scanning for inventory management.',
        features: [
          'Supabase auth, storage & real-time queries',
          'Recharts portfolio analytics & embla carousel',
          'Barcode scanning via @zxing/browser',
          'Radix UI + Tailwind v4 responsive system',
        ],
        github: 'https://github.com/debayanseple/Stock.git',
        live: 'https://stockline-one.vercel.app',
      },
      {
        slug: 'nritique-website',
        title: 'Nritique — Website',
        quote: 'Nritique — Fashion & lifestyle brand website.',
        author: 'TanStack Start • Framer Motion • Tailwind',
        rotation: -1.5,
        drop: 4,
        shade: 0.3,
        skew: 0.4,
        indent: 2,
        objectPosition: '50% 50%',
        href: '/projects/nritique-website' as string | null,
        tech: ['TanStack Start', 'Framer Motion', 'Tailwind v4', 'Radix UI'],
        status: 'Live — nritique-website.vercel.app',
        summary:
          'Brand website for Nritique — fashion & lifestyle — with motion-rich landing, Vite + TanStack Start and Framer Motion interactions.',
        features: [
          'Responsive hero & collection grids',
          'Framer Motion scroll & hover interactions',
          'Google Apps Script integrations (copy-functions, webhooks)',
          'Deployed on Netlify/Vercel with Vite build',
        ],
        github: 'https://github.com/debayanseple/Nritique---Website.git',
        live: 'https://nritique-website.vercel.app',
      },
      {
        slug: 'zerotheorys',
        title: 'Zero Theorys — 3D Digital Agency',
        quote: 'Zero Theorys — Glassmorphism, neon & 3D carousel.',
        author: 'Lovable • Three.js • Tailwind • React',
        rotation: 3.2,
        drop: 6,
        shade: 0.5,
        skew: -0.6,
        indent: 0,
        objectPosition: '50% 50%',
        href: '/projects/zerotheorys' as string | null,
        tech: ['Lovable', 'Three.js / Spline', 'React', 'Tailwind', 'Framer Motion'],
        status: 'Live — zerotheorys.lovable.app',
        summary:
          'Interactive 3D showcase for digital agency “Zero Theorys” — Apple-esque sleek dark obsidian theme, neon gradients, glassmorphism cards and morphing geometric shapes.',
        features: [
          'Hero with rotating torus/liquid-metal blobs + parallax',
          'Services carousel — holographic code, wireframe-to-UI, social nodes, palette',
          'Frosted-glass cards with hover scale + glow',
          'Optimized low-poly Three.js + silky scroll physics',
        ],
        github: 'https://github.com/debayanseple/zerotheorys.git',
        live: 'https://zerotheorys.lovable.app',
      },
      {
        slug: 'urban-assist',
        title: 'Urban Assist — UK Home Services Marketplace',
        quote: 'Urban Assist — UK home services marketplace for vetted professionals.',
        author: 'Next.js 14 • Supabase • Stripe • pnpm Monorepo',
        rotation: -2.4,
        drop: 8,
        shade: 0.42,
        skew: 0.5,
        indent: 1,
        objectPosition: '50% 50%',
        href: '/projects/urban-assist' as string | null,
        tech: ['Next.js 14', 'Supabase', 'Stripe', 'Upstash Redis', 'Firebase FCM', 'Tailwind', 'TypeScript'],
        status: 'Open source — github.com/Itinerant18/Urban-assist',
        summary:
          'UK home services marketplace connecting customers with vetted professionals — 3 apps (customer, provider, admin) in a pnpm monorepo with live booking, Stripe payments, Supabase Realtime and KYC.',
        features: [
          'Customer / Provider / Admin apps (3000/3001/3002) sharing @urban-assist/* packages',
          'Supabase Auth + RLS + Realtime for live booking status',
          'Stripe payments & webhooks with payout scaffolding',
          'KYC, matching engine & admin review queue',
        ],
        github: 'https://github.com/Itinerant18/Urban-assist.git',
      },
      {
        slug: 'seple-kb',
        title: 'SEPLE NovaEdge — Knowledge Base',
        quote: 'SEPLE NovaEdge — Technical documentation & knowledge base.',
        author: 'SEPLE • Zoho • Knowledge Base — Live on seplenovaedge.com',
        rotation: 1.8,
        drop: 3,
        shade: 0.38,
        skew: -0.4,
        indent: 0,
        objectPosition: '50% 50%',
        href: '/projects/seple-kb' as string | null,
        tech: ['Zoho Creator', 'Zoho Knowledge Base', 'Deluge Script', 'WorkDrive'],
        status: 'Live — seplenovaedge.com/kb',
        summary:
          'Technical documentation and knowledge base portal for SEPLE NovaEdge — centralising wiring diagrams, configuration guides and manuals for every Dexter, Hestia and Jarvis deployment.',
        features: [
          'Searchable KB with wiring diagrams & manuals per deployment',
          'Filtered collections for Dexter / Hestia / Jarvis families',
          'Zoho Knowledge Base + WorkDrive asset management',
          'Live at seplenovaedge.com/kb',
        ],
        live: 'https://www.seplenovaedge.com/kb',
      },
    ],
  },

  experience: {
    heading: 'EXPERIENCE',
    items: [
      { period: 'Apr 2024 – Present', role: 'UI/UX Designer & Frontend Developer', company: 'Security Engineers Pvt. Ltd. (SEPLE) — Kolkata' },
      { period: 'Sep 2022 – Mar 2024', role: 'Frontend Developer', company: 'ManpowerGroup India — Kolkata' },
      { period: 'Feb 2022 – Sep 2022', role: 'Python Developer — Internship', company: 'Aiinhomes — Kolkata' },
    ],
  },

  /**
   * The last page. The giant heading IS the button — there is no separate
   * rectangular CTA, the typography is the interface.
   *
   * `href: null` means the CTA acknowledges the click (the heading flips to
   * `acknowledged` for a beat) but goes nowhere yet. Set a mailto:, a Calendly
   * URL, or a contact route and it becomes a real link with the same
   * behaviour. Same rule for the social row: null renders as a muted label
   * holding the composition; a real URL turns it into a link. No invented
   * destinations.
   */
  footer: {
    heading: "Let's connect",
    acknowledged: 'See you there',
    sub: 'Have an idea, a project, or simply want to say hello? Based in Kolkata — available for UI/UX & Frontend work.',
    /** The ask goes to the inbox. Swap for a Calendly or contact route later. */
    href: 'mailto:deepchakraborty431@gmail.com',
    marquee: ['DEBAYAN', 'DESIGNER', 'DEVELOPER'],
    /**
     * URLs are the canonical profile paths — `null` renders as a muted label
     * rather than a link, so add LinkedIn/Portfolio URL the moment you have one
     * and it lights up on its own. No invented destinations.
     */
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/debayan-chakraborty-developer' as string | null },
      { label: 'Portfolio', href: null as string | null },
      { label: 'Email', href: 'mailto:deepchakraborty431@gmail.com' as string | null },
      { label: '+91 8001316145', href: 'tel:+918001316145' as string | null },
    ],
  },
} as const

export type Site = typeof site
