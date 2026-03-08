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

const releaseHealth = [
  {
    label: 'Stability',
    value: 'Healthy',
    tone: 'good'
  },
  {
    label: 'Rollout',
    value: 'Wave 2/4',
    tone: 'info'
  },
  {
    label: 'Issues',
    value: '2 Open',
    tone: 'warning'
  }
];

const releasePulse = [
  {
    lane: 'API',
    status: 'Stable',
    note: 'Error rate below 0.2% for the last 30 minutes.'
  },
  {
    lane: 'Web',
    status: 'Watching',
    note: 'Core flow latency rose 5% after the latest canary.'
  },
  {
    lane: 'Worker',
    status: 'Ready',
    note: 'Backfill queue is drained and rollback snapshot is verified.'
  }
];

const operatorReadiness = [
  {
    label: 'Runbook',
    status: 'Updated'
  },
  {
    label: 'On-call handoff',
    status: 'Acknowledged'
  },
  {
    label: 'Rollback drill',
    status: 'Passed'
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

const releaseHealthChips = releaseHealth
  .map(
    (item) => `
      <li class="release-health-chip release-health-chip--${item.tone}">
        <span>${item.label}</span>
        ${item.value}
      </li>
    `
  )
  .join('');

const pulseItems = releasePulse
  .map(
    (item) => `
      <li class="release-pulse-item">
        <p class="release-pulse-lane">${item.lane}</p>
        <p class="release-pulse-status">${item.status}</p>
        <p class="release-pulse-note">${item.note}</p>
      </li>
    `
  )
  .join('');

const readinessItems = operatorReadiness
  .map(
    (item) => `
      <li class="operator-readiness-item">
        <span>${item.label}</span>
        ${item.status}
      </li>
    `
  )
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

    <section class="release-pulse-banner" aria-label="Release pulse">
      <div class="release-pulse-header">
        <p class="release-pulse-badge">Release Pulse</p>
        <p class="release-pulse-timestamp">Updated 2 minutes ago</p>
      </div>
      <p class="release-pulse-summary">
        Canary traffic is expanding from 35% to 50% while rollback checkpoints remain green.
      </p>
      <ul class="release-pulse-list">
        ${pulseItems}
      </ul>
    </section>

    <section class="release-health-strip" aria-label="Release health summary">
      <p class="release-health-title">Release health</p>
      <ul class="release-health-list">
        ${releaseHealthChips}
      </ul>
    </section>

    <section class="status-strip" aria-label="Deployment status overview">
      <p><span>Environment</span> Production</p>
      <p><span>Release Stage</span> Stabilization</p>
      <p><span>Deploy Owner</span> Platform Team</p>
    </section>

    <section class="feature-grid" aria-label="Core release metrics">
      ${cards}
    </section>

    <section class="operator-readiness" aria-label="Operator readiness block">
      <p class="operator-readiness-title">Task detail operator readiness</p>
      <p class="operator-readiness-summary">
        Primary operator is confirmed for launch window with rollback ownership and escalation contacts active.
      </p>
      <ul class="operator-readiness-list">
        ${readinessItems}
      </ul>
    </section>

    <section class="support-handoff" aria-label="Support handoff note">
      <p><span>Support handoff</span> Owner: Release Operations (Jordan Lee, on-call)</p>
      <p><span>Escalation</span> Page <strong>#release-control</strong> in PagerDuty for Sev-1 or no owner acknowledgement within 15 minutes.</p>
    </section>

    <footer class="footer">
      <p>Release Dashboard</p>
      <div class="footer-details">
        <p class="footer-meta">
          Updated every 5 minutes
          <span class="owner-chip" aria-label="Release owner">Jordan Lee</span>
          <span class="release-checklist-chip" aria-label="Release checklist status">Checklist: 9/10 complete</span>
          <span class="release-notes-badge" aria-label="Release notes status">Release notes: Ready</span>
          <a
            class="reviewer-contact-chip"
            href="mailto:release-reviewers@acme.dev"
            aria-label="Reviewer contact"
          >
            Reviewer: release-reviewers@acme.dev
          </a>
        </p>
        <p class="footer-release-note">Release date: March 4, 2026</p>
      </div>
    </footer>
  </main>
`;
