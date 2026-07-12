const PROJECTS = {
  inninginsights: {
    eyebrow: 'Full-stack + ML pipeline',
    title: 'InningInsights',
    body: [
      'InningInsights predicts IPL match scores and winners, with the ML model wired directly into a live product instead of staying in a notebook.',
      'The Next.js frontend handles JWT-authenticated sessions and renders match stats as they update. Backend REST APIs call into a Python inference service; everything runs in Docker containers behind a CI/CD pipeline so deploys stay predictable rather than manual.',
    ],
    highlights: [
      '70%+ prediction accuracy on held-out IPL match data',
      'JWT-authenticated real-time frontend with live match stats',
      'Dockerized services behind an automated CI/CD pipeline',
    ],
    tags: ['Next.js', 'Node.js', 'Python (ML)', 'PostgreSQL', 'Docker'],
    links: [{ label: 'Launching Soon', href: '#' }],
  },
  'college-dms': {
    eyebrow: 'Enterprise system',
    title: 'College Data Management System',
    body: [
      'Built during the Software Developer internship at Sterco Digitex: a .NET + MS SQL Server system managing 1,000+ students\' records end to end.',
      'The schema was designed from scratch with referential integrity and normalization in mind, backing full CRUD for attendance, courses, grades, and admin records. Role-based access control (Admin, Faculty, Student) sits on top of an MVC architecture, and a pass of query optimization — rewrites and targeted indexing — cut average response time by roughly 15%.',
    ],
    highlights: [
      '~15% average SQL response-time reduction via query rewrites and indexing',
      'Role-based access control across Admin, Faculty, and Student roles',
      'Full CRUD for attendance, courses, grades, and admin records',
    ],
    tags: ['C# / .NET', 'MS SQL Server', 'MVC', 'RBAC'],
    links: [{ label: 'Write-up', href: 'https://medium.com/@darkabsoul0/from-zero-to-crud-hero-how-i-built-a-full-blown-college-management-system-in-3-months-b8c8f69ed9ea' }],
  },
  readerreviews: {
    eyebrow: 'MERN application',
    title: 'ReaderReviews Hub',
    body: [
      'A MERN stack application for managing book reviews at scale — over 1,000 reviews with real user engagement behind them.',
      'Authentication runs on JWT with BcryptJS password hashing. On top of that sit high-performance REST APIs handling automated rating aggregation and pagination, built to keep response times steady as the review count keeps growing.',
    ],
    highlights: [
      'JWT + BcryptJS secure authentication',
      'Automated rating aggregation with pagination',
      'REST APIs built for growing user data',
    ],
    tags: ['MongoDB', 'Express.js', 'React', 'JWT'],
    links: [
      { label: 'Repository', href: 'https://github.com/yashahuja31/ReaderReviews' },
      { label: 'Live', href: 'https://reader-reviews.vercel.app/' },
    ],
  },
  chessy: {
    eyebrow: 'Real-time multiplayer',
    title: 'Chessy',
    body: [
      'A real-time multiplayer chess app — live gameplay over Socket.io, with an integrated Stockfish engine for in-depth position analysis after (or during) a game.',
      'Move validation and game-state synchronization run through chess.js, keeping both players\' boards consistent under real-time updates. The UI is fully responsive, built with Tailwind CSS.',
    ],
    highlights: [
      'Live multiplayer gameplay via Socket.io',
      'Stockfish engine integration for game analysis',
      'Move validation & state sync via chess.js',
    ],
    tags: ['Socket.io', 'chess.js', 'Stockfish.js', 'Tailwind CSS'],
    links: [
      { label: 'Repository', href: 'https://github.com/yashahuja31/Chessy' }, 
      { label: 'Live', href: 'https://chessy.vercel.app/' }
    ],
  },
  pathwave: {
    eyebrow: 'Study-abroad platform',
    title: 'PathWave International',
    body: [
      'PathWave International is a React site guiding Indian students through studying abroad — destination breakdowns, a blog, and a consultation/feedback flow.',
      'There\'s no traditional backend: form submissions post straight to a Google Sheet through a Google Apps Script Web App endpoint. It also ships a demo student portal behind protected routes with its own auth context, a scroll-driven ticker of partner universities, a star-rating widget for feedback, and page transitions run through Framer Motion.',
    ],
    highlights: [
      'Consultation & feedback forms piping into Google Sheets via Apps Script — no server required',
      'Protected-route student portal with its own auth context',
      'Framer Motion page transitions and a scroll-driven university ticker',
    ],
    tags: ['React', 'React Router', 'Framer Motion', 'Google Sheets API'],
    links: [
      { label: 'Repository', href: 'https://github.com/yashahuja31/Pathwave' },
      { label: 'Live', href: 'https://www.pathwaveinternational.com/' },
    ],
  },
  sitetalk: {
    eyebrow: 'Browser extension',
    title: 'SiteTalk',
    body: [
      'SiteTalk is a Chrome extension that turns any website into a live chat room for whoever\'s currently on it — a floating, draggable popup layered on top of the page itself.',
      'Messages are text or voice, timestamped, and synced in real time between everyone on that same site. The last 50 messages per site are stored, so a new visitor drops into an existing conversation instead of a blank room. An optional Node.js server handles the sync layer, and the extension itself asks for minimal permissions — just storage and the active tab — to keep it privacy-conscious.',
    ],
    highlights: [
      'Floating, draggable, per-site chat popup layered over any website',
      'Text + voice messages, timestamped and synced in real time',
      'Last 50 messages stored per site for conversation history',
      'Minimal permissions (storage, activeTab) for a privacy-conscious extension',
    ],
    tags: ['Chrome Extension', 'JavaScript', 'Chrome Storage API', 'Node.js (sync server)'],
    links: [
      { label: 'Repository', href: 'https://github.com/yashahuja31/SiteTalk' },
      { label: 'Live', href: 'https://site-talk.vercel.app/' }
    ],
  },
  stockai: {
    eyebrow: 'ML trading system · In testing',
    title: 'StockAI',
    body: [
      'StockAI is built around one principle: don\'t overfit, don\'t cheat. Most retail algorithmic trading systems fail because they backtest with look-ahead bias — using future data to predict the past — or because they overfit a single model to historical patterns that stop holding once the market regime shifts.',
      'This system is built to close both gaps: a chronological train/validation/test split so the model never sees future data, a 4-model ensemble (XGBoost, LightGBM, CatBoost, and an LSTM) so no single model\'s blind spots dominate, and ensemble weights tuned on the validation set with Nelder-Mead optimization rather than hardcoded. Backtesting runs walk-forward with real commission and slippage simulation, a circuit breaker halts trading if a max-drawdown threshold is breached, and the feature set spans 80+ signals across trend, momentum, volatility, volume, candlestick patterns, and market structure.',
      'It\'s deliberately honest about its limits: it doesn\'t guarantee profit — no model can, markets are partly random — and past performance doesn\'t imply future results, since market regimes change. A realistic accuracy band on Indian equities and crypto daily bars is 60–75%; the edge is meant to come from risk management, not raw predictive accuracy. Currently in testing, not deployed with real capital.',
    ],
    highlights: [
      'Chronological train/val/test split — no look-ahead bias',
      '4-model ensemble (XGBoost, LightGBM, CatBoost, LSTM) with Nelder-Mead-optimized weights',
      'Walk-forward backtesting with real commission + slippage simulation',
      'Circuit breaker on max drawdown; 80+ features across trend, momentum, volatility, volume, and market structure',
    ],
    tags: ['XGBoost', 'LightGBM', 'CatBoost', 'LSTM', 'Nelder-Mead'],
    links: [{ label: 'Launching Soon', href: '#' }],
    shiftwork: {
  eyebrow: 'Branching career simulator',
  title: 'ShiftWork',
  body: [
    'ShiftWork is a branching, stat-driven career simulator — twelve fully playable careers, from trauma surgeon to astronaut to software engineer, sharing one engine built from JSON scene graphs rather than one-off code per career.',
    'The standout piece is the animated character: a hand-built SVG figure animated with Framer Motion whose posture, expression, and pace shift with a mood computed live from stress, energy, and reputation, plus a pulsing tension ring during each career\'s signature decision. Every scene also gets its own small animated vignette — a car driving past sliding road markings, a pulsing ECG line, a rotating gear — rather than a static icon.',
    'The compatibility score went through two failed versions before landing: an early continuous formula never dropped below the mid-50s even on the worst play, and a five-tier version still put 93% of random playthroughs in the top two tiers. The fix was per-career percentile calibration — 20,000 simulated random runs per career establish the baseline, and the score is literally a percentile rank against it, verified to land a mean and median of exactly 50.',
  ],
  highlights: [
    '12 fully playable careers (~15–19 scenes each) sharing one JSON-driven engine',
    'Hand-built animated SVG character — mood, posture, and a tension glow react live to your stats',
    'Compatibility score calibrated against 20,000 simulated playthroughs per career, not a fixed formula',
    'Server-side replay scoring — the server re-simulates your decisions rather than trusting a client-submitted score',
  ],
  tags: ['Next.js', 'TypeScript', 'Prisma', 'Clerk', 'Framer Motion'],
  links: [
    { label: 'Repository', href: 'https://github.com/yashahuja31/ShiftWork' },
    { label: 'Live', href: 'https://shift-your-career.vercel.app/' },
  ],
},
optivault: {
  eyebrow: 'Cloud cost optimizer',
  title: 'OptiVault',
  body: [
    'OptiVault is an AI-driven cost optimizer for AWS S3 storage: it connects to a customer\'s account with read-only access, scans object metadata, and looks for the usual ways cloud storage costs quietly bloat — duplicate files, data that\'s gone stale, objects parked in the wrong storage tier for how they\'re actually accessed.',
    'The core design choice is that nothing executes automatically. Every optimization it finds is proposed to the customer first, who reviews and explicitly approves before any action runs — and the system never reads or stores file contents at any point, only metadata, so the trust boundary stays as narrow as the read-only S3 connection itself.',
  ],
  highlights: [
    'Read-only AWS S3 connection — access can\'t be widened by this system',
    'Detects duplicate files, stale data, and objects in the wrong storage tier',
    'Every action is proposed and requires explicit customer approval before it executes',
    'Scans object metadata only — file contents are never read or stored',
  ],
  tags: ['AWS S3', 'Read-only Access', 'Metadata Scanning', 'Cost Optimization'],
  links: [{ label: 'Launching Soon', href: '#' }],
},
  },
};

export function initProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const box = modal.querySelector('.project-modal__box');
  const closeBtn = document.getElementById('project-modal-close');
  const elEyebrow = document.getElementById('modal-eyebrow');
  const elTitle = document.getElementById('modal-title');
  const elBody = document.getElementById('modal-body');
  const elHighlights = document.getElementById('modal-highlights');
  const elTags = document.getElementById('modal-tags');
  const elLinks = document.getElementById('modal-links');

  let lastFocused = null;

  function open(id) {
    const data = PROJECTS[id];
    if (!data) return;

    elEyebrow.textContent = data.eyebrow;
    elTitle.textContent = data.title;
    elBody.innerHTML = data.body.map((p) => `<p>${p}</p>`).join('');
    elHighlights.innerHTML = data.highlights.map((h) => `<li>${h}</li>`).join('');
    elTags.innerHTML = data.tags.map((t) => `<li>${t}</li>`).join('');
    elLinks.innerHTML = data.links.map((l) => {
      const external = l.href.startsWith('http');
      return `<a href="${l.href}" class="btn btn--ghost"${external ? ' target="_blank" rel="noopener"' : ''}>${l.label}</a>`;
    }).join('');

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    closeBtn.focus();
    document.dispatchEvent(new CustomEvent('sfx', { detail: 'open' }));
  }

  function close() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    const done = () => { modal.hidden = true; };
    setTimeout(done, 250);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    document.dispatchEvent(new CustomEvent('sfx', { detail: 'close' }));
  }

  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.addEventListener('click', () => open(card.dataset.project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(card.dataset.project);
      }
    });
  });

  // clicking anywhere outside the box (i.e. directly on the overlay) closes it
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  box.addEventListener('click', (e) => e.stopPropagation());

  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}
