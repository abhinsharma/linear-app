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

    <section class="feature-grid" aria-label="Core release metrics">
      ${cards}
    </section>

    <footer class="footer">
      <p>Release Dashboard</p>
      <p>Updated every 5 minutes</p>
    </footer>
  </main>
`;
