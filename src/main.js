import './styles.css';

const features = [
  {
    title: 'Release Velocity',
    value: '12 deployments / week',
    note: '2 above target based on the last 30 days.'
  },
  {
    title: 'Incident Escape Rate',
    value: '0.8%',
    note: 'Down from 1.4% after rollout gates were added.'
  },
  {
    title: 'Rollback Readiness',
    value: '98% automated',
    note: 'Only one service still requires manual fallback.'
  }
];

const metricRail = [
  {
    label: 'Active rollout',
    value: '3 services',
    detail: 'Wave 2 of 4 is currently in production.'
  },
  {
    label: 'Blockers',
    value: '2 open',
    detail: 'Security sign-off and data migration review.'
  },
  {
    label: 'Approval ETA',
    value: '42 min',
    detail: 'Median based on the last 10 production releases.'
  }
];

const cards = features
  .map(
    (feature) => `
      <article class="feature-card">
        <h3>${feature.title}</h3>
        <p class="feature-value">${feature.value}</p>
        <p class="feature-note">${feature.note}</p>
      </article>
    `
  )
  .join('');

const railItems = metricRail
  .map(
    (metric) => `
      <article class="metric-rail-item">
        <p class="metric-label">${metric.label}</p>
        <p class="metric-value">${metric.value}</p>
        <p class="metric-detail">${metric.detail}</p>
      </article>
    `
  )
  .join('');

const releaseNotesHighlights = [
  'Improved staged rollout controls with service-level pause and resume actions.',
  'Added reviewer contact chips so incident responders can route faster.',
  'Expanded rollback readiness coverage to 98% of production services.'
];

const releaseNotesItems = releaseNotesHighlights
  .map((note) => `<li>${note}</li>`)
  .join('');

document.querySelector('#app').innerHTML = `
  <main class="dashboard" aria-label="Release dashboard">
    <section class="hero">
      <p class="badge">Release Center</p>
      <h1>Ship Faster Without Losing Confidence</h1>
      <p class="hero-copy">
        Monitor deployment cadence, risk signals, and rollback posture in one compact view for engineering and product leaders.
      </p>
      <div class="hero-stats" role="list" aria-label="Release stats">
        <p role="listitem"><span>34</span> Active services</p>
        <p role="listitem"><span>99.95%</span> Uptime this month</p>
        <p role="listitem"><span>7 min</span> Mean deploy time</p>
      </div>
    </section>

    <section class="metric-rail" aria-label="Production rollout metrics">
      ${railItems}
    </section>

    <section class="status-strip" aria-label="Deployment status overview">
      <p><span>Environment</span> Production</p>
      <p><span>Release Stage</span> Stabilization</p>
      <p><span>Deploy Owner</span> Platform Team</p>
    </section>

    <section class="feature-grid" aria-label="Core release metrics">
      ${cards}
    </section>

    <section class="support-handoff" aria-label="Support handoff note">
      <p><span>Support handoff</span> Owner: Release Operations (Jordan Lee, on-call)</p>
      <p><span>Escalation</span> Page <strong>#release-control</strong> in PagerDuty for Sev-1 or no owner acknowledgement within 15 minutes.</p>
    </section>

    <footer class="footer">
      <p>Release Dashboard</p>
      <p class="footer-meta">
        Updated every 5 minutes
        <span class="owner-chip" aria-label="Release owner">Jordan Lee</span>
        <span class="release-notes-badge" aria-label="Release notes status">Release notes: Ready</span>
        <a
          class="reviewer-contact-chip"
          href="mailto:release-reviewers@acme.dev"
          aria-label="Reviewer contact"
        >
          Reviewer: release-reviewers@acme.dev
        </a>
        <button
          type="button"
          class="release-notes-action"
          aria-haspopup="dialog"
          aria-controls="release-notes-drawer"
        >
          Release notes
        </button>
      </p>
    </footer>

    <div class="release-notes-overlay" data-overlay hidden></div>
    <aside
      id="release-notes-drawer"
      class="release-notes-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="release-notes-title"
      hidden
    >
      <header class="release-notes-header">
        <h2 id="release-notes-title">Release Notes</h2>
        <button type="button" class="release-notes-close" data-close aria-label="Close release notes">
          Close
        </button>
      </header>
      <p class="release-notes-summary">
        Current release notes are ready for stakeholder review.
      </p>
      <ul class="release-notes-list">
        ${releaseNotesItems}
      </ul>
    </aside>
  </main>
`;

const releaseNotesAction = document.querySelector('.release-notes-action');
const releaseNotesDrawer = document.querySelector('#release-notes-drawer');
const releaseNotesOverlay = document.querySelector('[data-overlay]');
const releaseNotesClose = document.querySelector('[data-close]');

const openReleaseNotes = () => {
  releaseNotesDrawer.hidden = false;
  releaseNotesOverlay.hidden = false;
  document.body.classList.add('drawer-open');
  releaseNotesAction.setAttribute('aria-expanded', 'true');
  window.requestAnimationFrame(() => {
    releaseNotesDrawer.classList.add('is-open');
  });
};

const closeReleaseNotes = () => {
  releaseNotesDrawer.classList.remove('is-open');
  releaseNotesOverlay.hidden = true;
  document.body.classList.remove('drawer-open');
  releaseNotesAction.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => {
    releaseNotesDrawer.hidden = true;
  }, 220);
};

releaseNotesAction.setAttribute('aria-expanded', 'false');
releaseNotesAction.addEventListener('click', openReleaseNotes);
releaseNotesClose.addEventListener('click', closeReleaseNotes);
releaseNotesOverlay.addEventListener('click', closeReleaseNotes);
